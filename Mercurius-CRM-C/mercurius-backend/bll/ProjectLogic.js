'use strict';

const ProjectSugar = require('../dal/ProjectSugar');

/**
 * Método que se encarga de llamar a la capa del DAL enviando el objeto de tipo usuario con el usuario y contraseña para
 * hacer la petición contra la url de sugar API
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
function createProject(project,sessionId,apiUserId) {
    return new Promise((resolve, reject) => {
        ProjectSugar.createProject(project,sessionId,apiUserId)
            .then((response) => {
                resolve(response);})
            .catch((err) => reject(err));
    });
}

function readProject(sessionId,apiUserId) {
    
    return new Promise((resolve, reject) => {
        ProjectSugar.readProject(sessionId,apiUserId)
            .then((response) => {
                resolve(response);})
            .catch((err) => reject(err));
    });
}

function deleteProject(project,sessionId,apiUserId) {
    return new Promise((resolve, reject) => {
        ProjectSugar.deleteProject(project,sessionId,apiUserId)
            .then((response) => {
                resolve(response);})
            .catch((err) => reject(err));
    });
}

function updateProject(project,sessionId,apiUserId) {
    return new Promise((resolve, reject) => {
        ProjectSugar.updateProject(project,sessionId,apiUserId)
            .then((response) => {
                resolve(response);})
            .catch((err) => reject(err));
    });
}

module.exports = {
    createProject,
    readProject,
    deleteProject,
    updateProject
};
