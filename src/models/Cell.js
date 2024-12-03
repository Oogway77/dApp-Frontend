import Serializable from "./Serializable";

export default class Cell extends Serializable{
  uuid = '';
  plmn = '';
  lac = '';
  cellid = '';
  radioType = '';
  band = '';
  latitude = '';
  longitude = '';
  status = "";
  createdDate = '';

  constructor(uuid, plmn, lac, cellid, radioType, band, latitude, longitude, status, createdDate) {
    super();
    this.uuid = uuid;
    this.plmn = plmn;
    this.lac = lac;
    this.cellid = cellid;
    this.radioType = radioType;
    this.band = band;
    this.latitude = latitude;
    this.longitude = longitude;
    this.status = status;
    this.createdDate = createdDate;
  }
}
