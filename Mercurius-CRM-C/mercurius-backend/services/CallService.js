'use strict';
//CBO
const Call = require('../cbo/Call');

//BLL
const statesUtils = require('../utils/states');
const typeUtils = require('../utils/types');
const CallLogic = require('../bll/CallLogic');
const sourceUtils = require('../utils/sources');
const stageUtils = require('../utils/stage');

/**
 * [createLead description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function createCall(req, res) {

    var call = new Call();
    call.name = req.body.call.name;
    call.date_start = req.body.call.date_start;
    call.duration_hours = req.body.call.duration_hours;
    call.duration_minutes = req.body.call.duration_minutes;
    call.date_end = req.body.call.date_end;
    call.description = req.body.call.description;
    call.status = req.body.call.status;
    call.parent_type = req.body.call.parent_type;
    call.parent_id = req.body.call.parent_id;
    call.reminder_time = req.body.call.reminder_time
    call.assigned_user_id = req.body.call.assigned_user_id;
    var sessionId = req.body.sugarId;
    var user_id = req.body.sugarUserId;
    return new Promise((resolve, reject) => {
        CallLogic.createCall(call, sessionId, user_id)
            .then((response) => resolve(
                res.status(200).send({
                    message: response
                })
            )).catch((err) => reject(
                res.status(400).send({
                    message: err
                })
            ));
    });
}

function readCall(req, res) {
  let sessionId = req.query.sugarId;
  //let sessionId = "pitnj8usnmmfg6j39ue81k2i85";
   return new Promise((resolve, reject) => {
       CallLogic.readCall(sessionId)
           .then((response) => {
               resolve(
               res.status(200).send({
                   message: response
               }));
           }
         ).catch((err) => reject(
               res.status(400).send({
                   message: err
               })
           ));

   });
}

function deleteCall(req, res) {
    var call = new Call();
    call.id = req.query.callId;
    var sessionId = req.query.sugarId;

    var user_id = req.body.sugarUserId;
    return new Promise((resolve, reject) => {
        CallLogic.deleteCall(call, sessionId,user_id)
            .then((response) => resolve(
                res.status(200).send({
                    message: response
                })
            )).catch((err) => reject(
                res.status(400).send({
                    message: err
                })
            ));
    });
}

function updateCall(req, res) {

    var session = req.body.sugarId;
    var call = new Call();
    call.id = req.body.call.id;
    call.name = req.body.call.name;
    call.date_start = req.body.call.date_start;
    call.duration_hours = req.body.call.duration_hours;
    call.duration_minutes = req.body.call.duration_minutes;
    call.date_end = req.body.call.date_end;
    call.description = req.body.call.description;
    call.status = req.body.call.status;
    call.parent_type = req.body.call.parent_type;
    call.parent_id = req.body.call.parent_id;
    call.reminder_time = req.body.call.reminder_time
    call.assigned_user_id = req.body.call.assigned_user_id;
    var sessionId = req.body.sugarId;
    var user_id = req.body.sugarUserId;
    return new Promise((resolve, reject) => {
        CallLogic.updateCall(call, sessionId, user_id)
            .then((response) => resolve(
                res.status(200).send({
                    message: response
                })
            )).catch((err) => reject(
                res.status(400).send({
                    message: err
                })
            ));
    });
}

module.exports = {
  createCall,
  readCall,
  deleteCall,
  updateCall
};
