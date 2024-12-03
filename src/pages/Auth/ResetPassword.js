/* eslint-disable no-useless-constructor */
import React, {Component} from "react";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Button, FormControl, FormGroup, Image} from "react-bootstrap";
import HeroLogo from "../../assets/images/wow_hero_placeholder_operator.jpg";
import Open6gcLogo from "../../assets/images/bloxtel_icon.png";
import { ToastContainer } from 'react-toastify';
import ApiHelper from "../../util/ApiHelper";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../Main/Footer";

class ResetPassword extends Component {
  state = {
    submitDisabled: false,
    errorMsg: "",
    password: "",
    passwordConfirm: "",
    isWidthBigger: false,
  };

  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ isWidthBigger:  (window.innerWidth * 0.67 / window.innerHeight) > (650 / 525)});
  }

  conponentWillMount() {
    this.setState({
      submitDisabled: false,
      errorMsg: "",
    });
  }

  validateForm() {
    if (this.state.password.length === 0 || this.state.passwordConfirm.length === 0) {
      return "Please input fields";
    }

    if (this.state.password !== this.state.passwordConfirm) {
      return "Password not match"
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
    
    // eslint-disable-next-line
    let urlData = this.props.match.url.replace(/^.*[\\\/]/, '');

    const data = {
      url: urlData,
      password: this.state.password,
    };

    let result = await ApiHelper.resetPassword(data);
    if (result.status === 200) {
      this.props.history.push('/');
    }

    this.setState({
      submitDisabled: false,
      errorMsg: "",
    });
  };

  onClickBack() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="Login">
        <ToastContainer />
        <div className="HeroLogoContent">
          <Image src={HeroLogo} className={`${this.state.isWidthBigger ? "img-width" : "img-height"}`} alt="heroLogo"/>
        </div>

        <div className="LoginFormContent">
          <div className="BackBtn" onClick={this.onClickBack.bind(this)} ><i className="fas fa-reply"/></div>
          <div className="LoginForm">
            <img src={Open6gcLogo} alt="Bloxtel Operator dApp"/>
            <h3>Reset Password</h3>

            <form onSubmit={this.handleSubmit.bind(this)}>
              <span className="error-msg"><p>{this.state.errorMsg}&nbsp;</p></span>
              <FormGroup controlId="password-s" bsSize="large">
                <FormControl
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={e => this.setState({password: e.target.value})}
                />
              </FormGroup>

              <FormGroup controlId="password-s" bsSize="large">
                <FormControl
                  type="password"
                  placeholder="Password Confrim"
                  value={this.state.passwordConfirm}
                  onChange={e => this.setState({passwordConfirm: e.target.value})}
                />
              </FormGroup>

              <Button block type="submit" className="btn-login" disabled={this.state.submitDisabled}>
                Confirmation
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

export default withRouter(connect(mapStateToProps)(ResetPassword));