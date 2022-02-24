const express = require('express');
const router = express.Router();
const Post = require('../../models/post')

//***************** CREATE **********************//
// Add blog post
router.post('/', async (req, res, next) => {
	try {
	const newPost = await Post.create(req.body)
	await res.status(200).send(newPost)
	} catch (err) { 
		next(err)
	}
})

//**************** RETRIEVE *********************//
router.get('/', async (req, res, next) => {
	const posts = await Post.find({}, (err, posts) => {
		if (err) next(err)
		if (posts) {
			res.status(200).send(posts)
		}
	})
})

module.exports = router