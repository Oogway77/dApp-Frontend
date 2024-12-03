import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import QRCode from 'react-qr-code';
import { IndustryData } from '../config/industry';
import {cloneDeep} from "lodash/lang";
import {RJSFSchema} from "@rjsf/utils";
import "lodash";
import {operatorIdWidget, qrWidget, subscriberIdWidget} from "../components/FormWidgets";


const mapStateToProps = state => ({
  plans: state.plan.plans,
  orders: state.order.orders,
  gateways: state.gateway.gateways,
  operators: state.operator.operators,
  subscribers: state.subscriber.subscribers,
  dsims: state.dsim.dsims,
});

let gatewayModalSuperSchema = {
  type: "object",
  required: [
    "gatewayName",
    "gatewayIp",
    "operatorName"
    ],
  properties: {
    gatewayId: {
      type: "string",
      title: "Gateway ID",
      pattern: "^[0-9a-zA-Z-]*$",
      default: "D432fbb3-d2f1-4a97-9ef7-75bd81c00000",
      readOnly: true,
    },

    gatewayName: {
      type: "string",
      title: "Gateway Name",
      default: "",
    },

    operatorName: {
      type: "string",
      title: "Operator Name",
      default: "",
    },

    operatorId: {
      type: "string",
      title: "Operator ID",
      default: "",
      readOnly: true,
    },

    gatewayIp: {
      type: "string",
      title: "Gateway IP",
      default: "",
    },

    // gatewayLocation: {
    //   type: "object",
    //   title: "Gateway GPS Location",
    //   required: [
    //     "latitude",
    //     "longitude",
    //   ],
    //   properties: {
    //     latitude: {
    //       type: "number",
    //     },
    //     longitude: {
    //       type: "number",
    //     },
    //   },
    // },

    imei: {
      type: "string",
      title: "IMEI",
      default: "",
    },

    installerID: {
      type: "string",
      title: "Installer ID",
    default: "",
    },

     installerType: {
      type: "string",
      title: "Installer Type",
      default: "SELF",
      enum: ["BLOXTEL", "SELF"],
      readOnly: true,
    },
    registerIP: {
      type: "string",
      title: "Registrar IP",
      default: "",
      readOnly: true,
    },
    verifierIP: {
      type: "string",
      title: "Verifier IP",
      default: "",
      readOnly: true,
    },
    allowSharing: {
      type: "boolean",
      title: "Allow Sharing",
      default: false,
    },
    status: {
      type: "string",
      title: "Gateway Status",
      default: "UNPROVISIONED",
      enum: ["OFFLINE", "UNPROVISIONED", "PROVISIONED", "TRUSTED", "TAMPERED"],
      readOnly: true,
    },
  },
};

let gatewayModalSuperUISchema = {
  operatorName: {
    "ui:widget": withRouter(connect(mapStateToProps)((props) => {
      const onChangeOperatorID = (event) => {
        props.onChange(event.target.value);
      };

      return (
        <select onChange={onChangeOperatorID} value={props.value} id="root_operatorId" className='form-control' required>
          <option key="empty" value=""></option>
          {props.operators.map(operator => (
            <option key={operator.id} value={operator.name}>
              {operator.name}
            </option>
          ))}
        </select>
      );
    })),
  }
};

let gatewayModalSuperEditUISchema = {
  operatorName: {
    "ui:widget": withRouter(connect(mapStateToProps)((props) => {
      const onChangeOperatorID = (event) => {
        props.onChange(event.target.value);
      };

      return (
        <select disabled onChange={onChangeOperatorID} value={props.value} id="root_operatorId" className='form-control' required>
          <option key="empty" value=""></option>
          {props.operators.map(operator => (
            <option key={operator.id} value={operator.name}>
              {operator.name}
            </option>
          ))}
        </select>
      );
    })),
  }
};

