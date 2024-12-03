/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Open6gcLogo from "../../assets/images/bloxtel_icon.png";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckoutForm } from "./CheckoutForm";
import Footer from "../Main/Footer";
import ApiHelper from "../../util/ApiHelper";

class Signup extends Component {
  state = {
    isWidthBigger: false,
  };

  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  async setStripePromise() {
    const res = await ApiHelper.getStripePublicKey();
    this.setState({ stripePromise:  loadStripe(res?.publicKey)});
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.setStripePromise();
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ isWidthBigger:  (window.innerWidth * 0.67 / window.innerHeight) > (650 / 525)});
  }

  onClickBack() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="Login">
        <ToastContainer />
        {/* <div className="HeroLogoContent">
          <Image src={HeroLogo} className={`${this.state.isWidthBigger ? "img-width" : "img-height"}`} alt="heroLogo"/>
        </div> */}

        <div className="LoginFormContent LoginFormContent__admin">
          <div className="BackBtn" onClick={this.onClickBack.bind(this)} ><i className="fas fa-reply"/></div>
          <div className="LoginForm LoginForm__mg-space">
            <img src={Open6gcLogo} alt="Bloxtel Operator dApp"/>
            <h3 className="title-text">Sign Up</h3>
            {this.state.stripePromise && (
              <Elements stripe={this.state.stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default withRouter(connect(mapStateToProps)(Signup));