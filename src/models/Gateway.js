import Serializable from "./Serializable";

export default class Gateway extends Serializable{
  id = '';
  name = '';
  ip = '';
  latitude = '';
  longitude = '';
  status = "";
  createdDate = '';

  constructor(id, name, ip, latitude, longitude, status, createdDate) {
    super();
    this.id = id;
    this.name = name;
    this.ip = ip;
    this.latitude = latitude;
    this.longitude = longitude;
    this.status = status;
    this.createdDate = createdDate;
  }
}
