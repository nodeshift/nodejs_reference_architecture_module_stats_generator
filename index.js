'use strict';

const refArchModules = require('./modules.json');
const packageDownloads = require('./package-downloads');
const pacakgeMetadata = require('./packument-metadata');

async function run() {
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

  console.log(mapped);
}

run();