let gatewayModalSchema = {
  type: "object",
  required: [
    "gatewayName",
    "gatewayIp"
    ],
  properties: {
    gatewayId: {
      type: "string",
      title: "Gateway ID",
      pattern: "^[0-9a-zA-Z-]*$",
      default: "D432fbb3-d2f1-4a97-9ef7-75bd81c00000",
      readOnly: true,
    },

    gatewayName: {
      type: "string",
      title: "Gateway Name",
      default: "",
    },

    gatewayIp: {
      type: "string",
      title: "Gateway IP",
      default: "",
    },

    // gatewayLocation: {
    //   type: "object",
    //   title: "Gateway GPS Location",
    //   required: [
    //     "latitude",
    //     "longitude",
    //   ],
    //   properties: {
    //     latitude: {
    //       type: "number",
    //     },
    //     longitude: {
    //       type: "number",
    //     },
    //   },
    // },

    imei: {
      type: "string",
      title: "IMEI",
      default: "",
    },

    installerID: {
      type: "string",
      title: "Installer ID",
    default: "",
    },

     installerType: {
      type: "string",
      title: "Installer Type",
      default: "SELF",
      enum: ["BLOXTEL", "SELF"],
      readOnly: true,
    },
    registerIP: {
      type: "string",
      title: "Registrar IP",
      default: "",
      readOnly: true,
    },
    verifierIP: {
      type: "string",
      title: "Verifier IP",
      default: "",
      readOnly: true,
    },
    allowSharing: {
      type: "boolean",
      title: "Allow Sharing",
      default: false,
    },
    status: {
      type: "string",
      title: "Gateway Status",
      default: "UNPROVISIONED",
      enum: ["OFFLINE", "UNPROVISIONED", "PROVISIONED", "TRUSTED", "TAMPERED"],
      readOnly: true,
    },
  },
};

let gatewayModalUISchema = {};

let cellModalSuperSchema = {
  type: "object",
  required: [
    "name",
    "plmn",
    "operatorName",
    "lac",
    "cellID",
    "cellBand",
    "gatewayName"
    ],
  properties: {
    uuID: {
      type: "string",
      title: "UUID",
      pattern: "^[0-9a-zA-Z-]*$",
      default: "",
      readOnly: true,
    },

    name: {
      type: "string",
      title: "Cell Name",
      default: "",
    },

    operatorName: {
      type: "string",
      title: "Operator Name",
      default: "",
    },

    operatorId: {
      type: "string",
      title: "Operator ID",
      default: "",
      readOnly: true,
    },

    plmn: {
      type: "integer",
      title: "PLMN",
      default: 1,
      minimum: 1,
    },

    lac: {
      type: "string",
      title: "LAC",
      default: "",
    },

    radioType: {
      type: "string",
      title: "Radio Type",
      default: "5G NR",
      enum: ["5G NR"],
      readOnly: true,
    },

    cellID: {
      type: "string",
      title: "Cell ID",
      default: "",
    },

    cellBand: {
      type: "string",
      title: "Cell Band/Frequency",
      default: "",
    },

    imei: {
      type: "string",
      title: "IMEI",
      default: "",
    },

    installerID: {
      type: "string",
      title: "Installer ID",
      default: "",
    },

    installerType: {
      type: "string",
      title: "Installer Type",
      default: "SELF",
      enum: ["BLOXTEL", "SELF"],
      readOnly: true,
    },

    cellLocation: {
      type: "object",
      title: "",
      required: [
        "latitude",
        "longitude",
      ],
      properties: {
        latitude: {
          type: "number",
        },
        longitude: {
          type: "number",
        },
      },
    },

    altitude: {
      type: "number",
      title: "Altitude",
    },

    azimuth: {
      type: "number",
      title: "Azimuth",
    },

    height: {
      type: "number",
      title: "Height",
    },

    beamwidth: {
      type: "number",
      title: "Beamwidth",
    },

    downtilt: {
      type: "number",
      title: "Downtilt",
    },

    gain: {
      type: "number",
      title: "Gain",
    },

    gatewayName: {
      type: "string",
      title: "Associated Access Gateway Name",
      default: "",
    },

    gatewayId: {
      type: "string",
      title: "Associated Access Gateway ID",
      default: "",
    },

    cellType: {
      type: "string",
      title: "Cell Type",
      default: "INDOOR",
      enum: ["INDOOR", "OUTDOOR"],
      readOnly: true,
    },

    status: {
      type: "string",
      title: "Status",
      default: "OFFLINE",
      enum: ["OFFLINE", "ONLINE"],
      readOnly: true,
    },
  },
};


