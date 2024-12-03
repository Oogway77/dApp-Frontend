import Serializable from "./Serializable";

export default class Phone extends Serializable{
  uuid ='';
  imei = '';
  manufacturerName = '';
  modelName = '';
  createdDate = '';

  constructor(uuid, imei, manufacturerName, modelName, createdDate) {
    super();
    this.uuid = uuid;
    this.imei = imei;
    this.manufacturerName = manufacturerName;
    this.modelName = modelName;
    this.createdDate = createdDate;
  }
}
