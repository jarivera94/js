'use strict';

const request = require('request-promise');
const moment =  require("moment");


function createCall(call, sessionId, apiUserId) {
  //console.log("LLego a oportunidad Sugar");
    let userData = {
        session: sessionId,
        module_name: "Calls",
        name_value_list: {
            name: call.name,
            date_start: moment(call.date_start).format("YYYY-MM-DD HH:mm:ss"),
            duration_hours: call.duration_hours,
            duration_minutes: call.duration_minutes,
            date_end: moment(call.date_end).format("YYYY-MM-DD HH:mm:ss"),
            description: call.description,
            status: call.status,
            parent_type: call.parent_type,
            parent_id: call.parent_id,
            reminder_time: call.reminder_time,
            assigned_user_id: call.assigned_user_id
        }
    };

    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "set_entry",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(userData)
        }
    };
    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => resolve(JSON.parse(response)))
            .catch((err) => reject(err));
    });
}

function readCall(sessionId, apiUserId) {

    let userData = {
        session: sessionId,
        module_name: "Calls",
        query: "",
        order_by: "calls.date_entered DESC",
        offset: 0,
        select_fields: [
            "id",
            "name",
            "date_start",
            "duration_hours",
            "duration_minutes",
            "date_end",
            "description",
            "status",
            "parent_type",
            "parent_id",
            "reminder_time",
            "assigned_user_id"
        ],link_name_to_fields_array : [[]],
      max_results: process.env.MAX_RESULTS,
      delete:0
    };
    //console.log(JSON.stringify(userData));
    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "get_entry_list",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(userData)
        }
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => {
                resolve(JSON.parse(response));
                //console.log(JSON.parse(response));
            })
            .catch((err) => reject(err));
    });

}

function readRelatedModule(moduleTo, id, sessionId) {

    let userData = {
        session: sessionId,
        module_name: moduleTo,
        id: id,
        select_fields: [
            "id",
            "name"
        ],link_name_to_fields_array : [[]],
      max_results: process.env.MAX_RESULTS,
      delete:0
    };
    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "get_entry",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(userData)
        }
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => {
                resolve(JSON.parse(response));
            })
            .catch((err) => reject(err));
    });

}

function deleteCall(call, sessionId, apiUserId) {
    let userData = {
        session: sessionId,
        module_name: "Calls",
        name_value_list: {
            id: call.id,
            deleted: 1
        }
    };

    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "set_entry",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(userData)
        }
    };
    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => resolve(JSON.parse(response)))
            .catch((err) => reject(err));
    });
}

function updateCall(call, sessionId, apiUserId) {
    let userData = {
        session: sessionId,
        module_name: "Calls",
        name_value_list: {
          id: call.id,
          name: call.name,
          date_start: moment(call.date_start).format("YYYY-MM-DD HH:mm:ss"),
          duration_hours: call.duration_hours,
          duration_minutes: call.duration_minutes,
          date_end: moment(call.date_end).format("YYYY-MM-DD HH:mm:ss"),
          description: call.description,
          status: call.status,
          parent_type: call.parent_type,
          parent_id: call.parent_id,
          reminder_time: call.reminder_time,
          assigned_user_id: apiUserId
        }
    };

    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "set_entry",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(userData)
        }
    };
    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => resolve(JSON.parse(response)))
            .catch((err) => reject(err));
    });
}

module.exports = {
    createCall,
    readCall,
    deleteCall,
    updateCall,
    readRelatedModule
};
