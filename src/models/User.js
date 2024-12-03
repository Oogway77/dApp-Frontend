import Serializable from "./Serializable";

export default class User extends Serializable{
  username = "";
  name = "";
  imageUrl = "";
  accessToken = "";
  id = '';
  email = "";
  operatorId = '';
  role = '';
  status = "";

  constructor(username, name, accessToken, id, email, operatorId, role, status) {
    super();
    this.username = username;
    this.name = name;
    this.imageUrl = 'https://cdn1.iconfinder.com/data/icons/evil-icons-user-interface/64/avatar-256.png';
    this.accessToken = accessToken;
    this.id = id;
    this.email = email;
    this.operatorId = operatorId;
    this.role = role;
    this.status = status;
  }
}
