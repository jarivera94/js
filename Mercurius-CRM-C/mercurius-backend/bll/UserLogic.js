'use strict';

const config = require('../config/utils');
const pool = require('com.koghi.utilities/dal/utils');
const Logger = require('../node_modules/com.koghi.utilities/log/utils').Logger;
const UserSugar = require('../dal/UserSugar');

/**
 * Método que se encarga de llamar a la capa del DAL enviando el objeto de tipo usuario con el usuario y contraseña para
 * hacer la petición contra la url de sugar API
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
function loginAPI(user) {
    //console.log("user userlogic",user);
    return new Promise((resolve, reject) => {
        UserSugar.logInAPI(user)
            .then((response) => {
                //console.log("response userlogic",response);
                resolve(response);})
            .catch((err) => reject(err));
    });
}

module.exports = {
    loginAPI
};
