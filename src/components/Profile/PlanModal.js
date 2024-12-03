import React, { Component } from 'react';
import { Modal, Tab, Tabs } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ApiHelper from '../../util/ApiHelper';
import PricingTable from '../../pages/Auth/PricingTable/PricingTable';
import { Button, FormControl, FormGroup } from "react-bootstrap";

class PlanModal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
  };
 
  state = {
    plan: "",
    activeTabKey: "Subscription",
    data: null,
    isPending: false,
  };

  async loadData() {
    const user = this.props.user;
    const operator = await ApiHelper.fetchOperatorById(user.operatorId);

    this.setState({
      plan: operator.subscriptionType,
      data: operator,
      isPending: operator.subscriptionStatus === "PENDING"
    });
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.open && prevProps !== this.props) {

      this.loadData();
    }
  }

  async onSetPlan(method) {
    if (method !== this.state.plan) {

      if (!window.confirm(`Are you sure update subscription plan to ${method}?`))
        return;
      this.setState({ plan: method});
      const data = this.state.data;
      data["subscriptionType"] = method;
      data["subscriptionStatus"] = "PENDING";
  
      const result = await ApiHelper.updateOperator(data);
  
      if (!result) {
        alert("Error updating operator: ");
      }

      const notiData = {
        operatorId: this.props.user.operatorId,
        type: "Subscription",
        message: `Received a request from ${this.state.data.email} to update subscription plan from ${this.state.plan} to ${method}.`,
        status: "PENDING",
      }

      await ApiHelper.createNotification(notiData);
      this.props.setOpen(false);
    }
  }

  render() {
    return (
      <Modal
        show={this.props.open}
        className={`plan-modal ${this.state.activeTabKey === "BankAccount" ? "plan-modal__bank" : ""} theme-light`}
        backdrop={"static"}
        onHide={this.props.setOpen.bind(this, false)}>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
             Set Subscription Plan
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Tabs
              activeKey={this.state.activeTabKey}
              onSelect={(key) => this.setState({ activeTabKey: key })}
              id="sub-modal-details-tab"
              className="camera-modal--tab"
            >
              <Tab eventKey="Subscription" title="Subscription" className="camera-modal--tab--content" >
                <div className='plan-container'>
                  <PricingTable onSetPlan={this.onSetPlan.bind(this)} plan={this.state.plan} isPending={this.state.isPending}/>
                </div>
              </Tab>
              <Tab eventKey="BankAccount" title="BankAccount" className="camera-modal--tab--content" >
                <div className='bank-container'>
                  <FormGroup controlId="name-s" bsSize="large">
                    <FormControl
                      type="text"
                      placeholder="Name on account"
                      className="auth-input"
                      // value={businessName}
                      // onChange={e => SetBusinessName(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup controlId="name-s" bsSize="large">
                    <FormControl
                      type="text"
                      placeholder="Account number"
                      className="auth-input"
                      // value={businessName}
                      // onChange={e => SetBusinessName(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup controlId="name-s" bsSize="large">
                    <FormControl
                      type="text"
                      placeholder="Routing Number"
                      className="auth-input"
                      // value={businessName}
                      // onChange={e => SetBusinessName(e.target.value)}
                    />
                  </FormGroup>

                  <Button block onClick={() => this.props.setOpen(false)} className="btn-add" disabled={this.state.submitDisabled}>
                    Add Bank Account
                  </Button>
                </div>
              </Tab>
            </Tabs>
            
        </Modal.Body>
      </Modal>
    );

  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(PlanModal));