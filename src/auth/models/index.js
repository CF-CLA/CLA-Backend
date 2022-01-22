'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users/users.js');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);

// Creates an instance of the userModel associated with sequelize
const users = userModel(sequelize, DataTypes);

// Collection for models
const usersCollection = new Collection(users);

module.exports = {
  db: sequelize,
  users: usersCollection,
}
