'use strict';

const packageDownloads = require('./package-downloads');
const pacakgeMetadata = require('./packument-metadata');

async function run() {
  // Get the list of modules from the reference architecture repo
  // https://raw.githubusercontent.com/nodeshift/nodejs-reference-architecture/main/npcheck.json
  const reponse = await fetch('https://raw.githubusercontent.com/nodeshift/nodejs-reference-architecture/main/npcheck.json');
  const refArchModules = await reponse.json();

  // Get the downloads for the module list
  const moduleDownloads = await packageDownloads(refArchModules.modules);

  // Get the pacakge metadata for the module list
  const pacakgeMetadatas = await pacakgeMetadata(refArchModules.modules);

  const mapped = pacakgeMetadatas.map((obj) => {
    // based on the object _id, find the package in the downloads array and add it to this obj and return
    const foundDownloadStat = moduleDownloads.find((stat) => {
      return obj._id === stat.package;
    });

    return {...obj, ...foundDownloadStat};
  });

  // output the list
  mapped.forEach((val) => {
    console.log(`Package: ${val.name} Downloads: ${val.downloads} Description: ${val.description} Latest: ${val['dist-tags']?.latest} Modified: ${val.time?.modified}`);
  })
}

run();
