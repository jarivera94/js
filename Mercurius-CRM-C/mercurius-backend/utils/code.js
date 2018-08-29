'use strict';

const SUCCESS = {
  code: '00',
  message: 'Petición exitosa'
};

const UNAUTHORIZED_ERROR = {
  code: '01',
  message: 'No autorizado'
};

const REQUEST_BODY_ERROR = {
  code: '02',
  message: 'Cuerpo de la petición no definido'
};

const SERVER_ERROR = {
  code: '03',
  message: 'Error del servidor'
};

module.exports = {
  SUCCESS,
  UNAUTHORIZED_ERROR,
  REQUEST_BODY_ERROR,
  SERVER_ERROR
};
