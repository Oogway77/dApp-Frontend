import Serializable from "./Serializable";

export default class Invoice extends Serializable{
  id = '';
  operatorId = '';
  amount = "";
  status = "";
  createdDate = "";
  paidDate = "";

  constructor(id, amount, status, createdDate, paidDate, operatorId) {
    super();
    this.id = id;
    this.operatorId = operatorId;
    this.amount = amount;
    this.status = status;
    this.createdDate = createdDate;
    this.paidDate = paidDate;
  }
}
