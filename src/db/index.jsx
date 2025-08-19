const config = require('../config/config');

let db;
switch (config.DB_TYPE) {
  case 'firebase':
    db = require('./firebase');
    break;
  case 'mysql':
    db = require('./mysql');
    break;
  default:
    throw new Error('Base de datos no soportada');
}

module.exports = db;