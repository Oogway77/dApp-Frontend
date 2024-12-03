import React from 'react';
import './pricingTable.scss';

const PricingTable = (props) => {
  const onClickPlan = (method) => {
    if (props.isPending) {
      alert("Can not change subscription type while pending.");
      return;
    }
    props.onSetPlan(method);
  }

	return (
		<div>
			<section className="pricing-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="price-card">
                <div className="top-title">Basic</div>
                <p className="price"><span>199</span> / month / small cell</p>
                <ul className="pricing-offers">
                  <li>Unlimited Seats</li>
                  <li>24/7 Support</li>
                  <li>99.999% Uptime SLA</li>
                  <li>Dedicated Technicians</li>
                  <li>Free dSIMs & Data Plans</li>
                  <li>Indoor 5G Coverage</li>
                  <li>SIM Swap Protection</li>
                  <li className='text-disabled'>5G AI Video Analytics</li>
                  <li className='text-disabled'>5G Neutral Hosting</li>
                  <li className='text-disabled'>Peer Node Validation</li>
                </ul>
                <div
                  onClick={() => onClickPlan("Basic")}
                  className={`btn btn-primary btn-mid ${props.plan === "Basic" ? "btn-mid__selected" : ""}`}
                >
                  {props.plan === "Basic" ? "Subscribed" : "Get Started"}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="price-card">
                <div className="top-title">Standard</div>
                <p className="price"><span>499</span> / month / small cell</p>
                <ul className="pricing-offers">
                  <li>Unlimited Seats</li>
                  <li>24/7 Support</li>
                  <li>99.999% Uptime SLA</li>
                  <li>Dedicated Technicians</li>
                  <li>Free dSIMs & Data Plans</li>
                  <li>Indoor 5G Coverage</li>
                  <li>SIM Swap Protection</li>
                  <li>5G AI Video Analytics</li>
                  <li className='text-disabled'>5G Neutral Hosting</li>
                  <li className='text-disabled'>Peer Node Validation</li>
                </ul>
                <div
                  onClick={() => onClickPlan("Standard")}
                  className={`btn btn-primary btn-mid ${props.plan === "Standard" ? "btn-mid__selected" : ""}`}
                >
                  {props.plan === "Standard" ? "Subscribed" : "Get Started"}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="price-card ">
                <div className="top-title">Advanced</div>
                <p className="price"><span>999</span> / month / small cell</p>
                <ul className="pricing-offers">
                  <li>Unlimited Seats</li>
                  <li>24/7 Support</li>
                  <li>99.999% Uptime SLA</li>
                  <li>Dedicated Technicians</li>
                  <li>Free dSIMs & Data Plans</li>
                  <li>Indoor 5G Coverage</li>
                  <li>SIM Swap Protection</li>
                  <li>5G AI Video Analytics</li>
                  <li>5G Neutral Hosting</li>
                  <li>Peer Node Validation</li>
                </ul>
                <div
                  onClick={() => onClickPlan("Advanced")}
                  className={`btn btn-primary btn-mid ${props.plan === "Advanced" ? "btn-mid__selected" : ""}`}
                >
                  {props.plan === "Advanced" ? "Subscribed" : "Get Started"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
		</div>
	);
}
export default PricingTable;