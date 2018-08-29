'use strict';
const moment =  require("moment");

class Activity{

  /**
   * Datos de la actividad
   * @param  {Subject_list} subject     [description]
   * @param  {date} startDate   [description]
   * @param  {date} endDate     [description]
   * @param  {String} priority    [description]
   * @param  {String} description [description]
   * @param  {Task_type_dom} state       [description]
   * @param  {parent_type_display} relatedWith [description]
   * @param  {Number} assignedTo  [description]
   * @return {[type]}             [description]
   */
  constructor(id, subject,startDate, endDate, priority, description, state, relatedWith, assignedTo, relatedId){
    this.id = id;
    this.subject = subject;
    this.startDate = moment(startDate).format("YYYY-MM-DD");
    this.endDate = moment(endDate).format("YYYY-MM-DD");
    this.priority = priority;
    this.description = description;
    this.state = state;
    this.relatedWith = relatedWith;
    this.assignedTo = assignedTo;
    this.relatedId = relatedId;
  }

}

module.exports = Activity;
