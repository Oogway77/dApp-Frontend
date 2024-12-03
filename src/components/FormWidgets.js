import React, {useEffect, useState} from "react";
import QRCode from "react-qr-code";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

export function qrWidget() {
    return {
        "ui:widget": (props) => {
            const [value, setValue] = useState(props.value || "");

            useEffect(() => {
                if (props.value) {
                    setValue(props.value);
                }
            }, [props]);
            return (
                <div>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "30%", width: "30%" }}
                        value={value}
                    />
                </div>
            );
        },
    }
}
export function operatorIdWidget(disabled) {
    return {
        "ui:widget": withRouter(connect(mapStateToProps)((props) => {
            const onChangeOperatorId = (event) => {
                props.onChange(event.target.value);
            };

            return (
                <select disabled={disabled} onChange={onChangeOperatorId} value={props.value} id="root_operatorId"
                        className='form-control' required>
                    <option key="empty" value=""></option>
                    {props.operators.map(operator => (
                            <option key={operator.id} value={operator.name}>
                                {operator.name}
                            </option>
                        )
                    )}
                </select>
            )
                ;
        })),
    }
}

export function subscriberIdWidget(disabled) {
    return {
        "ui:widget": withRouter(connect(mapStateToProps)((props) => {
            const onChangeSubscriberId = (event) => {
                props.onChange(event.target.value);
            };

            return (
                <select disabled={disabled} onChange={onChangeSubscriberId} value={props.value} id="root_subscriberId"
                        className='form-control' required>
                    <option key="empty" value=""></option>
                    {props.subscribers.map(subscriber => (
                        <option key={subscriber.id} value={subscriber.name}>
                            {subscriber.name}
                        </option>
                    ))}
                </select>
            );
        })),
    }
}

export function planIdWidget(disabled) {
    return {
        "ui:widget": withRouter(connect(mapStateToProps)((props) => {
            const onChangePlanId = (event) => {
                props.onChange(event.target.value);
            };

            return (
                <select disabled={disabled} onChange={onChangePlanId} value={props.value} id="root_planId"
                        className='form-control' required>
                    <option key="empty" value=""></option>
                    {props.plans.map(plan => (
                        <option key={plan.id} value={plan.name}>
                            {plan.name}
                        </option>
                    ))}
                </select>
            );
        })),
    }
}

export function orderIdWidget(disabled) {
    return {
        "ui:widget": withRouter(connect(mapStateToProps)((props) => {
            const onChangeOrderId = (event) => {
                props.onChange(event.target.value);
            };

            return (
                <select disabled={disabled} onChange={onChangeOrderId} value={props.value} id="root_orderId" className='form-control' required>
                    <option key="empty" value=""></option>
                    {props.orders.map(order => (
                        <option key={order.id} value={order.name}>
                            {order.name}
                        </option>
                    ))}
                </select>
            );
        })),
    }
}

export function dsimIdWidget(disabled) {
    return {
        "ui:widget": withRouter(connect(mapStateToProps)((props) => {
            const onChangedSIMID = (event) => {
                props.onChange(event.target.value);
            };

            return (
                <select disabled={disabled} onChange={onChangedSIMID} value={props.value} id="root_dsimID"
                        className='form-control' required>
                    <option key="empty" value=""></option>
                    {props.dsims.map(dsim => (
                    <option key={dsim.id} value={dsim.id}>
                        {dsim.id}
                    </option>
                    ))}
                </select>
            );
        })),
    }
};

const mapStateToProps = state => ({
    plans: state.plan.plans,
    orders: state.order.orders,
    operators: state.operator.operators,
    subscribers: state.subscriber.subscribers,
    dsims: state.dsim.dsims,
});