'use strict';

class Project {
  /**
   * [constructor de la clase system]
   * @param  {String}  idProject        [description]
   * @param  {String}  name             [description]
   * @param  {String}  username         [description]
   * @param  {String}  password         [description]
   */
  constructor(idProject,name) {
    this.id = idProject;
    this.name = name;
  }
}

module.exports = Project;
