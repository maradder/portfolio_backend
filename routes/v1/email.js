const express = require('express');
const router = express.Router();
const sendMail = require('../../services/sendMail')
require('dotenv').config()

// Send a message from the comment form to
router.post('/', (req, res, next) => {
	try {
		console.log(req.body)
		const msg = {
			"from":{
				"email": process.env.PORTFOLIO_EMAIL_ADDRESS
			 },
			"personalizations":[
				{
				"to":[
					{
						"email": process.env.MARCUS_EMAIL_ADDRESS
					}
				],
			"dynamic_template_data": {
				"message_fromName": `${req.body.msg.fromName}`,
				"message_fromEmail": `${req.body.msg.fromEmail}`,
				"message_content": `${req.body.msg.content}`,
			},
			}],
			"template_id":"d-dd42f3aae6a4467a8013584555b53328"
		}
		sendMail(msg)
	} catch (err) {
		console.log("Error while sending a message", err.message)
		next(err)
	}
})

module.exports = router