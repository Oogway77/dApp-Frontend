import Serializable from "./Serializable";

export default class Order extends Serializable{
  id = '';
  name = '';
  type = "";
  quantity = "";
  status = "";
  createdDate = '';
  modifiedDate = '';
  dsimType = ''
  authMethod = ''

  constructor(id, name, type, quantity, status, createdDate, modifiedDate, dsimType, authMethod) {
    super();
    this.id = id;
    this.name = name;
    this.type = type;
    this.quantity = quantity;
    this.status = status;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
    this.dsimType = dsimType;
    this.authMethod = authMethod;
  }
}