let cellModalSuperUISchema = {
  operatorName: {
    "ui:widget": withRouter(connect(mapStateToProps)((props) => {
      const onChangeOperatorID = (event) => {
        props.onChange(event.target.value);
      };

      return (
        <select onChange={onChangeOperatorID} value={props.value} id="root_operatorId" className='form-control' required>
          <option key="empty" value=""></option>
          {props.operators.map(operator => (
            <option key={operator.id} value={operator.name}>
              {operator.name}
            </option>
          ))}
        </select>
      );
    })),
  },
  gatewayName: {
    "ui:widget": withRouter(connect(mapStateToProps)((props) => {
      const onChangeGatewayName = (event) => {
        props.onChange(event.target.value);
      };

      return (
        <select onChange={onChangeGatewayName} value={props.value} id="root_gatewayName" className='form-control' required>
          <option key="empty" value=""></option>
          {props.gateways.map(gateway => (
            <option key={gateway.id} value={gateway.name}>
              {gateway.name}
            </option>
          ))}
        </select>
      );
    })),
  },
};

let cellModalSuperEditUISchema = {
  operatorName: {
    "ui:widget": withRouter(connect(mapStateToProps)((props) => {
      const onChangeOperatorID = (event) => {
        props.onChange(event.target.value);
      };

      return (
        <select disabled onChange={onChangeOperatorID} value={props.value} id="root_operatorId" className='form-control' required>
          <option key="empty" value=""></option>
          {props.operators.map(operator => (
            <option key={operator.id} value={operator.name}>
              {operator.name}
            </option>
          ))}
        </select>
      );
    })),
  },
  gatewayName: {
    "ui:widget": withRouter(connect(mapStateToProps)((props) => {
      const onChangeGatewayName = (event) => {
        props.onChange(event.target.value);
      };

      return (
        <select onChange={onChangeGatewayName} value={props.value} id="root_gatewayName" className='form-control' required>
          <option key="empty" value=""></option>
          {props.gateways.map(gateway => (
            <option key={gateway.id} value={gateway.name}>
              {gateway.name}
            </option>
          ))}
        </select>
      );
    })),
  },
};

let cellModalSchema = {
  type: "object",
  required: [
    "name",
    "plmn",
    "lac",
    "cellID",
    "cellBand",
    "gatewayName"
    ],
  properties: {
    uuID: {
      type: "string",
      title: "UUID",
      pattern: "^[0-9a-zA-Z-]*$",
      default: "",
      readOnly: true,
    },

    name: {
      type: "string",
      title: "Cell Name",
      default: "",
    },

    plmn: {
      type: "integer",
      title: "PLMN",
      default: 1,
      minimum: 1,
    },

    lac: {
      type: "string",
      title: "LAC",
      default: "",
    },

    radioType: {
      type: "string",
      title: "Radio Type",
      default: "5G NR",
      enum: ["5G NR"],
      readOnly: true,
    },

    cellID: {
      type: "string",
      title: "Cell ID",
      default: "",
    },

    cellBand: {
      type: "string",
      title: "Cell Band/Frequency",
      default: "",
    },

    imei: {
      type: "string",
      title: "IMEI",
      default: "",
    },

    installerID: {
      type: "string",
      title: "Installer ID",
      default: "",
    },

    installerType: {
      type: "string",
      title: "Installer Type",
      default: "SELF",
      enum: ["BLOXTEL", "SELF"],
      readOnly: true,
    },

    cellLocation: {
      type: "object",
      title: "",
      required: [
        "latitude",
        "longitude",
      ],
      properties: {
        latitude: {
          type: "number",
        },
        longitude: {
          type: "number",
        },
      },
    },

    altitude: {
      type: "number",
      title: "Altitude",
    },

    azimuth: {
      type: "number",
      title: "Azimuth",
    },

    height: {
      type: "number",
      title: "Height",
    },

    beamwidth: {
      type: "number",
      title: "Beamwidth",
    },

    downtilt: {
      type: "number",
      title: "Downtilt",
    },

    gain: {
      type: "number",
      title: "Gain",
    },

    gatewayName: {
      type: "string",
      title: "Associated Access Gateway Name",
      default: "",
    },

    gatewayId: {
      type: "string",
      title: "Associated Access Gateway ID",
      default: "",
    },


    cellType: {
      type: "string",
      title: "Cell Type",
      default: "INDOOR",
      enum: ["INDOOR", "OUTDOOR"],
      readOnly: true,
    },

    status: {
      type: "string",
      title: "Status",
      default: "OFFLINE",
      enum: ["OFFLINE", "ONLINE"],
      readOnly: true,
    },
  },
};

