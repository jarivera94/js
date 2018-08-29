'use strict';
//Instancia a los metodos que se invocan a sugar.
const activitySugar = require('../dal/ActivitySugar');

function modifyActivity(activity, sessionId) {
    return new Promise((resolve, reject) => {
        activitySugar.modifyActivity(activity,sessionId)
        .then((response) => {
            resolve(response);
        })
        .catch((err) => reject(err));
    });
}

module.exports = {
  modifyActivity
};
