import Serializable from "./Serializable";

export default class Payout extends Serializable{
  id = '';
  payerName = "";
  payeeName = "";
  payoutType = "";
  payoutAmountCurrency = "";
  payoutAmount = "";
  status = "";
  createdDate = '';

  constructor(id, payerName, payeeName, payoutType, payoutAmountCurrency, payoutAmount, status, createdDate) {
    super();
    this.id = id;
    this.payerName = payerName;
    this.payeeName = payeeName;
    this.payoutType = payoutType;
    this.payoutAmountCurrency = payoutAmountCurrency;
    this.payoutAmount = payoutAmount;
    this.status = status;
    this.createdDate = createdDate;
  }
}