let cellModalUISchema = {
  gatewayName: {
    "ui:widget": withRouter(connect(mapStateToProps)((props) => {
      const onChangeGatewayName = (event) => {
        props.onChange(event.target.value);
      };

      return (
        <select onChange={onChangeGatewayName} value={props.value} id="root_gatewayName" className='form-control' required>
          <option key="empty" value=""></option>
          {props.gateways.map(gateway => (
            <option key={gateway.id} value={gateway.name}>
              {gateway.name}
            </option>
          ))}
        </select>
      );
    })),
  },
}

// payouts

let payoutModalSuperSchema = {
  type: "object",
  required: [
    "operatorName",
    "payerName",
    "payoutType",
    "payoutAmount",
    ],
  properties: {
    operatorName: {
      type: "string",
      title: "Operator Name",
      default: "",
    },

    operatorId: {
      type: "string",
      title: "Operator ID",
      default: "",
      readOnly: true,
    },

    payerName: {
      type: "string",
      title: "Payer Name",
      default: "Bloxtel",
      readOnly: true,
    },

    payoutType: {
      type: "string",
      title: "Payout Type",
      enum: ["NEUTRAL_HOST", "PEER_VALIDATION"],
      default: "NEUTRAL_HOST",
    },

    payoutAmountCurrency: {
      type: "string",
      title: "Payout Amount Currency",
      default: "USD",
      readOnly: true,
    },

    payoutAmount: {
      type: "number",
      title: "Payout Amount",
      default: 0,
    },

    status: {
      type: "string",
      title: "Status",
      enum: ["DUE", "PAID", "PAST_DUE"],
      default: "DUE",
    },
  },
};

let payoutModalSuperUISchema = {
  operatorName: {
    "ui:widget": withRouter(connect(mapStateToProps)((props) => {
      const onChangeOperatorID = (event) => {
        props.onChange(event.target.value);
      };

      return (
        <select onChange={onChangeOperatorID} value={props.value} id="root_operatorId" className='form-control' required>
          <option key="empty" value=""></option>
          {props.operators.map(operator => (
            <option key={operator.id} value={operator.name}>
              {operator.name}
            </option>
          ))}
        </select>
      );
    })),
  }
};

let payoutModalSuperEditUISchema = {
  operatorName: {
    "ui:widget": withRouter(connect(mapStateToProps)((props) => {
      const onChangeOperatorID = (event) => {
        props.onChange(event.target.value);
      };

      return (
        <select disabled onChange={onChangeOperatorID} value={props.value} id="root_operatorId" className='form-control' required>
          <option key="empty" value=""></option>
          {props.operators.map(operator => (
            <option key={operator.id} value={operator.name}>
              {operator.name}
            </option>
          ))}
        </select>
      );
    })),
  }
};

let payoutModalSchema = {
  type: "object",
  required: [
    "payerName",
    "payoutType",
    "payoutAmount",
    ],
  properties: {
    payerName: {
      type: "string",
      title: "Payer Name",
      default: "Bloxtel",
      readOnly: true,
    },

    payoutType: {
      type: "string",
      title: "Payout Type",
      enum: ["NEUTRAL_HOST", "PEER_VALIDATION"],
      default: "NEUTRAL_HOST",
    },

    payoutAmountCurrency: {
      type: "string",
      title: "Payout Amount Currency",
      default: "USD",
      readOnly: true,
    },

    payoutAmount: {
      type: "number",
      title: "Payout Amount",
      default: 0,
    },

    status: {
      type: "string",
      title: "Status",
      enum: ["DUE", "PAID", "PAST_DUE"],
      default: "DUE",
    },
  },
};

let payoutModalUISchema = {};

let phoneModalSuperSchema = {
  type: "object",
  required: [
    "operatorName",
    "manufacturerName",
    "modelName",
    "imei",
    "dsimId",
    "sliceId",
    "osId",
    "osAppId",
    "osAppIdType",
    ],
  properties: {
    uuId: {
      type: "string",
      title: "UUID",
      default: "",
      readOnly: true,
    },

    operatorName: {
      type: "string",
      title: "Operator Name",
      default: "",
    },

    operatorId: {
      type: "string",
      title: "Operator ID",
      default: "",
      readOnly: true,
    },

    manufacturerName: {
      type: "string",
      title: "Manufacturer Name",
      default: "",
    },

    modelName: {
      type: "string",
      title: "Model Name",
      default: "",
    },

    imei: {
      type: "string",
      title: "IMEI",
      default: "",
    },

    dsimId: {
      type: "string",
      title: "Associated dSIM IMSI",
      default: "",
    },

    dsimAuthMethod: {
      type: "string",
      title: "Associated dSIM Auth. Method",
      default: "",
      readOnly: true,
    },

    sliceId: {
      type: "string",
      title: "Slice ID",
      default: "",
    },

    osId: {
      type: "string",
      title: "OS ID",
      default: "",
    },

    osAppId: {
      type: "string",
      title: "OS App ID",
      default: "",
    },

    osAppIdType: {
      type: "string",
      title: "OS App Type",
      default: "",
    },

    appId: {
      type: "string",
      title: "App ID",
      default: "",
    },
  },
};

