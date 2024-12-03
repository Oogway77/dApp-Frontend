import Serializable from "./Serializable";

export default class Plan extends Serializable{
  id = '';
  name = "";
  status = "";
  createdDate = '';

  constructor(id, name, status, createdDate) {
    super();
    this.id = id;
    this.name = name;
    this.status = status;
    this.createdDate = createdDate;
  }
}
