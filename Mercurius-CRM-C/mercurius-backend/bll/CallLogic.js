'use strict';
const Call = require('../cbo/Call');
const CallSugar = require('../dal/CallSugar');
const sourceUtils = require('../utils/sources');
const stageUtils = require('../utils/stage');
/**
 * Método que se encarga de llamar a la capa del DAL enviando el objeto de tipo usuario con el usuario y contraseña para
 * hacer la petición contra la url de sugar API
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
function createCall(call, sessionId, apiUserId) {
  return new Promise((resolve, reject) => {
      CallSugar.createCall(call,sessionId,apiUserId)
          .then((response) => {
              resolve(response);})
          .catch((err) => reject(err));
  });
}

function deleteCall(call, sessionId, apiUserId) {
  return new Promise((resolve, reject) => {
    CallSugar.deleteCall(call, sessionId, apiUserId)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => reject(err));
  });
}

function updateCall(call, sessionId, apiUserId) {
  return new Promise((resolve, reject) => {
    CallSugar.updateCall(call, sessionId, apiUserId)
      .then((response) => {
        resolve(response.id);
      })
      .catch((err) => reject(err));
  });
}

function getrelatedModule(rModule, id, sessionId) {
  //console.log("idCampaign",idCampaign);
  return new Promise((resolve, reject) => {
    if (id === ""){
        let vmodule = {
            id: "",
            name: ""
        };
          resolve(vmodule);
  }else{
    CallSugar.readRelatedModule(rModule, id, sessionId)
      .then((response) => {
        let vmodule = {
          id: response.entry_list[0].name_value_list.id.value,
          name: response.entry_list[0].name_value_list.name.value
        };
        ////console.log(project);
        resolve(vmodule);
      }).catch((err) => reject(err));
    }
  });
}

function readCall(sessionId, apiUserId) {
  return new Promise((resolve, reject) => {
    CallSugar.readCall(sessionId, apiUserId)
      .then((response) => {
        let calls = [];
        let listdata = response.entry_list;
        //var data = {};
        let link_list = [];
        let i;
        let promises = [];
        let callObjectPromise = function(resolve, reject) {
          var call = new Call();
          var data = listdata[i].name_value_list;
          call.id = data.id.value;
          call.name = data.name.value;
          call.date_start = data.date_start.value;
          call.duration_hours = data.duration_hours.value;
          call.duration_minutes = data.duration_minutes.value;
          call.date_end = data.date_end.value;
          call.description = data.description.value;
          call.status = data.status.value;
          call.parent_type = data.parent_type.value;
          call.parent_id = data.parent_id.value;
          call.reminder_time = data.reminder_time.value;
          call.assigned_user_id= data.assigned_user_id.value;
          getrelatedModule(call.parent_type, call.parent_id, sessionId).then((vmodule) => {
            call.module = vmodule;
            resolve(call);
          }).catch((err) => {
            reject(err);
          });

        }
        for (i = 0; i < listdata.length; i++) {
          promises.push(new Promise(callObjectPromise));
        }

        Promise.all(promises).then((calls) => {
          resolve(calls);
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => reject(err));
  });
}

module.exports = {
  createCall,
  readCall,
  deleteCall,
  updateCall
};
