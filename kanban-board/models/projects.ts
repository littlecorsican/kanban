'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Projects.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    assigned_to: DataTypes.INTEGER,
    date_created: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Projects',
  });
  return Projects;
};