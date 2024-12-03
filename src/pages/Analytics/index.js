import React from 'react';
import {Route} from 'react-router-dom';
import AnalyticsOverview from "./AnalyticsOverview";

const Analytics = ({match}) => (
  <div className="content">
    <Route exact path={`${match.url}/`} component={AnalyticsOverview} />
  </div>
);

export default Analytics;
