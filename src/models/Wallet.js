import Serializable from "./Serializable";

export default class Wallet extends Serializable{
  id = '';
  name = "";

  constructor(id, name) {
    super();
    this.id = id;
    this.name = name;
  }
}
