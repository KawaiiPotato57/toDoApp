const logger = require('morgan');

// MORGAN LOGGER METHODS
const requestTemp = {};
const morganLog = logger('dev', {requestTemp});

// ROUTE ERROR HANDLER
const unknownEndpoint = (request, response) => {
	response.status(404).send({error: 'unknown endpoint'});
};

// REQUEST ERROR HANDLER
const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({error: 'malformatted id'});
	}

	next(error);
};

module.exports = {
	morganLog,
	unknownEndpoint,
	errorHandler,
};
