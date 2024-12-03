import Serializable from "./Serializable";

export default class Block extends Serializable{
  id = '';
  hash = '';
  createdDate = '';
  transactionsCount = '';
  transactions = [];

  constructor(id, hash, createdDate, transactionsCount, transactions = []) {
    super();
    this.id = id;
    this.hash = hash;
    this.createdDate = createdDate;
    this.transactionsCount = transactionsCount;
    this.transactions = transactions;
  }
}
