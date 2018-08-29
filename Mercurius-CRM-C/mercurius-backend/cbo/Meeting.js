'use strict';
const moment =  require("moment");

class Meeting {
  /**
   * [constructor de la clase system]
   * @param  {String}  id                  [description]
   * @param  {String}  name                [description]
   * @param  {Date}    date_start          [description]
   * @param  {Date}    date_end            [description]
   * @param  {String}  duration_hours      [description]
   * @param  {String}  description         [description]
   * @param  {String}  status              [description]
   * @param  {String}  parent_type         [description]
   * @param  {String}  parent_id           [description]
   * @param  {String}  reminder_time       [description]
   * @param  {String}  location            [description]
   */
   constructor(name,date_start,duration_hours, duration_minutes, date_end, description, status, parent_type, parent_id, reminder_time, location) {
     this.name = name;
     this.date_start = moment(date_start).format("YYYY-MM-DD HH:mm:ss");
     this.duration_hours = duration_hours;
     this.duration_minutes = duration_minutes;
     this.date_end = moment(date_end).format("YYYY-MM-DD HH:mm:ss");
     this.description = description;
     this.status = status;
     this.parent_type = parent_type;
     this.parent_id = parent_id;
     this.reminder_time = reminder_time;//-1 es deshabilitado
     this.location = location;
   }
}

module.exports = Meeting;
