const mongoose = require('mongoose')

require('dotenv').config();

const dbName = process.env.MY_SQL_DB
const dbUsername = process.env.MY_SQL_USERNAME
const dbSecret = process.env.MY_SQL_SECRET
const dbHost = process.env.MY_SQL_HOST

const mongoUsername = process.env.MONGO_DB_USERNAME
const mongoSecret = process.env.MONGO_DB_SECRET

const config = {
	db: {
		host: dbHost,
		user: dbUsername,
		password: dbSecret,
		database: dbName
	},
	listPerPage: 10,
};

mongoose
	.connect(`mongodb+srv://${mongoUsername}:${mongoSecret}@portfolio-blog.s7zf4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
	.then(res => console.log("MongoDB connected on Port: ", res.connections[0].port))
	.catch(error => console.log("Error", error))


module.exports = config;