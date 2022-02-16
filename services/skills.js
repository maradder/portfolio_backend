const db = require('./db')
const helper = require('../helper')
const config = require('../config')

// Get the projects from the database
async function getAllSkills() {
	// const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query(
		`SELECT skill_id, skill, rating FROM skills`
	)

	const data = helper.emptyOrRows(rows);
	// const meta = {page};

	return {
		data,
		// meta
	}
}

module.exports = {
	getAllSkills}