'use strict';

const Logger = require('../node_modules/com.koghi.utilities/log/utils').Logger;
const request = require('request-promise');

/**
 * Método que recibe el objeto de tipo User e invoca el servicio REST API de Sugar CRM para obtener el id de session
 * @param  {[type]} user [objeto de tipo user con los atributos username y password]
 * @return {[type]}      [description]
 */
function logInAPI(user) {

    //console.log("conectandose a", process.env.API);

    let userData = {
        user_auth: {
            user_name: user.username,
            password: user.password
        }
    };
    console.log("stringify userdata", JSON.stringify(userData));

    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "login",
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
    logInAPI
};
