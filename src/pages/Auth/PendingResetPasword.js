import React, {Component} from "react";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Button} from "react-bootstrap";
import Open6gcLogo from "../../assets/images/bloxtel_icon.png";
import 'react-toastify/dist/ReactToastify.css';

class ResetPasswordPending extends Component {
  state = {
    errorMsg: "",
  };

  conponentWillMount() {
    this.setState({
      errorMsg: "",
    });
  }

  async handleSubmit() {
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="Pending">
        <div className="TopContent">
          <div className="TextContent">
            <div className="text">
              Reset Password Pending...
            </div>
          </div>
          <div className="LogoContent">
            <img width={200} src={Open6gcLogo} alt="Bloxtel Operator dApp"/>
          </div>
        </div>
        <Button onClick={this.handleSubmit.bind(this)} className="btn-login">
          Go Login
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default withRouter(connect(mapStateToProps)(ResetPasswordPending));
