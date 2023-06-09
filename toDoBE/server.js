require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const MONGODB_URI = process.env.DB_URL;
const {PORT} = process.env;

console.log('connecting to Server URL');

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch(error => {
		console.log('error connecting to MongoDB:', error.message);
	});

module.exports = {
	MONGODB_URI,
	PORT,
};
