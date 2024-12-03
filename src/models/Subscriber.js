import Serializable from "./Serializable";

export default class Subscriber extends Serializable{
  id = '';
  subscriberLogo = "";
  status = "";
  createdDate = '';

  constructor(id, name, subscriberLogo, status, createdDate) {
    super();
    this.id = id;
    this.name = name;
    this.status = status;
    this.subscriberLogo = subscriberLogo;
    this.createdDate = createdDate;
  }
}
