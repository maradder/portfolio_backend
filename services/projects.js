const db = require('./db')
const helper = require('../helper')
const config = require('../config')

// Get the projects from the database
async function getMultiple(page = 1) {
	const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query(
		`SELECT id, project_title, client, multiple_images, screenshot_url, short_description, backend, server, database_type, backend_hosting, frontend_framework, frontend_style_engine, frontend_hosting, url, testimonial FROM projects LIMIT ${offset}, ${config.listPerPage}`
	)

	const data = helper.emptyOrRows(rows);
	const meta = {page};

	return {
		data,
		meta
	}
}

// Create a project
async function create(project) {
	const result = await db.query(
		`INSERT INTO projects(project_title, client, multiple_images, screenshot_url, short_description, backend, server, database_type, backend_hosting, frontend_framework, frontend_style_engine, frontend_hosting, url, testimonial)VALUES("${project.project_title}", "${project.client}", ${project.multiple_images}, "${project.screenshot_url}", "${project.short_description}", "${project.backend}", "${project.server}", "${project.database_type}", "${project.backend_hosting}", "${project.frontend_framework}", "${project.frontend_style_engine}", "${project.frontend_hosting}", "${project.url}", "${project.testimonial}")`
	);
		let message = 'Error in creating project';
		
		if (result.affectedRows) {
			message = 'Project created successfully'
		}
		return message;
}

// Update a project
async function update(id, project) {
	const result = await db.query(
		`UPDATE projects SET project_title="${project.project_title}",client="${project.client}",multiple_images="${project.multiple_images}",screenshot_url="${project.screenshot_url}",short_description="${project.short_description}",backend="${project.backend}",server="${project.server}",database_type="${project.database_type}",backend_hosting="${project.backend_hosting}",frontend_framework="${project.frontend_framework}",frontend_style_engine="${project.frontend_style_engine}",frontend_hosting="${project.frontend_hosting}",url="${project.url}",testimonial="${project.testimonial}" WHERE id=${id}
		`
	);

	let message = 'Error in updating project';

	if (result.affectedRows) {
		message = 'Project successfully updated';
	}

	return message;
}

// Delete a project
async function remove(id) {
	const result = await db.query(
		`DELETE FROM projects WHERE id=${id}`
	);
	let message = 'Error in deleting the project';

	if (result.affectedRows) {
		message = 'Project was successfully deleted'
	}

	return message;
}

module.exports = {
	getMultiple,
	create,
	update,
	remove
}