let phoneModalSuperUISchema = {
  operatorName: {
    "ui:widget": withRouter(connect(mapStateToProps)((props) => {
      const onChangeOperatorID = (event) => {
        props.onChange(event.target.value);
      };

      return (
        <select onChange={onChangeOperatorID} value={props.value} id="root_operatorId" className='form-control' required>
          <option key="empty" value=""></option>
          {props.operators.map(operator => (
            <option key={operator.id} value={operator.name}>
              {operator.name}
            </option>
          ))}
        </select>
      );
    })),
  },
  dsimId: {
    "ui:widget": withRouter(connect(mapStateToProps)((props) => {
      const onChangedSIMID = (event) => {
        props.onChange(event.target.value);
      };

      return (
        <select onChange={onChangedSIMID} value={props.value} id="root_dsimID" className='form-control' required>
          <option key="empty" value=""></option>
          {props.dsims.map(dsim => (
            <option key={dsim.id} value={dsim.id}>
              {dsim.id}
            </option>
          ))}
        </select>
      );
    })),
  },
};

let phoneModalSuperEditUISchema = {
  operatorName: {
    "ui:widget": withRouter(connect(mapStateToProps)((props) => {
      const onChangeOperatorID = (event) => {
        props.onChange(event.target.value);
      };

      return (
        <select disabled onChange={onChangeOperatorID} value={props.value} id="root_operatorId" className='form-control' required>
          <option key="empty" value=""></option>
          {props.operators.map(operator => (
            <option key={operator.id} value={operator.name}>
              {operator.name}
            </option>
          ))}
        </select>
      );
    })),
  },
  dsimId: {
    "ui:widget": withRouter(connect(mapStateToProps)((props) => {
      const onChangedSIMID = (event) => {
        props.onChange(event.target.value);
      };

      return (
        <select onChange={onChangedSIMID} value={props.value} id="root_dsimID" className='form-control' required>
          <option key="empty" value=""></option>
          {props.dsims.map(dsim => (
            <option key={dsim.id} value={dsim.id}>
              {dsim.id}
            </option>
          ))}
        </select>
      );
    })),
  },
};

let phoneModalSchema = {
  type: "object",
  required: [
    "manufacturerName",
    "modelName",
    "imei",
    "sliceId",
    "osId",
    "osAppId",
    "osAppIdType",
    ],
  properties: {
    uuId: {
      type: "string",
      title: "UUID",
      default: "",
      readOnly: true,
    },

    manufacturerName: {
      type: "string",
      title: "Manufacturer Name",
      default: "",
    },

    modelName: {
      type: "string",
      title: "Model Name",
      default: "",
    },

    imei: {
      type: "string",
      title: "IMEI",
      default: "",
    },
    
    dsimId: {
      type: "string",
      title: "Associated dSIM",
      default: "",
    },

    dsimAuthMethod: {
      type: "string",
      title: "Associated dSIM Auth. Method",
      default: "",
      readOnly: true,
    },

    sliceId: {
      type: "string",
      title: "Slice ID",
      default: "",
    },

    osId: {
      type: "string",
      title: "OS ID",
      default: "",
    },
  
    osAppId: {
      type: "string",
      title: "OS App ID",
      default: "",
    },
  
    osAppIdType: {
      type: "string",
      title: "OS App Type",
      default: "",
    },
  
    appId: {
      type: "string",
      title: "App ID",
      default: "",
    },
  },
};

let phoneModalUISchema = {
  dsimId: {
    "ui:widget": withRouter(connect(mapStateToProps)((props) => {
      const onChangedSIMID = (event) => {
        props.onChange(event.target.value);
      };

      return (
        <select onChange={onChangedSIMID} value={props.value} id="root_dsimID" className='form-control' required>
          <option key="empty" value=""></option>
          {props.dsims.map(dsim => (
            <option key={dsim.id} value={dsim.id}>
              {dsim.id}
            </option>
          ))}
        </select>
      );
    })),
  },
}

