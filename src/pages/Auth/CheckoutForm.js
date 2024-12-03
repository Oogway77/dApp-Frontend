import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";
import { useHistory} from 'react-router-dom';
import Form from "@rjsf/core";
import validator from '@rjsf/validator-ajv8';
import ApiHelper from "../../util/ApiHelper";
import { toast } from 'react-toastify';
import PricingTable from "./PricingTable/PricingTable";
import { businessModalSchema, businessModalUISchema, infoModalSchema, infoModalUISchema } from "./forms";

export const CheckoutForm = (props) => {
  const [submitDisabled, SetSubmitDisabled] = useState(false);
  const [errorMsg, SetErrorMsg] = useState("");
  const [plan, setPlan] = useState("");
  const [businessFormData, setBusinessFormData] = useState(undefined);
  const [infoFormData, setInfoFormData] = useState(undefined);
  const [email, setEmail] = useState("");
  const [availableInfoSubmit, setAvailableInfoSubmit] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(undefined);

  const PageLevel = {
    BUSINESS_PAGE: 0,
    PALN_PAGE: 1,
    INFO_PAGE: 2,
  }
  
  const businessSchema = businessModalSchema;
  const businessUISchema = businessModalUISchema;

  const infoSchema = infoModalSchema;
  const infoUISchema = infoModalUISchema;

  let businessFormRef, infoFormRef;

  const [page, SetPage] = useState(PageLevel.BUSINESS_PAGE);

  const [operatorLogo, setOperatorLogo] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const history = useHistory();

  const validateFormBusinessPage = () => {
    if (businessFormRef) {
      businessFormRef.submit();
    }
  }

  const validatePayment = async (businessName, username) => {
    const resMethod = await stripe?.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardElement),
      billing_details: {
        name: businessName,
        email: username
      }
    });

    if (!resMethod || resMethod.error) {
      SetErrorMsg("Please input valid fields for payment");
      return false;
    }

    setPaymentMethod(resMethod);
    SetErrorMsg("");
    return true;
  }

  useEffect(() => {
    if (paymentMethod) {
      if (infoFormRef) {
        infoFormRef.submit();
        setAvailableInfoSubmit(false);
      }
    }
  }, [paymentMethod]);

  const validateFormInfoPage = () => {
    if (infoFormRef && !availableInfoSubmit) {
      infoFormRef.submit();
      return;
    }

    validatePayment(businessFormData.organizationName, email);
  }

  // const validateLogoPage = () => {
  //   if (!operatorLogo) {
  //     SetErrorMsg("Please select logo image.");
  //     return false;
  //   }

  //   SetErrorMsg("");
  //   return true;
  // }

  const onLeftBtnClick = () => {
    SetPage(page - 1);
  }

  const onRightBtnClick = () => {
    if (page === PageLevel.BUSINESS_PAGE) {
      validateFormBusinessPage();
    }

    // if (page === PageLevel.LOGO_PAGE) {
    //   SetPage(PageLevel.PALN_PAGE);
    // }

    if (page === PageLevel.PALN_PAGE && plan) {
      SetPage(PageLevel.INFO_PAGE);
    }
  }

  const onSetPlan = (method) => {
    setPlan(method);
    SetPage(PageLevel.INFO_PAGE);
  }

  const handleChangeLogo = (event) => {
    const url = URL.createObjectURL(event.target.files[0]);
    setOperatorLogo(url);
    SetErrorMsg("");
  }

  // const onChangeBusinessForm = (data) => {
  //   const formData = data.formData;
  //   if (formData.organizationName && formData.organizationAddress && formData.industry && formData.userName && formData.password && formData.confirmPassword) {
  //     setAvailableBusinessSubmit(true);
  //     if (formData.password !== formData.confirmPassword) {
  //       SetErrorMsg("Password not match");
  //     } else {
  //       setAvailableBusinessSubmit(false);
  //       SetErrorMsg("");
  //     }
  //   } else {
  //     setAvailableBusinessSubmit(false);
  //   }
  // }

  const onSubmitBusinessForm = (data) => {
    const formData = data.formData;
    setBusinessFormData(formData);
    SetPage(PageLevel.PALN_PAGE);
  }

  const onChangeInfoForm = (data) => {
    const formData = data.formData;
    setEmail(formData.userName);
    if (formData.firstName && formData.lastName && formData.password && formData.confirmPassword) {
      setAvailableInfoSubmit(true);
      if (formData.password !== formData.confirmPassword) {
        SetErrorMsg("Password not match");
      } else {
        SetErrorMsg("");
      }
    } else {
      setAvailableInfoSubmit(false);
    }
  }

  const onSubmitInfoForm = async (infoData) => {
    const formData = infoData.formData;
    setInfoFormData(formData);
    SetSubmitDisabled(true);
    SetErrorMsg("");

    const data = {
      businessName: businessFormData.organizationName,
      businessAddress: businessFormData.organizationAddress,
      businessIndustry: businessFormData.industry,
      email: formData.userName,
      operatorLogo: operatorLogo,
      paymentMethod: paymentMethod.paymentMethod.id,
      subscriptionType: plan,
      subscriptionStatus: "PENDING",
    };

    let result = await ApiHelper.createOperator(data);

    const statusCode = result.status;
    if (statusCode === 201) {
      if (props.isAdmin) {
        toast.success('Successfully created operator.');
      } else {
        toast.success('Successfully signed up.');
      }
      
      const adminData = {
        email: formData.userName,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        title: formData.title,
        phoneNumber: formData.phoneNumber,
        role: "ADMIN",
      }

      const adminResult = await ApiHelper.createUser(result.data.operatorId, adminData);
      if (!adminResult) {
        toast.error('Error in creating default user.');
      }
    
      const invoiceData = {
        "invoiceAmount": "750",
        "invoiceDueDate": "2023-08-21",
        "invoicePaidDate": "2023-08-21",
        "invoiceType": "Subscription",
        "status": "DUE"
      };

      const invoiceResult = await ApiHelper.createInvoice(result.data.operatorId, invoiceData);
      if (!invoiceResult) {
        toast.error('Error in creating invoice.');
      }

      if (props.isAdmin) {
        await ApiHelper.fetchOperators();
        props.onClose();
      } else {
        history.push('/register-pending');
      }
    } else if (statusCode === 403) {
      toast.warning('BusinessName is already exists. Please use other name.');
    }  else {
      if (props.isAdmin) {
        toast.error('Creating operator failed.');
      } else {
        toast.error('Signed up failed.');
      }
    }

    SetSubmitDisabled(false);
  }

  return (
    <>
      {submitDisabled && <div className="sp loading" />}
      {!submitDisabled &&
        <>
          <div className="arrowBtn-content">
            <button onClick={onLeftBtnClick} className="arrow-btn" disabled={ (props.isAdmin && page === PageLevel.BUSINESS_PAGE)} >
              <i className="fas fa-arrow-circle-left"/>
            </button>
            <button onClick={onRightBtnClick} className="arrow-btn" disabled={page === PageLevel.INFO_PAGE || (page === PageLevel.PALN_PAGE && !plan)}>
              <i className="fas fa-arrow-circle-right"/>
            </button>
          </div>
          <div>
            {errorMsg && <span className="error-msg"><p>{errorMsg}&nbsp;</p></span>}
            {/* {page === PageLevel.LOGO_PAGE && (
              
            )} */}
            {page === PageLevel.BUSINESS_PAGE && (
              <>
                <div className="first-page">
                  <Form schema={businessSchema}
                    uiSchema={businessUISchema}
                    formData={businessFormData}
                    // onChange={onChangeBusinessForm}
                    onSubmit={onSubmitBusinessForm}
                    validator={validator}
                    children={true}
                    ref={(form) => {businessFormRef = form;}}
                  />
                </div>
                <div className="zero-page">
                  <div className="logo-text">Upload Operator Logo</div>
                  {!operatorLogo && (
                    <div style={{width: 150, height: 150, backgroundColor: "gray"}} />
                  )}
                  {operatorLogo && (
                    <img style={{ margin: 10 }} alt="artImg" width={150} src={operatorLogo}/>
                  )}
                  <div className="select-logo">
                    <input id="file" style={{ margin: 10, display: "none" }} type="file" onChange={handleChangeLogo} />
                    <div>
                      <label htmlFor="file">
                        <div style={{ border: "1px solid black", padding:"2px 5px" }}>Choose</div>
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}
            {page === PageLevel.PALN_PAGE && (
              <div className="second-page">
                <PricingTable onSetPlan={onSetPlan} plan={plan}/>
              </div>
            )}
            {page === PageLevel.INFO_PAGE && (
              <div className="third-page">
                <Form schema={infoSchema}
                  uiSchema={infoUISchema}
                  formData={infoFormData}
                  onChange={onChangeInfoForm}
                  onSubmit={onSubmitInfoForm}
                  validator={validator}
                  children={true}
                  ref={(form) => {infoFormRef = form;}}
                />
                <CardElement className="form-control" id="card-element" />
              </div>
            )}
            
            {page === PageLevel.INFO_PAGE && (
              <Button block type="submit" className="btn-login" disabled={submitDisabled} onClick={validateFormInfoPage}>
                {props.isAdmin ? "Submit" : "Signup"}
              </Button>
            )}
          </div>
        </>
      }
    </>
  );
};