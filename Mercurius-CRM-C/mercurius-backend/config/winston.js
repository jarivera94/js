'use strict';

const winston = require('winston');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'log';
const tsFormat = () => (new Date()).toLocaleTimeString();

/*Crea el directorio log si no existe*/
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

/* Se crean dos instancias de logger, una para consola con colores,fechas y un nivel de debug, otra para el archivo .log con
 * el nombre del archivo, fechas y dependiendo del entorno un nivel de debug o de info
**/
const logger = new(winston.Logger)({
  transports: [
    // colorize the output to the console
    new(winston.transports.Console)({
      colorize: true,
      timestamp: tsFormat,
      level: 'debug'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/mercurius.log`,
      timestamp: tsFormat,
      level: env === 'development' ? 'debug' : 'info'
    })
  ]
});

module.exports = logger;
