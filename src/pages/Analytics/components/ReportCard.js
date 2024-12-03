
import React from "react";

const ReportCard = (props) => {
  return (
    <div className="report-card">
      <div className="report-card__body">
        <div className="report-card__body__icon">
          <i
            className={`${props.icon}`}
            style={{color: `${props.color}`}}
            aria-hidden="true"
          ></i>
        </div>
        <div className="report-card__body__context">
          <div className="report-card__body__context__count">
            <span className="">{props.count}</span>
          </div>
          <div className="report-card__body__context__title">{props.title}</div>
        </div>
      </div>
    </div>
  );
}

export default ReportCard;
