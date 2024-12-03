
export default class dSIM {
  id = '';
  servingPlmnId = '';
  authMethod = '';
  createdDate = '';
  modifiedDate = '';
  iccid = '';
  imsi = '';
  dsimType = '';

  constructor(id, servingPlmnId, iccid, imsi, dsimType, authMethod, createdDate, modifiedDate) {
    this.id = id;
    this.iccid = iccid;
    this.imsi = imsi;
    this.dsimType = dsimType;
    this.servingPlmnId = servingPlmnId;
    this.authMethod = authMethod;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
  }
}
