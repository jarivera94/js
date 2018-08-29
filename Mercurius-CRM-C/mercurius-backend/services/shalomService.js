'use strict';

const Axios = require('axios');
const User = require('../cbo/ShalomUser');
const logger = require('../config/winston');
const ErrorCode = require('../utils/code');
const System = require('../cbo/SystemShalom');
const UserLogic = require('../bll/UserLogic');
const md5 = require('md5');

/**
 * [Metodo que recibe un usuario y mediante las variables de entorno del sistema obtiene usuario y contraseña del sistema, luego se hace la petición a Shalom para autenticar usuario y sistema]
 * @param  {Request} req [description]
 * @param  {Response} res [description]
 */
let login = (req, res) => {
    console.log("login shalom");
    if (!req.body) {
        logger.error(ErrorCode.REQUEST_BODY_ERROR);
        return res.status(400).send(ErrorCode.REQUEST_BODY_ERROR);
    }
    let session = req.session;
    let user = new User(
        null,
        null,
        null,
        null,
        (req.body.username ? req.body.username : null),
        (req.body.password ? req.body.password : null),
        null,
        null,
        null
    );
    let system = new System(
        null,
        process.env.MERCURIUS_USERNAME,
        process.env.MERCURIUS_PASSWORD
    );
    Axios.post(process.env.SHALOM_URL + '/api/login', {
            system,
            user
        })
        .then((axioResponse) => {
            user.password = md5(user.password);
            console.log("password md5", user.password);
            UserLogic.loginAPI(user).then((response) => {
                    //Se asigna el id a la variable de session sessionId para poder realizar las consultas
                    //a los demás métodos del API de sugar

                    process.env.SUGARID = response.id;
                    process.env.SUGAR_USER_ID = response.name_value_list.user_id.value;
                    process.env.SUGAR_USER_NAME = response.name_value_list.user_name.value;
                    session.sugarId = response.id;
                    console.log("SESSION SUGARID",session.sugarId);
                    return res.status(200).send({
                        token: axioResponse.data.token,
                        user: axioResponse.data.user,
                        id : response.id,
                        api_user_id : response.name_value_list.user_id.value,
                        api_user_name : response.name_value_list.user_name.value
                    });
                })
                .catch((err) => {
                    console.log("sessionId err ", err);
                });


        })
        .catch((errorResponse) => {
            if (errorResponse.response) {
                logger.error(errorResponse.response.data);
                return res.status(400).send(errorResponse.response.data);
            } else if (errorResponse._body) {
                logger.error(errorResponse._body);
                return res.status(400).send(errorResponse._body);
            }
        });
};

module.exports = {
    login
};
