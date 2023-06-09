const express = require('express');
const cors = require('cors');
const middleware = require('./utils/middleware');
const todosRouter =  require('./src/controllers/todos')
const app = express();

app.use(express.json());
app.use(cors());
app.use(
	cors({
		origin: 'http://localhost:3000',
	}),
);

app.use(
	cors({
		origin: ['http://localhost:3000', 'http://localhost:3001'],
	}),
);
app.use(middleware.morganLog);
app.use('/api/todos', todosRouter);

//should always be at the end
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;