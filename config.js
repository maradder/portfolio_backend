require('dotenv').config();

const dbName = process.env.MY_SQL_DB
const dbUsername = process.env.MY_SQL_USERNAME
const dbSecret = process.env.MY_SQL_SECRET
const dbHost = process.env.MY_SQL_HOST


const config = {
	db: {
		host: dbHost,
		user: dbUsername,
		password: dbSecret,
		database: dbName
	},
	listPerPage: 10,
};

module.exports = config;