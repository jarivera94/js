'use strict';

const request = require('request-promise');


function createProject(project, sessionId, apiUserId) {

    //console.log("conectandose a", process.env.API);


    let userData = {
        session: sessionId,
        module_name: process.env.PROJECT_MODULE,
        name_value_list: {
            name: project.name,
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
    console.log("options create project",options);

    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => {
                console.log(response);
                resolve(JSON.parse(response))
            })
            .catch((err) => reject(err));
    });
}

function readProject(sessionId, apiUserId) {



    let userData = {
        session: sessionId,
        module_name: process.env.PROJECT_MODULE,
        query: "",
        order_by: process.env.PROJECT_MODULE + ".date_entered DESC",
        offset: 0,
        select_fields: [
            "name"
        ],
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
            })
            .catch((err) => reject(err));
    });
}

function deleteProject(project, sessionId, apiUserId) {
    let userData = {
        session: sessionId,
        module_name: process.env.PROJECT_MODULE,
        name_value_list: {
            id: project.id,
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

function updateProject(project, sessionId, apiUserId) {

    let userData = {
        session: sessionId,
        module_name: process.env.PROJECT_MODULE,
        name_value_list: {
            id: project.id,
            name: project.name,
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
    createProject,
    readProject,
    deleteProject,
    updateProject
};
