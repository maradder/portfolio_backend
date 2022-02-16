const express = require('express');
const router = express.Router();
const db = require('../../services/db')
const { signupValidation, loginValidation } = require('../../validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET = process.env.SECRET

router.post('/register', signupValidation, async (req, res, next) => {
	try {
		const users = await db.query(`SELECT * FROM users WHERE LOWER(email) = LOWER("${req.body.email}")`)
		if (users.length > 0) {
			res.status(400).send({ msg: "User already registered" })
		} else {
			bcrypt.hash(req.body.password, 10, async (err, hash) => {
				if (err) {
					res.status(500).send({ msg: err })
				} else {
					// PW has been hashed and is ready to add to db
					const newUser = await db.query(`INSERT INTO users (first_name, last_name, email, password) VALUES ("${req.body.first_name}", "${req.body.last_name}", "${req.body.email}", "${hash}")`)
					if (err) {
						return res.status(400).send({ msg: err });
					} else {
						return res.status(201).send({ msg: "The user has been successfully created." });
					}
				}
			})
		}
	} catch (err) {
		console.log(err)
	}
})


router.post('/login', loginValidation, async (req, res, next) => {
	try {
		const password = req.body.password
		const result = await db.query(`SELECT * FROM users WHERE email="${req.body.email}"`)
			// User doesn't exist
			if (!result.length) {
				return res.status(401).send({ msg: 'Email or password is incorrect.' });
			}
			// Check password
			const hash = result[0].password
			console.log(hash)
			const matchPassword = await bcrypt.compare(req.body.password, result[0].password, (bErr, bResult) => {
				if (bErr) {
					res.status(500).send({ msg: bErr.message });
				}
				else if (!result)
				res.status(400).send({ msg: 'Email or password is incorrect.' });
					else if (bResult) {
					const token = jwt.sign({ id: result[0].id }, SECRET, { expiresIn: '1hr' })
					db.query(`UPDATE users SET last_login = now() WHERE id="${result[0].id}"`)
					return res.status(200).send({ msg: "Logged in", token, user: result[0] });
				}
				return res.status(404).send({ msg: 'Username or password is incorrect' })
			})
		} catch (err) {
			console.log(err)
		}
	})

router.post('/get_user', signupValidation, (req, res, next) => {
	if (
		!req.headers.authorization ||
		!req.headers.authorization.startsWith('Bearer') ||
		!req.headers.authorization.split(' ')[1]
	) {
		return res.status(422).json({
			message: "Please provide the token",
		});
	}
	const theToken = req.headers.authorization.split(' ')[1];
	const decoded = jwt.verify(theToken, SECRET);
	db.query('SELECT * FROM users where id=?', decoded.id, function (error, results, fields) {
		if (error) throw error;
		return res.send({ error: false, data: results[0], message: 'Fetched Successfully.' });
	});
});
module.exports = router;
