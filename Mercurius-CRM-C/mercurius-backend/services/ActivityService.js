'use strict';
const ActivityLogic = require('../bll/ActivityLogic');
const Activity = require('../cbo/Activity');

function createActivity(req, res) {
    var activity = new Activity(null, req.body.Activity.subject, req.body.Activity.startDate, req.body.Activity.endDate,
    req.body.Activity.priority, req.body.Activity.description, req.body.Activity.state, req.body.Activity.relatedWith, req.body.sugarUserId, req.body.Activity.relatedId);
    //account.contacts
    var sessionId = req.body.sugarId;
    return new Promise((resolve, reject) => {
        ActivityLogic.modifyActivity(activity,sessionId)
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

function modifyActivity(req, res) {
    var activity = new Activity(req.body.Activity.id, req.body.Activity.subject, req.body.Activity.startDate, req.body.Activity.endDate, req.body.Activity.priority, req.body.Activity.description, req.body.Activity.state, req.body.Activity.relatedWith, req.body.sugarUserId, req.body.Activity.relatedId);
    //account.contacts
    var sessionId = req.body.sugarId;
    return new Promise((resolve, reject) => {
        ActivityLogic.modifyActivity(activity,sessionId)
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

module.exports ={
    modifyActivity,
    createActivity
};
