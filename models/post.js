const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema(
	{
		author: {
			type: 'string',
			required: true,
		},
		img_src: {
			type: 'string',
			required: true,
		},
		img_alt: {
			type: 'string',
			required: true,
		},
		title: {
			type: 'string',
			required: true,
		},
		date_published: {
			type: Date,
			required: true,
		},
		headline: {
			type: 'string',
			required: true,
		},
		category: {
			type: 'string',
			required: false,
		},
		content: [],
	}
)

module.exports = mongoose.model("Post", PostSchema)