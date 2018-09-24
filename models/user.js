'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
	fullname: { type: String, default: '' },
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	favorites: {
		type: Array
	}
});

UserSchema.set('toObject', {
	transform: function(doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	}
});

UserSchema.methods.serialize = function() {
	return {
		username: this.username || '',
	}
}

UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('User', UserSchema);