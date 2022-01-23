'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users/users.js');
const newsModel = require('./users/news.js');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);

// Creates an instance of the userModel associated with sequelize
const users = userModel(sequelize, DataTypes);
const news = newsModel(sequelize, DataTypes);

// Creates references before collection is created
users.hasMany(news, { foreignKey: 'UserId', sourceKey: 'id' });
news.belongsTo(users, { foreignKey: 'UserId', targetKey: 'id' });

// Collection for models
const usersCollection = new Collection(users);
const newsCollection = new Collection(news);

module.exports = {
  db: sequelize,
  users: usersCollection,
  news: newsCollection,
}
