'use strict';

const mongoose = require('mongoose');

const { DATABASE_URL } = require('../config');
const Style = require('../models/style');
const User = require('../models/user');

const seedStyles = require('../db/seed/styles');
const seedUsers = require('../db/seed/users');

console.log(DATABASE_URL);

mongoose.connect(DATABASE_URL)
	.then(() => mongoose.connection.db.dropDatabase())
	.then(() => {
		return Promise.all([
			Style.insertMany(seedStyles),
			User.insertMany(seedUsers),
			User.createIndexes(),
		]);
	})
	.then(() => mongoose.disconnect())
	.catch(err => {
		console.error(`ERROR: ${err.message}`);
		console.error(err);
	});