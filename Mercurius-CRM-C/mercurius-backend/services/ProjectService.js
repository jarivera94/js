'use strict';
//CBO
const Project = require('../cbo/Project');

//BLL
const ProjectLogic = require('../bll/ProjectLogic');

/**
 * [createProject description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function createProject(req, res) {
    var project = new Project(0, req.body.project.name);
    //console.log("req.body", req.body);
    var sessionId = req.body.sugarId;
    var user_id = req.body.sugarUserId;
    return new Promise((resolve, reject) => {
        ProjectLogic.createProject(project, sessionId, user_id)
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

function readProject(req, res) {
    let sugarId = req.query.sugarId;
    let user_id = req.query.sugarUserId;
    return new Promise((resolve, reject) => {
        ProjectLogic.readProject(sugarId, user_id)
            .then((response) => {

                var project = new Project();
                let projects = [];
                let entry = {};

                for (var i = 0, len = response.entry_list.length; i < len; i++) {
                    entry = response.entry_list[i];
                    project = new Project(entry.id, entry.name_value_list.name.value);
                    projects.push(project);
                }
                resolve(
                    res.status(200).send({
                        message: projects
                    }));

            }).catch((err) => reject(
                res.status(400).send({
                    message: err
                })
            ));
    });
}

function deleteProject(req, res) {
    var project = new Project();
    project.id = req.query.projectId;
    var sessionId = req.query.sugarId;
    var user_id = req.body.sugarUserId;
    return new Promise((resolve, reject) => {
        ProjectLogic.deleteProject(project, sessionId, user_id)
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

function updateProject(req, res) {
    var project = new Project(req.body.project.id, req.body.project.name);
    //console.log("req.body", req.body);
    var sessionId = req.body.sugarId;
    var user_id = req.body.sugarUserId;
    return new Promise((resolve, reject) => {
        ProjectLogic.updateProject(project, sessionId, user_id)
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
    createProject,
    readProject,
    deleteProject,
    updateProject
};
