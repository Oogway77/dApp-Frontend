import React, {Component} from "react";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Button} from "react-bootstrap";
import Open6gcLogo from "../../assets/images/bloxtel_icon.png";
import 'react-toastify/dist/ReactToastify.css';

class Pending extends Component {
  state = {
    errorMsg: "",
  };

  conponentWillMount() {
    this.setState({
      errorMsg: "",
    });
  }

  async handleSubmit() {
    const isSubscriber = window.location.href.includes("?subscriber");
    this.props.history.push(isSubscriber ? '/?subscriber' : '/');
  };

  render() {
    return (
      <div className="Pending">
        <div className="TopContent">
          <div className="TextContent">
            <div className="text">
              Registration Pending...
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

export default withRouter(connect(mapStateToProps)(Pending));
