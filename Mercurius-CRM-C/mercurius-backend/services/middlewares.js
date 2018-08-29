'use strict';

const Axios = require('axios');
const logger = require('../config/winston');

/**
 * Método que captura los datos del usuario, la petición realizada y la guarda en un archivo de log con la libreria de winston
 * @param  {Request}   req  [description]
 * @param  {Response}   res  [description]
 * @param  {Function} next [description]
 */
let logRequest = (req, res, next) => {
  console.log("logRequest - body ", req.body);
  console.log("logRequest - user ", req.user);
  if(req.user){
    logger.info(`Username: ${req.user.username} Método: ${req.method} Petición: ${req.originalUrl}`);
  }else{
    logger.info(`Método: ${req.method} Petición: ${req.originalUrl}`);
  }
  next();
};

/**
 * Método que llama a modulo de autenticación para verificar si el token de autenticación es valido
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
let ensureAuthentication = (req, res, next) => {
  let config = {
    headers: {
      authorization: (req.headers.authorization ? req.headers.authorization : null)
    }
  };
  Axios.get(`${process.env.SHALOM_URL}/api/auth`, config)
    .then((response) => {
      req.user = response.data.user;
      next();
    })
    .catch((err) => {
      logger.error(JSON.stringify(err.response.data,null,2));
      res.status(401).send(err.response.data);
    });
};

module.exports = {
  logRequest,
  ensureAuthentication
};
