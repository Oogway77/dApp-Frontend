/* eslint-disable no-useless-constructor */
import React, {Component} from "react";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Button, FormControl, FormGroup, Image} from "react-bootstrap";
import HeroLogoOperator from "../../assets/images/wow_hero_placeholder_operator.jpg";
import HeroLogoSubscriber from "../../assets/images/wow_hero_placeholder_subscriber.jpg";
import Open6gcLogo from "../../assets/images/bloxtel_icon.png";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../Main/Footer";

class ForgotPassword extends Component {
  state = {
    submitDisabled: false,
    errorMsg: "",
    username: "",
    isWidthBigger: false,
    isSubscriber: false,
  };

  
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    let url = window.location.href;
    this.setState({ isSubscriber: url.includes("?subscriber") })

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    const imgRate = this.state.isSubscriber ? 1 : (650 / 525);
    this.setState({ isWidthBigger:  (window.innerWidth * 0.67 / window.innerHeight) > imgRate});
  }

  conponentWillMount() {
    this.setState({
      submitDisabled: false,
      errorMsg: "",
    });
  }

  validateForm() {
    if (this.state.username.length === 0) {
      return "Please input fields";
    }

    return "";
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (this.validateForm()) {
      this.setState({
        errorMsg: this.validateForm(),
      });
      return;
    }

    this.setState({
      submitDisabled: true,
      errorMsg: "",
    });

    // const data = {
    //   email: this.state.username,
    // };

    this.props.history.push('/reset-pending');
    // let result = await ApiHelper.forgotPassword(data);
    // if (result.status === 200) {
    //   this.props.history.push(`/reset-password/${result.data.url}`);
    // }
    // else if (result.status === 403) {
    //   toast.warning("Can't find user email.");
    // }
    this.setState({
      submitDisabled: false,
      errorMsg: "",
    });
  };

  onClickBack() {
    this.props.history.push(this.state.isSubscriber ? '/?subscriber' : '/');
  }

  render() {
    return (
      <div className="Login">
        <ToastContainer />
        <div className="HeroLogoContent">
          <Image src={this.state.isSubscriber ? HeroLogoSubscriber : HeroLogoOperator} className={`${this.state.isWidthBigger ? "img-width" : "img-height"}`} alt="heroLogo"/>
        </div>

        <div className="LoginFormContent">
          <div className="BackBtn" onClick={this.onClickBack.bind(this)} ><i className="fas fa-reply"/></div>
          <div className="LoginForm">
            <img src={Open6gcLogo} alt="Bloxtel Operator dApp"/>
            <h3 className="title-text">Reset Password</h3>

            <form onSubmit={this.handleSubmit.bind(this)}>
              <span className="error-msg"><p>{this.state.errorMsg}&nbsp;</p></span>
              <FormGroup controlId="username-s" bsSize="large">
                <FormControl
                  autoFocus
                  type="text"
                  placeholder="Email"
                  value={this.state.username}
                  onChange={e => this.setState({username: e.target.value})}
                />
              </FormGroup>

              <Button block type="submit" className="btn-login" disabled={this.state.submitDisabled}>
                Submit
              </Button>
              <br />
            </form>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default withRouter(connect(mapStateToProps)(ForgotPassword));