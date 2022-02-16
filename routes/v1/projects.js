const express = require('express');
const router = express.Router();
const projects = require('../../services/projects')


// POST a new project
router.post('/', async (req, res, next) => {
	try {
		res.json(await projects.create(req.body))
	} catch (err) {
		console.error("Error while creating project", err.message);
		next(err);
	}
})

// GET Projects
router.get('/', async (req, res, next) => {
	try {
		res.json(await projects.getMultiple(req.query.page))
	} catch (err) {
		console.log("Error while getting Projects", err.message)
		next(err)
	}
})

// PUT project
router.put('/:id', async (req, res, next) => {
	try {
		res.json(await projects.update(req.params.id, req.body))
	} catch (err) {
		console.error("Error while updating project", err.message)
		next(err)
	}
})


// DELETE a project
router.delete('/:id', async (req, res, next) => {
	try {
		res.json(await projects.remove(req.params.id))
	} catch (err) {
		console.error("Error while deleting project", err.message)
		next(err)
	}
})

module.exports = router