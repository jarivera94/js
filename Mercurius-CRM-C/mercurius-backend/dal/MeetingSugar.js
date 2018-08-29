'use strict';

const request = require('request-promise');
const moment =  require("moment");


function createMeeting(meeting, sessionId, apiUserId) {
  //console.log("LLego a oportunidad Sugar");
    let userData = {
        session: sessionId,
        module_name: "Meetings",
        name_value_list: {
            name: meeting.name,
            date_start: moment(meeting.date_start).format("YYYY-MM-DD HH:mm:ss"),
            duration_hours: meeting.duration_hours,
            duration_minutes: meeting.duration_minutes,
            date_end: moment(meeting.date_end).format("YYYY-MM-DD HH:mm:ss"),
            description: meeting.description,
            status: meeting.status,
            parent_type: meeting.parent_type,
            parent_id: meeting.parent_id,
            reminder_time: meeting.reminder_time,
            location: meeting.location,
            assigned_user_id: meeting.assigned_user_id
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

function readMeeting(sessionId, apiUserId) {

    let userData = {
        session: sessionId,
        module_name: "Meetings",
        query: "",
        order_by: "meetings.date_entered DESC",
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
            "location",
            "assigned_user_id"
        ],link_name_to_fields_array : [[]],
      max_results: process.env.MAX_RESULTS,
      delete:0
    };
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


function deleteMeeting(meeting, sessionId, apiUserId) {
    let userData = {
        session: sessionId,
        module_name: "Meetings",
        name_value_list: {
            id: meeting.id,
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

function updateMeeting(meeting, sessionId, apiUserId) {
    let userData = {
        session: sessionId,
        module_name: "Meetings",
        name_value_list: {
          id: meeting.id,
          name: meeting.name,
          date_start: moment(meeting.date_start).format("YYYY-MM-DD HH:mm:ss"),
          duration_hours: meeting.duration_hours,
          duration_minutes: meeting.duration_minutes,
          date_end: moment(meeting.date_end).format("YYYY-MM-DD HH:mm:ss"),
          description: meeting.description,
          status: meeting.status,
          parent_type: meeting.parent_type,
          parent_id: meeting.parent_id,
          reminder_time: meeting.reminder_time,
          location: meeting.location,
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
    createMeeting,
    readMeeting,
    deleteMeeting,
    updateMeeting,
    readRelatedModule
};
