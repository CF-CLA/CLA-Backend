'use strict';

const newsModel = (sequelize, DataTypes) => {
  return sequelize.define('News', {
    Title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Author: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
}

module.exports = newsModel;
