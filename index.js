'use strict';

require('dotenv').config();
const { start } = require('./src/server.js');
const PORT = process.env.PORT || 3001;

start(PORT);
