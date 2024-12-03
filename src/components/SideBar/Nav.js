import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { SidebarData, SidebarDataSubscriber } from './SidebarData';
import SubMenu from './SubMenu';
import ApiHelper from '../../util/ApiHelper';

class Nav extends Component {
  state = {
    plan: "",
    status: "",
  };

  async loadData() {
    const user = this.props.user;
    const operator = await ApiHelper.fetchOperatorById(user.operatorId);
    this.setState({ plan: operator.subscriptionType, status: operator.subscriptionStatus });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <ul className="nav">
        {this.props.user.role === "SUBSCRIBER" ?
          SidebarDataSubscriber.map((item) => <SubMenu key={item.title} item={item} />) :
          SidebarData
            .filter((item) => !(this.props.user.role === "OPERATOR" && item.title === "Operators"))
            .filter((item) => !(this.props.user.role === "Admin" && item.title === "Users"))
            .filter((item) => !(this.props.user.role === "TECHNICIAN" && item.title === "Users"))
            .filter((item) => !(this.props.user.role === "OPERATOR" && this.state.plan === "Basic" && item.title === "User Equipment"))
            .filter((item) => !((this.props.user.role === "OPERATOR" && this.state.plan !== "Advanced" && item.title === "Payouts") || (item.title === "Payouts" && this.state.plan === "Advanced" && this.state.status ==="PENDING")))
            .map((item) => <SubMenu key={item.title} item={item} />)
        }
      </ul>
    );
  }
}

const mapStateToProp = state => ({
  user: state.auth.user
});

export default withRouter(connect(mapStateToProp)(Nav));
