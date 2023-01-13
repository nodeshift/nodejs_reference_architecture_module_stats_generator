'use strict';

const outputToCSV = require('./outputs/csv');

const packageDownloads = require('./package-downloads');
const packageMetadata = require('./packument-metadata');

function parseModuleType(type) {
  // Figure out if this is an ESM or CJS module or both
  // TODO: figure out logic for both and how to check if it is an .mjs
  if (type === 'module') {
    return 'ESM';
  }

  return 'CJS';
}

function parseRepository(repository) {
  // Find the source control link
  // TODO: Should be more better than this
  return repository.url;
}

async function run() {
  // Get the list of modules from the reference architecture repo
  // https://raw.githubusercontent.com/nodeshift/nodejs-reference-architecture/main/npcheck.json
  const response = await fetch('https://raw.githubusercontent.com/nodeshift/nodejs-reference-architecture/main/npcheck.json');
  const refArchModules = await response.json();

  // Get the downloads for the module list
  const moduleDownloads = await packageDownloads(refArchModules.modules);

  // Get the pacakge metadata for the module list
  const packageMetadatas = await packageMetadata(refArchModules.modules);

  const mapped = packageMetadatas.map((obj) => {
    // based on the object _id, find the package in the downloads array and add it to this obj and return
    const foundDownloadStat = moduleDownloads.find((stat) => {
      return obj._id === stat.package;
    });

    // Need to only provide the stuff we need
    const latestVersion = obj['dist-tags'].latest;
    const latestVersionInfo = obj.versions[latestVersion];

    return {
      name: obj.name,
      npmlink: obj.npmlink || obj.npmLink,
      description: obj.description,
      modified: obj.time.modified,
      type: parseModuleType(latestVersionInfo.type),
      repository: parseRepository(obj.repository),
      latestVersion,
      latestVersionInfo,
      ...foundDownloadStat
    };
  });

  // output the list
  // mapped.forEach((val) => {
  //   // console.log(val);
  // //  console.log(`Package: ${val.name} Downloads: ${val.downloads} Description: ${val.description} Latest: ${val.latestVersion} Module type: ${val.type} Modified: ${val.modified}`);
  // })

  outputToCSV(mapped);
}

run();
