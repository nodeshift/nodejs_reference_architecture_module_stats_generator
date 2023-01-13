'use strict';

const fs = require('fs/promises');

const { Parser } = require('@json2csv/plainjs');
const { flatten } = require('@json2csv/transforms');

// Module	Review Level	Activity Level (current)	Activity Level (target)	Product Dependencies	Download Stats	ESM/CJS	Foundation Supported	What Does it Do	Section	npm link	github link

function createFields() {
	const fields = [
		{
			label: 'Module',
			value: 'name'
		},
		{
			label: 'Review Level',
			value: 'reviewlevel'
		},
		{
			label: 'Activity Level(current)',
			value: 'activitycurrent'
		},
		{
			label: 'Activity Level(target)',
			value: 'activitytarget'
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
			label: 'Foundation Supported',
			value: 'foundation'
		},
		{
			label: 'What Does It Do',
			value: 'description'
		},
		{
			label: 'Section',
			value: 'section'
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
		transforms: [
			flatten({ object: false, array: true, separator: ', '}),
		],
	  fields: createFields()
	};




	const parser = new Parser(opts);
	const csv = parser.parse(data);

  // Write the csv file out
  await fs.writeFile('output.csv', csv);
}

module.exports = exports = createCSV;
