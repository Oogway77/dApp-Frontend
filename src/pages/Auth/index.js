import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import SignupSubscriber from './SignupSubscriber';
import Pending from './Pending';
import PendingResetPasword from './PendingResetPasword.js';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const Auth = ({isLoggedIn}) => {
  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="wrapper">
      <div className='auth-panel'>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/register-operator" component={Signup}/>
          <Route exact path="/register-subscriber" component={SignupSubscriber}/>
          <Route exact path="/register-pending" component={Pending}/>
          <Route exact path="/reset-pending" component={PendingResetPasword}/>
          <Route exact path="/forgot-password" component={ForgotPassword}/>
          <Route exact path="/reset-password/:id" component={ResetPassword}/>
          <Route exact path="*" render={() => <Redirect to="/" />}/>
        </Switch>
      </div>
    </div>
  )
};

export default Auth;
