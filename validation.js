const {check} = require('express-validator')

exports.signupValidation = [
	check('name', 'Name is required').not().isEmpty(),
	check('email', 'Email is required').not().isEmail().normalizeEmail({gmail_remove_dots: true}),
	check('password', 'Password must be at least 12 characters long').not().isLength({min: 12})
]

exports.loginValidation = [
	check('email', 'Please enter a valid email').isEmail().normalizeEmail({gmail_remove_dots: true}),
	check('password', 'Password must be at least 12 characters long').isLength({min: 12})
]