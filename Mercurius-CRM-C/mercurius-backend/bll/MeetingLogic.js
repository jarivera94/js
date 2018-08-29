'use strict';
const Meeting = require('../cbo/Meeting');
const MeetingSugar = require('../dal/MeetingSugar');
const sourceUtils = require('../utils/sources');
const stageUtils = require('../utils/stage');
/**
 * Método que se encarga de llamar a la capa del DAL enviando el objeto de tipo usuario con el usuario y contraseña para
 * hacer la petición contra la url de sugar API
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
function createMeeting(meeting, sessionId, apiUserId) {
  return new Promise((resolve, reject) => {
      MeetingSugar.createMeeting(meeting,sessionId,apiUserId)
          .then((response) => {
              resolve(response);})
          .catch((err) => reject(err));
  });
}

function deleteMeeting(meeting, sessionId, apiUserId) {
  return new Promise((resolve, reject) => {
    MeetingSugar.deleteMeeting(meeting, sessionId, apiUserId)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => reject(err));
  });
}

function updateMeeting(meeting, sessionId, apiUserId) {
  return new Promise((resolve, reject) => {
    MeetingSugar.updateMeeting(meeting, sessionId, apiUserId)
      .then((response) => {
        resolve(response.id);
      })
      .catch((err) => reject(err));
  });
}

function getrelatedModule(rModule, id, sessionId) {
  return new Promise((resolve, reject) => {
    if (id === ""){
        let vmodule = {
            id: "",
            name: ""
        };
          resolve(vmodule);
  }else{
    MeetingSugar.readRelatedModule(rModule, id, sessionId)
      .then((response) => {
        let vmodule = {
          id: response.entry_list[0].name_value_list.id.value,
          name: response.entry_list[0].name_value_list.name.value
        };
        resolve(vmodule);
      }).catch((err) => reject(err));
    }
  });
}

function readMeeting(sessionId, apiUserId) {
  return new Promise((resolve, reject) => {
    MeetingSugar.readMeeting(sessionId, apiUserId)
      .then((response) => {
        let meetings = [];
        let listdata = response.entry_list;
        //var data = {};
        let link_list = [];
        let i;
        let promises = [];

        let meetingObjectPromise = function(resolve, reject) {
          var meeting = new Meeting();
          var data = listdata[i].name_value_list;
          meeting.id = data.id.value;
          meeting.name = data.name.value;
          meeting.date_start = data.date_start.value;
          meeting.duration_hours = data.duration_hours.value;
          meeting.duration_minutes = data.duration_minutes.value;
          meeting.date_end = data.date_end.value;
          meeting.description = data.description.value;
          meeting.status = data.status.value;
          meeting.parent_type = data.parent_type.value;
          meeting.parent_id = data.parent_id.value;
          meeting.reminder_time = data.reminder_time.value;
          meeting.assigned_user_id= data.assigned_user_id.value;
          meeting.location= data.location.value;

          getrelatedModule(meeting.parent_type, meeting.parent_id, sessionId).then((vmodule) => {
            meeting.module = vmodule;
            resolve(meeting);
          }).catch((err) => {
            reject(err);
          });

        }
        for (i = 0; i < listdata.length; i++) {
          promises.push(new Promise(meetingObjectPromise));
        }

        Promise.all(promises).then((meetings) => {
          resolve(meetings);
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => reject(err));
  });
}

module.exports = {
  createMeeting,
  readMeeting,
  deleteMeeting,
  updateMeeting
};
