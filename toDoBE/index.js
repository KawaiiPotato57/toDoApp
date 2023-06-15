const app = require('./app'); // The actual Express application
const server = require('./src/services/dbService');

app.listen( process.env.PORT || server.PORT, () => {
	console.log(`Server running on port ${server.PORT}`);
});
