'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const models = process.cwd() + '/models/' || __dirname;
console.log("models", models)

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(models)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file.slice(-3) === '.js' && file !== 'index.js'
    );
  })
  .forEach(file => {
    //const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    console.log("model2", file)
    const model = require(`../models/${file}`)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
console.log("db", db)
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
