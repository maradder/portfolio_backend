const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config()
// const indexRouter = require('./routes/router.js')

const PORT = process.env.PORT || 9000

app.use(cors())

app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({
	extended: true,
}))

app.get('/', function (req, res) {
	res.json({mesage: "Ok"})
})

app.use("/auth", require('./routes/v1/auth'))
app.use("/projects", require('./routes/v1/projects'))
app.use("/skills", require('./routes/v1/skills'))
app.use("/contact", require('./routes/v1/email'))

// Error handling
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.error(err.message, err.stack);
	res.status(statusCode).json({mesage: err.message});
	return;
})


app.listen(PORT, () => console.log(`The server is running on port: ${PORT}`))