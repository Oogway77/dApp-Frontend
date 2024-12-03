import Serializable from "./Serializable";

export default class Camera extends Serializable{
  uuid ='';
  label = '';
  description = '';
  imei = '';
  manufacturerName = '';
  modelName = '';
  url = '';
  key = '';
  channel = '';
  status = "";
  createdDate = '';

  constructor(uuid, label, description, imei, manufacturerName, modelName, url, key, channel, status, createdDate) {
    super();
    this.uuid = uuid;
    this.label = label;
    this.description = description;
    this.imei = imei;
    this.manufacturerName = manufacturerName;
    this.modelName = modelName;
    this.url = url;
    this.key = key;
    this.channel = channel;
    this.status = status;
    this.createdDate = createdDate;
  }
}
