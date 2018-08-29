'use strict';
//CBO
const User = require('../cbo/User');

//BLL
const UserLogic = require('../bll/UserLogic');

const Logger = require('../node_modules/com.koghi.utilities/log/utils').Logger;

/**
 * Método que recibe el usuario y password para realizar la autenticación en el API de SugarCRM
 * y devuelve
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function logInApiSugar(req, res) {
    let user = new User(req.body.username,req.body.password);
    let session = req.session;
    //console.log("user created", user);

    return new Promise((resolve, reject) => {
        UserLogic.loginAPI(user)
            .then((response) => {
                //Se asigna el id a la variable de session sessionId para poder realizar las consultas
                //a los demás métodos del API de sugar
                session.sessionId = response.id;
                resolve(
                    res.status(200).send({
                        message: response
                    })
                );
            })
            .catch((err) => reject(
                res.status(400).send({
                    message: err
                })
            ));
    });
}
/**
 * Método de prueba para leer el parámetro de sessionId
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function getSessionId(req,res){
    let session = req.session;
    console.log("session.sessionId",session.sessionId);
}

module.exports = {
    logInApiSugar,
    getSessionId
};
