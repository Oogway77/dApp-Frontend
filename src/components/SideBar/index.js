import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Nav from './Nav';
import Bloxteldapplogo from "../../assets/images/bloxtel_icon.png";

class SideBar extends Component {
  static propTypes = {
    sidebarOpened: PropTypes.bool.isRequired,
    setSidebarOpened: PropTypes.func.isRequired,
  };

  onSidebarClose() {
    this.props.setSidebarOpened(false);
  }

  onSidebarOpen() {
    this.props.setSidebarOpened(true);
  }

  render() {
    return (
      <div className="sidebar">

        <div className="brand">
          {!this.props.sidebarOpened &&
            <i onClick={this.onSidebarOpen.bind(this)} className="fas fa-bars brand-menu"/>}
          <a href="/" className="brand-name">
            <img src={Bloxteldapplogo} alt="logo" className="logo"/>
          </a>
          {this.props.sidebarOpened &&
            <>
              <span className="brand-title">{this.props.user.role === "SUBSCRIBER" ? "Subscriber dApp" : "Operator dApp"}</span>
              <i onClick={this.onSidebarClose.bind(this)} className="fas fa-chevron-left brand-menu-left"/>
            </>
          }
        </div>

        <div className={`sidebar-wrapper ${!this.props.sidebarOpened ? 'sidebar-wrapper__hide' : ''}`}>
          {/*<UserInfo/>*/}
          {/*<div className="line"/>*/}
          <Nav/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(SideBar));
