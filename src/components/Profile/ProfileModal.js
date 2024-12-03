import React, { Component } from 'react';
import { Modal, FormControl, FormGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { profileModalSchema } from '../../metadata';
import ApiHelper from '../../util/ApiHelper';

class ProfileModal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    operator: PropTypes.object
  };

  state = {
    businessName: "",
    businessAddress: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expire: "",
    title: "",
    phoneNumber: "",
    userType: "",
    rerenderCounter: 0,
    profile: "http://localhost:8080/operatorLogo.jpg",
    role: ""
  };

  schema = profileModalSchema;

  async loadData() {
    const user = this.props.user;
    const operator = await ApiHelper.fetchOperatorById(user.operatorId);
    const userData = await ApiHelper.fetchUserById(user.operatorId, user.id);
    const paymentData = await ApiHelper.getPaymentDetailsById(user.operatorId, false);

    this.setState({
      role: user.role,
      businessName: operator.businessName,
      businessAddress: operator.businessAddress,
      profile: operator.operatorLogo || "http://localhost:8080/operatorLogo.jpg",
      firstName: userData.firstName,
      lastName: userData.lastName,
      title: userData.title,
      phoneNumber: userData.phoneNumber,
      userType: userData.role,
      cardNumber: `************${paymentData?.cardNumber}`,
      expire: `${paymentData?.expMonth} / ${paymentData?.expYear}`
    });
  }

  async loadSubscriberData() {
    const user = this.props.user;
    const subscriber = await ApiHelper.fetchSubscriberById(user.operatorId);
    const paymentData = await ApiHelper.getPaymentDetailsById(user.operatorId, true);

    this.setState({
      role: user.role,
      firstName: subscriber.firstName,
      lastName: subscriber.lastName,
      phoneNumber: subscriber.phoneNumber,
      cardNumber: `************${paymentData?.cardNumber}`,
      expire: `${paymentData?.expMonth} / ${paymentData?.expYear}`
    });
  }

  componentDidMount() {
    const user = this.props.user;
    if (user.role === "Admin") {
      this.setState({
        role: "Admin",
        businessName: "Bloxtel",
        businessAddress: "San Francisco, CA 94108 USA",
        profile: "http://localhost:8080/bloxtel_icon.png"
      });
    } else if (user.role === "SUBSCRIBER") {
      this.loadSubscriberData();
    } else {
      this.loadData();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  async updateFormData(newData) {
    await this.setState({
      formData: newData,
    });
  }

  render() {
    return (
      <Modal
        show={this.props.open}
        className={"profile-modal theme-light"}
        backdrop={"static"}
        onHide={this.props.setOpen.bind(this, false)}>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
             Profile
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {this.state.rerenderCounter % 2 === 0 &&
            <div className='profile-content'>
              <div className="profile-modal__img">
                <i
                  style={{
                    borderRadius: "50%",
                    width: 130,
                    height: 130,
                    display: "block",
                    background: `url(${this.state.profile}) gray`,
                    backgroundPosition: "center",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: "auto 130px"
                  }}
                  className='img-div'
                />
              </div>
              {this.state.role === "SUBSCRIBER" && (
                <div className='user-info'>
                  <div className='title-text'>User Info</div>
                  <div className='field-set'>
                    <div className='input-set'>
                      <div className='input-text'>First Name</div>
                      <FormGroup controlId="name-s" bsSize="large">
                        <FormControl
                          type="text"
                          placeholder="First Name"
                          className="profile-input"
                          value={this.state.firstName}
                          readOnly
                          onChange={e => this.setState({firstName: e.target.value})}
                        />
                      </FormGroup>
                    </div>
                    <div className='input-set'>
                      <div className='input-text'>Last Name</div>
                      <FormGroup controlId="name-s" bsSize="large">
                        <FormControl
                          type="text"
                          placeholder="Last Name"
                          className="profile-input"
                          value={this.state.lastName}
                          readOnly
                          onChange={e => this.setState({lastName: e.target.value})}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className='field-set'>
                    <div className='input-set'>
                      <div className='input-text'>Phone Number</div>
                      <FormGroup controlId="name-s" bsSize="large">
                        <FormControl
                          type="text"
                          placeholder="Phone Number"
                          className="profile-input"
                          value={this.state.phoneNumber}
                          readOnly
                          onChange={e => this.setState({phoneNumber: e.target.value})}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className='field-set'>
                    <div className='input-set'>
                      <div className='input-text'>Card Number</div>
                      <FormGroup controlId="name-s" bsSize="large">
                          <FormControl
                            type="text"
                            placeholder="Card Number"
                            className="profile-input"
                            value={this.state.cardNumber}
                            readOnly
                            onChange={e => this.setState({cardNumber: e.target.value})}
                          />
                      </FormGroup>
                    </div>
                    <div className='input-set'>
                      <div className='input-text'>Expire Date</div>
                      <FormGroup controlId="name-s" bsSize="large">
                          <FormControl
                            type="text"
                            placeholder="Expire Date"
                            className="profile-input"
                            value={this.state.expire}
                            readOnly
                            onChange={e => this.setState({expire: e.target.value})}
                          />
                      </FormGroup>
                    </div>
                  </div>
                </div>
              )}

              {this.state.role !== "TECHNICIAN" && this.state.role !== "SUBSCRIBER" && (
                <div className='account-info'>
                  <div className='title-text'>Account Info</div>
                  <div>
                    <div className='input-set'>
                      <div className='input-text'>Organization Name</div>
                      <FormGroup controlId="name-s" bsSize="large">
                        <FormControl
                          type="text"
                          placeholder="Organization Name"
                          className="profile-input__large"
                          value={this.state.businessName}
                          readOnly
                          onChange={e => this.setState({businessName: e.target.value})}
                        />
                      </FormGroup>
                    </div>
                    <div className='input-set'>
                      <div className='input-text'>Organization Address</div>
                      <FormGroup controlId="name-s" bsSize="large">
                        <FormControl
                          type="text"
                          placeholder="Organization Address"
                          className="profile-input__large"
                          value={this.state.businessAddress}
                          readOnly
                          onChange={e => this.setState({businessAddress: e.target.value})}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className='field-set'>
                    <div className='input-set'>
                      <div className='input-text'>Card Number</div>
                      <FormGroup controlId="name-s" bsSize="large">
                          <FormControl
                            type="text"
                            placeholder="Card Number"
                            className="profile-input"
                            value={this.state.cardNumber}
                            readOnly
                            onChange={e => this.setState({cardNumber: e.target.value})}
                          />
                      </FormGroup>
                    </div>
                    <div className='input-set'>
                      <div className='input-text'>Expire Date</div>
                      <FormGroup controlId="name-s" bsSize="large">
                          <FormControl
                            type="text"
                            placeholder="Expire Date"
                            className="profile-input"
                            value={this.state.expire}
                            readOnly
                            onChange={e => this.setState({expire: e.target.value})}
                          />
                      </FormGroup>
                    </div>
                  </div>
                </div>
              )}

              <div className='devider' />
              {this.state.role !== "Admin" && this.state.role !== "SUBSCRIBER" && (
                <div className='user-info'>
                  <div className='title-text'>User Info</div>
                  <div className='field-set'>
                    <div className='input-set'>
                      <div className='input-text'>First Name</div>
                      <FormGroup controlId="name-s" bsSize="large">
                        <FormControl
                          type="text"
                          placeholder="First Name"
                          className="profile-input"
                          value={this.state.firstName}
                          readOnly
                          onChange={e => this.setState({firstName: e.target.value})}
                        />
                      </FormGroup>
                    </div>
                    <div className='input-set'>
                      <div className='input-text'>Last Name</div>
                      <FormGroup controlId="name-s" bsSize="large">
                        <FormControl
                          type="text"
                          placeholder="Last Name"
                          className="profile-input"
                          value={this.state.lastName}
                          readOnly
                          onChange={e => this.setState({lastName: e.target.value})}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className='field-set'>
                    <div className='input-set'>
                      <div className='input-text'>Title</div>
                      <FormGroup controlId="name-s" bsSize="large">
                        <FormControl
                          type="text"
                          placeholder="Title"
                          className="profile-input"
                          value={this.state.title}
                          readOnly
                          onChange={e => this.setState({title: e.target.value})}
                        />
                      </FormGroup>
                    </div>
                    <div className='input-set'>
                      <div className='input-text'>Phone Number</div>
                      <FormGroup controlId="name-s" bsSize="large">
                        <FormControl
                          type="text"
                          placeholder="Phone Number"
                          className="profile-input"
                          value={this.state.phoneNumber}
                          readOnly
                          onChange={e => this.setState({phoneNumber: e.target.value})}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className='input-set'>
                    <div className='input-text'>User Type</div>
                    <FormGroup controlId="address-s" bsSize="large">
                      <select
                          className="form-control profile-select"
                          id="industry"
                          value={this.state.userType}
                          disabled
                          onChange={e => this.setState({userType: e.target.value})}
                      >
                        <option value="Super" key="Super">
                          Super
                        </option>
                        <option value="ADMIN" key="Admin">
                          ADMIN
                        </option>
                        <option value="TECHNICIAN" key="Basic">
                          TECHNICIAN
                        </option>
                      </select>
                    </FormGroup>
                  </div>
                </div>
              )}
              
            </div>
          }
        </Modal.Body>
      </Modal>
    );

  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(ProfileModal));