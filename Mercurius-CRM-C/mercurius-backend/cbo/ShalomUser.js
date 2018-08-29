'use strict';

class UserShalom {
  /**
   * [constructor de la clase user]
   * @param  {number}  id               [description]
   * @param  {String}  firstname        [description]
   * @param  {String}  lastname         [description]
   * @param  {String}  email            [description]
   * @param  {String}  username         [description]
   * @param  {String}  password         [description]
   * @param  {Date}    creationDate     [description]
   * @param  {Date}    modificationDate [description]
   * @param  {[Role]} roles            [listado de roles del usuario para el sistema especificado]
   */
  constructor(id, firstname, lastname, email, username, password, creationDate, modificationDate, roles) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.username = username;
    this.password = password;
    this.creationDate = creationDate;
    this.modificationDate = modificationDate;
    this.roles = roles;
  }
}

module.exports = UserShalom;
