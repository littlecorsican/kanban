'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Task, { as: 'task', foreignKey: 'status', sourceKey: 'id' });
    }
  }
  Status.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};