let walletModalSchema = {
  type: "object",
  required: [
    "walletId",
    ],
  properties: {
    walletId: {
      type: "string",
      title: "Wallet ID",
      pattern: "^[0-9a-zA-Z-]*$",
    default: "",
      readOnly: true,
    },
    ownerID: {
      type: "string",
      title: "Operator ID",
    default: "",
    },

     ownerType: {
      type: "string",
      title: "Owner Type",
      default: "OPERATOR",
      enum: ["SUBSCRIBER", "OPERATOR"],
      readOnly: true,
    },
  },
};

const invoiceModalSchema = (isSuper, invoiceType) =>{
  let retSchema = {
    type: "object",
    required: [
      "invoiceTo",
      "invoiceAmount",
      "operatorName"
      ],
    properties: {
      invoiceId: {
        type: "string",
        title: "Invoice ID",
        pattern: "^[0-9a-zA-Z-]*$",
        default: "",
        readOnly: true,
      },

      invoiceTo: {
        type: "string",
        title: "Invoice To",
        default: "",
      },

      operatorName: {
        type: "string",
        title: "Operator Name",
        default: "",
      },
  
      operatorId: {
        type: "string",
        title: "Operator ID",
        default: "",
        readOnly: true,
      },

      invoiceAmount: {
        type: "string",
        title: "Amount",
      },
  
      invoiceDueDate: {
        type: "string",
        format: "date",
        title: "Due Date",
        default: "2023-07-17",
      },
  
      invoicePaidDate: {
        type: "string",
        title: "Paid Date",
        format: "date",
        default: "2023-07-17",
      },
  
      invoiceType: {
        type: "string",
        title: "Invoice Type",
        default: "Subscription",
        enum: ["Subscription", "dSIM_Purchase", "Offloading"],
      },
  
      offloadedGB: {
        type: "number",
        title: "Offloaded GB",
        default: 0,
      },
  
      pricePerGB: {
        type: "number",
        title: "Price per GB ($)",
        default: 0.10,
        readOnly: true
      },

      orderId: {
        type: "string",
        title: "Associated Order ID",
        default: "",
      },

      status: {
        type: "string",
        title: "Status",
        default: "DUE",
        enum: ["DUE", "PAID", "PAST_DUE"],
      },
    },
  };

  if (!isSuper) {
    retSchema.required = ["invoiceAmount"];
    delete retSchema.properties.operatorName;
    delete retSchema.properties.operatorId;
  }

  if (invoiceType === "Subscription") {
    delete retSchema.properties.offloadedGB;
    delete retSchema.properties.pricePerGB;
    delete retSchema.properties.orderId;
  }

  if (invoiceType === "Offloading") {
    delete retSchema.properties.orderId;
  }

  if (invoiceType === "dSIM_Purchase") {
    delete retSchema.properties.offloadedGB;
    delete retSchema.properties.pricePerGB;
  }

  return retSchema;
}

const invoiceModalUISchema = (isEditing) => {
  let retUISchema = {
    orderId: {
      "ui:widget": withRouter(connect(mapStateToProps)((props) => {
        const onChangeOrderID = (event) => {
          props.onChange(event.target.value);
        };
  
        return (
          <select onChange={onChangeOrderID} value={props.value} id="root_orderID" className='form-control' required>
            <option key="empty" value=""></option>
            {props.orders.map(order => (
              <option key={order.id} value={`${order.id}____${order.type}____${order.quantity}`}>
                {order.id}____{order.type}____{order.quantity}
              </option>
            ))}
          </select>
        );
      })),
    },
  
    invoiceTo: {
      "ui:widget": withRouter(connect(mapStateToProps)((props) => {
        const onChangeOperatorID = (event) => {
          props.onChange(event.target.value);
        };
  
        return (
          <select onChange={onChangeOperatorID} value={props.value} id="root_operatorId" className='form-control' required>
            <option key="empty" value=""></option>
            {props.operators.map(operator => (
              <option key={operator.id} value={operator.name}>
                {operator.name}
              </option>
            ))}
          </select>
        );
      })),
    },

    operatorName: {
      "ui:widget": withRouter(connect(mapStateToProps)((props) => {
        const onChangeOperatorID = (event) => {
          props.onChange(event.target.value);
        };
  
        return (
          <select disabled={isEditing} onChange={onChangeOperatorID} value={props.value} id="root_operatorId" className='form-control' required>
            <option key="empty" value=""></option>
            {props.operators.map(operator => (
              <option key={operator.id} value={operator.name}>
                {operator.name}
              </option>
            ))}
          </select>
        );
      })),
    }
  };

  return retUISchema;
} 

