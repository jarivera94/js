'use strict';

const request = require('request-promise');

function modifyActivity(activity, sessionId) {
    let name_value_list_data = {
        subject_c : activity.subject,
        date_start : activity.startDate,
        due_date : activity.due_date,
        priority : activity.priority,
        description : activity.description,
        status : activity.state,
        parent_type : activity.relatedWith,
        parent_id: activity.relatedId,
        assigned_user_id : activity.assignedTo
    };
    if (activity.id != 0 || activity.id != undefined)
        name_value_list_data.id = activity.id;
    let activityData = {
        session: sessionId,
        module_name: "Tasks",
        name_value_list: name_value_list_data
    };
    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "set_entry",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(activityData)
        }
    };
    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => resolve(JSON.parse(response)))
            .catch((err) => reject(err));
    });
}


module.exports = {
    modifyActivity
};
