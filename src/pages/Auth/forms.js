import { IndustryData } from "../../config/industry";

export let businessModalSchema = {
    type: "object",
    required: [
        "organizationName",
        "organizationAddress",
        "industry",
    ],
    properties: {
        organizationName: {
            type: "string",
            title: "Organization Name",
            default: "",
        },

        organizationAddress: {
            type: "string",
            title: "Organization Address",
            default: "",
        },

        industry: {
            type: "string",
            title: "Industry",
            default: "Accounting",
            enum: IndustryData
        }
    },
};

export let businessModalUISchema = {};


export let infoModalSchema = {
    type: "object",
    required: [
        "firstName",
        "lastName",
        "userName",
        "password",
        "confirmPassword"
    ],
    properties: {
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

        userName: {
            type: "string",
            title: "Email",
            default: "",
        },

        password: {
            type: "string",
            title: "Password",
            default: ""
        },

        confirmPassword: {
            type: "string",
            title: "Confirm Password",
            default: ""
        },

        title: {
            type: "string",
            title: "Title",
            default: ""
        },

        phoneNumber: {
            type: "string",
            format: "phone-us",
            title: "Phone Number",
            default: "",
        }
    },
};

export let infoModalUISchema = {
    password: {
        "ui:widget": "password"
    },
    confirmPassword: {
        "ui:widget": "password"
    },
};