let blockModalSchema = {
  type: "object",
  required: [],
  properties: {
    blockId: {
      type: "string",
      title: "Block ID",
      default: "",
      readOnly: true,
    },
    blockHash: {
      type: "string",
      title: "Block Hash",
      default: "",
      readOnly: true,
    },
    transactionsCount: {
      type: "string",
      title: "Transactions Count",
      default: "",
      readOnly: true,
    },
  },
};

let operatorModalSchema = {
  type: "object",
  required: [
    "businessName",
    "businessAddress",
    ],
  properties: {
    operatorLogo: {
      type: "string",
      default: "http://localhost:8080/dsim.png",
      title: "Operator Logo",
    },
    operatorId: {
      type: "string",
      title: "Operator ID",
      pattern: "^[0-9a-zA-Z-]*$",
    default: "",
      readOnly: true,
    },
    businessName: {
      type: "string",
      title: "Organization Name",
      default: "",
    },
    businessAddress: {
      type: "string",
      title: "Organization Address",
      default: "",
    },
    businessIndustry: {
      type: "string",
      title: "Industry",
      enum: IndustryData,
      default: "",
    },
    subscriptionType: {
      type: "string",
      title: "Subscription Type",
      enum: ["Basic", "Standard", "Advanced"],
      default: "Basic",
    },
    subscriptionStatus: {
      type: "string",
      title: "Subscription Status",
      enum: ["PENDING", "APPROVED"],
      default: "PENDING",
    },
    status: {
      type: "string",
      title: "Status",
      enum: ["INACTIVE", "ACTIVE"],
      default: "INACTIVE",
    },
    evmAddress: {
      type: "string",
      title: "EVM Address",
      default: "",
      readOnly: true,
    },
    hederaAccountId: {
      type: "string",
      title: "Hedera Account ID",
      default: "",
      readOnly: true,
    },
    explorerLink: {
      type: "string",
      title: "Explorer link",
      default: "",
      readOnly: true,
      format: "uri",
    },
  },
};

let operatorNewModalSchema = {
  type: "object",
  required: [
    "businessName",
    "businessAddress",
    ],
  properties: {
    operatorId: {
      type: "string",
      title: "Operator ID",
      pattern: "^[0-9a-zA-Z-]*$",
      default: "",
      readOnly: true,
    },
    businessName: {
      type: "string",
      title: "Organization Name",
      default: "",
    },
    businessAddress: {
      type: "string",
      title: "Organization Address",
      default: "",
    },
    businessIndustry: {
      type: "string",
      title: "Industry",
      enum: IndustryData,
      default: "",
    },
    subscriptionType: {
      type: "string",
      title: "Subscription Type",
      enum: ["Basic", "Standard", "Advanced"],
      default: "Basic",
    },
    subscriptionStatus: {
      type: "string",
      title: "Subscription Status",
      enum: ["PENDING", "APPROVED"],
      default: "PENDING",
    },
    email: {
      type: "string",
      title: "User Email",
      default: "",
    },
    password: {
      type: "string",
      title: "Password",
      default: "",
    },
    status: {
      type: "string",
      title: "Status",
      enum: ["INACTIVE", "ACTIVE"],
      default: "INACTIVE",
    },
  },
};

let operatorModalUISchema = {
  operatorLogo: {
    "ui:widget": (props) => {
      const [file, setFile] = useState(props.value);

      useEffect(() => {
        if (props.value) {
          setFile(props.value);
        }
      }, [props]);
    
      const handleChange = (event) => {
        const url = URL.createObjectURL(event.target.files[0]);
        setFile(url);
        props.onChange(url);
      }
    
      return (
        <div>
          <img style={{ margin: 10 }} alt="logo" width={150} src={file}/>
          <input style={{ margin: 10 }} type="file" onChange={handleChange}/>
          <div style={{ marginLeft: 10 }}>{file.replace('blob:', '')}</div>
        </div>
      );
    },
  },
  explorerLink: {
    "ui:widget": "UriWidget",
  }
}

