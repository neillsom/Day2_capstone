'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

// test getuserdashboard import for jwtauth
const jwtAuth = passport.authenticate('jwt', { session: false });

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect, dbGet } = require('./db-mongoose');

const { localStrategy, jwtStrategy } = require('./auth/strategies');

const stylesRouter = require('./routes/styles');
const usersRouter = require('./routes/users');
const authRouter = require('./auth/router');

// Utilize the given `strategy`
passport.use(localStrategy);
passport.use(jwtStrategy);

// Create an Express application
const app = express();


app.use(
	morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
		skip: (req, res) => process.env.NODE_ENV === 'test'
	})
);

app.use(cors({
	origin: CLIENT_ORIGIN
}));

app.use('/styles', stylesRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);


// test protected endpoint
app.get('/dashboard', jwtAuth, (req, res) => {
	return res.json({
		data: 'User dashboard'
	});
});

app.get('/', (req, res) => {
	res.json('Nothing to see here. Maybe try http://localhost:8080/styles');
});

function runServer(port = PORT) {
	const server = app
		.listen(port, () => {
			console.info(`App listening on port ${server.address().port}`);
		})
		.on('error', err => {
			console.error('Express failed to start');
			console.error(err);
		});
}

if (require.main === module) {
	dbConnect();
	runServer();
}

console.log(`DB URI: ${dbGet().connection.host}:${dbGet().connection.port}`);

module.exports = { app };