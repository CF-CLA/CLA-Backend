'use strict';

const express = require('express');
const authRouter = express.Router();

const { users, news } = require('../models/index.js');
const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const permissions = require('../middleware/acl.js');

authRouter.post('/signup', async (req, res, next) => {
  try {
    console.log(req.body);
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  try {
    const user = {
      user: req.user,
      token: req.user.token
    };
    console.log(user);
    res.status(200).json(user);
  } catch (e) {
    next('Error on sign-in');
  }
});

// Creates news data
authRouter.post('/createnews', bearerAuth, permissions('create'), async (req, res, next) => {
  try {
    const userId = await users.get(req.user.username);
    req.body.Author = userId.dataValues.username;
    const newsRecord = await news.create(req.body);
    res.status(200).send(newsRecord);
  } catch (e) {
    next(e.message);
  }
});

// Gets news and returns data
authRouter.get('/news', bearerAuth, async (req, res, next) => {
  try {
    const newsLetterData = await news.get();
    res.status(200).send(newsLetterData);
  } catch (e) {
    next(e.message);
  }
});

// authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
//   try {
//     const userRecords = await users.get();
//     console.log(userRecords);
//     const list = userRecords.map(user => user.username);
//     res.status(200).json(list);
//   } catch {
//     next('Error on user list request');
//   }
// });

// authRouter.get('/secret', bearerAuth, async (req, res, next) => {
//   try {
//     res.status(200).send('Welcome to the secret area')
//   } catch {
//     next('Error on secret route');
//   }
// });

module.exports = authRouter;
