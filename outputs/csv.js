'use strict';

const fs = require('fs/promises');

const { Parser } = require('@json2csv/plainjs');

// Module	Review Level	Activity Level (current)	Activity Level (target)	Product Dependencies	Download Stats	ESM/CJS	Foundation Supported	What Does it Do	Section	npm link	github link

function createFields() {
	const fields = [
		{
			label: 'Module',
			value: 'name'
		},
		{
			label: 'ESM/CJS',
			value: 'type'
		},
		{
			label: 'Latest Version',
			value: 'latestVersion'
		},
		{
			label: 'Downloads',
			value: 'downloads'
		},
		{
			label: 'Downloads Start Date',
			value: 'start'
		},
		{
			label: 'Downloads End Date',
			value: 'end'
		},
		{
			label: 'Last Modified',
			value: 'modified'
		},
		{
			label: 'What Does It Do',
			value: 'description'
		},
		{
			label: 'npm Link',
			value: 'npmlink'
		},
		{
			label: 'Git Link',
			value: 'repository'
		}
	];

	return fields;
}

async function createCSV(data) {
// Set fields for the csv

	const opts = {
	  fields: createFields()
	};




	const parser = new Parser(opts);
	const csv = parser.parse(data);

  // Write the csv file out
  await fs.writeFile('output.csv', csv);
}

module.exports = exports = createCSV;