'use strict';
//CBO
const Meeting = require('../cbo/Meeting');

//BLL
const statesUtils = require('../utils/states');
const typeUtils = require('../utils/types');
const MeetingLogic = require('../bll/MeetingLogic');
const sourceUtils = require('../utils/sources');
const stageUtils = require('../utils/stage');

/**
 * [createLead description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function createMeeting(req, res) {

    var meeting = new Meeting();
    meeting.name = req.body.meeting.name;
    meeting.date_start = req.body.meeting.date_start;
    meeting.duration_hours = req.body.meeting.duration_hours;
    meeting.duration_minutes = req.body.meeting.duration_minutes;
    meeting.date_end = req.body.meeting.date_end;
    meeting.description = req.body.meeting.description;
    meeting.status = req.body.meeting.status;
    meeting.parent_type = req.body.meeting.parent_type;
    meeting.parent_id = req.body.meeting.parent_id;
    meeting.reminder_time = req.body.meeting.reminder_time
    meeting.assigned_user_id = req.body.meeting.assigned_user_id;
    meeting.location = req.body.meeting.location;
    var sessionId = req.body.sugarId;
    var user_id = req.body.sugarUserId;
    return new Promise((resolve, reject) => {
        MeetingLogic.createMeeting(meeting, sessionId, user_id)
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

function readMeeting(req, res) {
  let sessionId = req.query.sugarId;
   return new Promise((resolve, reject) => {
       MeetingLogic.readMeeting(sessionId)
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

function deleteMeeting(req, res) {
    var meeting = new Meeting();
    meeting.id = req.query.meetingId;
    var sessionId = req.query.sugarId;

    var user_id = req.body.sugarUserId;
    return new Promise((resolve, reject) => {
        MeetingLogic.deleteMeeting(meeting, sessionId,user_id)
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

function updateMeeting(req, res) {

    var session = req.body.sugarId;
    var meeting = new Meeting();
    meeting.id = req.body.meeting.id;
    meeting.name = req.body.meeting.name;
    meeting.date_start = req.body.meeting.date_start;
    meeting.duration_hours = req.body.meeting.duration_hours;
    meeting.duration_minutes = req.body.meeting.duration_minutes;
    meeting.date_end = req.body.meeting.date_end;
    meeting.description = req.body.meeting.description;
    meeting.status = req.body.meeting.status;
    meeting.parent_type = req.body.meeting.parent_type;
    meeting.parent_id = req.body.meeting.parent_id;
    meeting.reminder_time = req.body.meeting.reminder_time
    meeting.assigned_user_id = req.body.meeting.assigned_user_id;
    var sessionId = req.body.sugarId;
    var user_id = req.body.sugarUserId;
    return new Promise((resolve, reject) => {
        MeetingLogic.updateMeeting(meeting, sessionId, user_id)
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
  createMeeting,
  readMeeting,
  deleteMeeting,
  updateMeeting
};
