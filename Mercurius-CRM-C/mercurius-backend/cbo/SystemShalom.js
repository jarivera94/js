'use strict';

class System {
  /**
   * [constructor de la clase system]
   * @param  {String}  name             [description]
   * @param  {String}  username         [description]
   * @param  {String}  password         [description]
   */
  constructor(name, username, password) {
    this.name = name;
    this.username = username;
    this.password = password;
  }
}

module.exports = System;
