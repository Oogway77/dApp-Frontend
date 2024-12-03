/* eslint-disable no-useless-constructor */
import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {Button, FormControl, FormGroup, Image} from "react-bootstrap";
import AuthHelper from "../../util/AuthHelper"

import HeroLogoOperator from "../../assets/images/wow_hero_placeholder_operator.jpg";
import HeroLogoSubscriber from "../../assets/images/wow_hero_placeholder_subscriber.jpg";
import Open6gcLogo from "../../assets/images/bloxtel_icon.png";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../Main/Footer";

class Login extends Component {
  state = {
    submitDisabled: false,
    errorMsg: "",

    // Form
    username: "",
    password: "",
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
   //alert("validateForm() username length = "+this.state.username.length+" password length = "+this.state.password.length);
   return this.state.username.length > 0 && this.state.password.length > 0;
 }

 async handleSubmit(event) {
  event.preventDefault();

  if (!this.validateForm()) {
    this.setState({
      errorMsg: "Invalid inputs",
    });
    return;
  }

  this.setState({
    submitDisabled: true,
    errorMsg: "",
  });

  let result = await AuthHelper.login(this.state.username, this.state.password, this.state.isSubscriber);
  
  if (result === "Success") {
    console.log('login successful');
  } else if (result === "Permission") {
    this.setState({
      submitDisabled: false,
      errorMsg: "",
    });
    this.props.history.push('/register-pending');
  } else {
    this.setState({
      submitDisabled: false,
      errorMsg: "Wrong credentials",
    });
  }
};

render() {
    return (
      <div className="Login">
        <div className="HeroLogoContent">
          <Image src={this.state.isSubscriber ? HeroLogoSubscriber : HeroLogoOperator} className={`${this.state.isWidthBigger ? "img-width" : "img-height"}`} alt="heroLogo"/>
        </div>

        <div className="LoginFormContent">
          <div className="LoginForm">
            <img src={Open6gcLogo} alt="Bloxtel Operator dApp"/>
            <div className="LogoText">{this.state.isSubscriber ? "Subscriber dApp" :  "Operator dApp"}</div>

            <form onSubmit={this.handleSubmit.bind(this)}>
              <span className="error-msg"><p>{this.state.errorMsg}&nbsp;</p></span>

              <FormGroup controlId="username" bsSize="large">
                <FormControl
                  autoFocus
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={e => this.setState({username: e.target.value})}
                />
              </FormGroup>

              <FormGroup controlId="password" bsSize="large">
                <FormControl
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={e => this.setState({password: e.target.value})}
                />
              </FormGroup>

              <Button block type="submit" className="btn-login" disabled={this.state.submitDisabled}>
                Login
              </Button>
              <br />
              <Link to={this.state.isSubscriber ? "/register-subscriber" : "/register-operator"}>Create New {this.state.isSubscriber ? "Subscriber" :  "Operator"} Account</Link>
              <br />
              <Link to={this.state.isSubscriber ? "/forgot-password/?subscriber":"/forgot-password"}>Forgot Password</Link>
            </form>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default withRouter(connect(mapStateToProps)(Login));
