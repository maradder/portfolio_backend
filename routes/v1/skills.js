const express = require('express');
const router = express.Router();
const skills = require('../../services/skills')


// GET Projects
router.get('/', async (req, res, next) => {
	try {
		res.json(await skills.getAllSkills(req.query.page))
	} catch (err) {
		console.log("Error while getting skills", err.message)
		next(err)
	}
})

module.exports = router