import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, FormControl, FormGroup } from "react-bootstrap";
import { useHistory} from 'react-router-dom';
import ApiHelper from "../../util/ApiHelper";
import { toast } from 'react-toastify';

export const CheckoutFormSubscriber = (props) => {
  const [submitDisabled, SetSubmitDisabled] = useState(false);
  const [errorMsg, SetErrorMsg] = useState("");
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [passwordConfirm, SetPasswordConfirm] = useState("");
  const [evmAddress, SetEvmaddress] = useState("");
  
  const [firstName, SetFirstName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [phoneNumber, SetPhoneNumber] = useState("");
  const [page, SetPage] = useState(1);

  const [subscriberLogo, setSubscriberLogo] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const history = useHistory();

  useEffect(() => {
  }, []);

  const validateFormFirstPage = () => {
    if (username.length === 0||
      password.length === 0 ||
      passwordConfirm.length === 0
    ) {
      SetErrorMsg("Please input fields");
      return false;
    }

    if (password !== passwordConfirm) {
      SetErrorMsg("Password not match");
      return false;
    }

    SetErrorMsg("");
    return true;
  }

  const validateFormSecondPage = () => {
    if (firstName.length === 0 ||
      lastName.length === 0 ||
      phoneNumber.length === 0
    ) {
      SetErrorMsg("Please input fields");
      return false;
    }

    SetErrorMsg("");
    return true;
  }

  const validateLogoPage = () => {
    if (!subscriberLogo) {
      SetErrorMsg("Please select logo image.");
      return false;
    }

    SetErrorMsg("");
    return true;
  }
  const onLeftBtnClick = () => {
    if (page === 2) {
      SetPage(1);
    }

    if (page === 1 && props.isAdmin) {
      SetPage(0);
    }
  }

  const onRightBtnClick = () => {
    if (page === 1 && validateFormFirstPage()) {
      SetPage(2);
    }

    if (page === 0 && validateLogoPage()) {
      SetPage(1);
    }

  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateFormSecondPage()) {
      return;
    }

    const paymentMethod = await stripe?.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardElement),
      billing_details: {
        name: firstName + " " + lastName,
        email: username
      }
    });
    
    if (!paymentMethod || paymentMethod.error) {
      SetErrorMsg("Please input valid fields for payment");
      return;
    }
    console.error("method", paymentMethod, username);
    
    SetSubmitDisabled(true);
    SetErrorMsg("");

    const data = {
      email: username,
      encryptedPassword: password,
      subscriberLogo: subscriberLogo,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      paymentMethod: paymentMethod.paymentMethod.id,
      evmAddress: evmAddress
    };

    let result = await ApiHelper.createSubscriber(data);

    const statusCode = result.status;
    if (statusCode === 201) {
      if (props.isAdmin) {
        toast.success('Successfully created subscriber.');
      } else {
        toast.success('Successfully signed up.');
      }
      
      if (props.isAdmin) {
        await ApiHelper.fetchSubscribers();
        props.onClose();
      } else {
        history.push('/register-pending/?subscriber');
      }
    } else if (statusCode === 403) {
      toast.warning('Email is already exists. Please use other email.');
    }  else {
      if (props.isAdmin) {
        toast.error('Creating subscriber failed.');
      } else {
        toast.error('Signed up failed.');
      }
    }

    SetSubmitDisabled(false);
  };
  

  const handleChangeLogo = (event) => {
    const url = URL.createObjectURL(event.target.files[0]);
    setSubscriberLogo(url);
    SetErrorMsg("");
  }

  return (
    <>
      {submitDisabled && <div className="sp loading" />}
      {!submitDisabled &&
        <>
          <div className="arrowBtn-content">
            <button onClick={onLeftBtnClick} className="arrow-btn" disabled={page === 1} >
              <i className="fas fa-arrow-circle-left"/>
            </button>
            <button onClick={onRightBtnClick} className="arrow-btn" disabled={page === 2}>
              <i className="fas fa-arrow-circle-right"/>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            {errorMsg && <span className="error-msg"><p>{errorMsg}&nbsp;</p></span>}
            {page === 0 && (
              <div className="zero-page">
                <div className="logo-text">Upload Subscriber Logo</div>
                {!subscriberLogo && (
                  <div style={{width: 150, height: 150, backgroundColor: "gray"}} />
                )}
                {subscriberLogo && (
                  <img style={{ margin: 10 }} alt="artImg" width={150} src={subscriberLogo}/>
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
            )}
            {page === 1 && (
              <div className="first-page">
                <FormGroup controlId="username-s" bsSize="large">
                  <FormControl
                    autoFocus
                    type="text"
                    placeholder="Email"
                    className="auth-input"
                    value={username}
                    onChange={e => SetUsername(e.target.value)}
                  />
                </FormGroup>

                <FormGroup controlId="password-s" bsSize="large">
                  <FormControl
                    type="password"
                    placeholder="Password"
                    className="auth-input"
                    value={password}
                    onChange={e => SetPassword(e.target.value)}
                  />
                </FormGroup>

                <FormGroup controlId="password-s" bsSize="large">
                  <FormControl
                    type="password"
                    placeholder="Confirm Password"
                    className="auth-input"
                    value={passwordConfirm}
                    onChange={e => SetPasswordConfirm(e.target.value)}
                  />
                </FormGroup>
                
                <FormGroup controlId="evmaddress-s" bsSize="large">
                  <FormControl
                    autoFocus
                    type="text"
                    placeholder="EVM Address"
                    className="auth-input"
                    value={evmAddress}
                    onChange={e => SetEvmaddress(e.target.value)}
                  />
                </FormGroup>
              </div>
            )}

            {page === 2 && (
              <div className="second-page">
                <FormGroup controlId="name-first" bsSize="large">
                  <FormControl
                    type="text"
                    placeholder="First Name"
                    className="auth-input"
                    value={firstName}
                    onChange={e => SetFirstName(e.target.value)}
                  />
                </FormGroup>

                <FormGroup controlId="name-last" bsSize="large">
                  <FormControl
                    type="text"
                    placeholder="Last Name"
                    className="auth-input"
                    value={lastName}
                    onChange={e => SetLastName(e.target.value)}
                  />
                </FormGroup>

                <FormGroup controlId="phone-s" bsSize="large">
                  <FormControl
                    type="text"
                    placeholder="Phone Number"
                    className="auth-input"
                    value={phoneNumber}
                    onChange={e => SetPhoneNumber(e.target.value)}
                  />
                </FormGroup>
                <CardElement className="form-control" id="card-element" />
              </div>
            )}
            
            {page === 2 && (
              <Button block type="submit" className="btn-login" disabled={submitDisabled} >
                {props.isAdmin ? "Submit" : "Signup"}
              </Button>
            )}
          </form>
        </>
      }
    </>
  );
};