import Serializable from "./Serializable";

export default class Operator extends Serializable{
  id = '';
  name = "";
  operatorLogo = "";
  subscriptionType = "";
  subscriptionStatus = "";
  status = "";
  createdDate = '';

  constructor(id, name, operatorLogo, subscriptionType, subscriptionStatus, status, createdDate) {
    super();
    this.id = id;
    this.name = name;
    this.subscriptionType = subscriptionType;
    this.subscriptionStatus = subscriptionStatus;
    this.status = status;
    this.operatorLogo = operatorLogo;
    this.createdDate = createdDate;
  }
}