let subscriberModalSchema = {
  type: "object",
  required: [
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    ],
  properties: {
    // subscriberLogo: {
    //   type: "string",
    //   default: "http://localhost:8080/dsim.png",
    //   title: "Subscriber Logo",
    // },
    userId: {
      type: "string",
      title: "Subscriber ID",
      pattern: "^[0-9a-zA-Z-]*$",
      default: "",
      readOnly: true,
    },
    firstName: {
      type: "string",
      title: "First Name",
      default: "",
    },
    lastName: {
      type: "string",
      title: "Last Name",
      default: "",
    },
    email: {
      type: "string",
      title: "User Email",
      default: "",
    },
    password: {
      type: "string",
      title: "Password",
      default: "",
    },
    phoneNumber: {
      type: "string",
      title: "Phone Number",
      default: "",
    },
    status: {
      type: "string",
      title: "Status",
      enum: ["INACTIVE", "ACTIVE"],
      default: "INACTIVE",
    },
    evmAddress: {
      type: "string",
      title: "EVM Address",
      default: "",
    }
  },
};

let subscriberModalUISchema = {
  subscriberLogo: {
    "ui:widget": (props) => {
      const [file, setFile] = useState(props.value);

      useEffect(() => {
        if (props.value) {
          setFile(props.value);
        }
      }, [props]);
    
      const handleChange = (event) => {
        const url = URL.createObjectURL(event.target.files[0]);
        setFile(url);
        props.onChange(url);
      }
    
      return (
        <div>
          <img style={{ margin: 10 }} alt="logo" width={150} src={file}/>
          <input style={{ margin: 10 }} type="file" onChange={handleChange}/>
          <div style={{ marginLeft: 10 }}>{file.replace('blob:', '')}</div>
        </div>
      );
    },
  }
}

let profileModalSchema = {
  type: "object",
  required: [],
  properties: {
    operatorId: {
      type: "string",
      title: "Operator ID",
      default: "",
      readOnly: true,
    },
    operatorName: {
      type: "string",
      title: "Operator Name",
      default: "",
      readOnly: true,
    },
  },
};

let userModalSchema = {
  type: "object",
  required: [
    "email",
    ],
  properties: {
    userId: {
      type: "string",
      title: "User ID",
      pattern: "^[0-9a-zA-Z-]*$",
      default: "",
      readOnly: true,
    },
    firstName: {
      type: "string",
      title: "First Name",
      default: "",
    },
    lastName: {
      type: "string",
      title: "Last Name",
      default: "",
    },
    email: {
      type: "string",
      title: "User Email",
      default: "",
    },
    password: {
      type: "string",
      title: "Password",
      default: "",
    },
    title: {
      type: "string",
      title: "Title",
      default: "",
    },
    phoneNumber: {
      type: "string",
      title: "Phone Number",
      default: "",
    },
    serverUrl: {
      type: "string",
      title: "Notification Server URL",
      default: "",
    },
    role: {
      type: "string",
      title: "Role",
      enum: ["ADMIN", "TECHNICIAN", "GUARD"],
      default: "TECHNICIAN",
    },
    status: {
      type: "string",
      title: "Status",
      enum: ["INACTIVE", "ACTIVE"],
      default: "INACTIVE",
    },
  },
};

export {
  gatewayModalSuperSchema,
  gatewayModalSuperUISchema,
  gatewayModalSuperEditUISchema,
  gatewayModalSchema,
  gatewayModalUISchema,
  cellModalSuperSchema,
  cellModalSuperUISchema,
  cellModalSuperEditUISchema,
  cellModalSchema,
  cellModalUISchema,
  walletModalSchema,
  invoiceModalSchema,
  invoiceModalUISchema,
  payoutModalSchema,
  payoutModalUISchema,
  payoutModalSuperSchema,
  payoutModalSuperUISchema,
  payoutModalSuperEditUISchema,
  blockModalSchema,
  operatorNewModalSchema,
  operatorModalSchema,
  operatorModalUISchema,
  subscriberModalSchema,
  subscriberModalUISchema,
  profileModalSchema,
  phoneModalSuperSchema,
  phoneModalSuperUISchema,
  phoneModalSuperEditUISchema,
  phoneModalSchema,
  phoneModalUISchema,
  userModalSchema
};
