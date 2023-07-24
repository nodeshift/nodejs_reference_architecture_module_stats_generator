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

async function app() {
  // Get the list of modules from the reference architecture repo
  // https://raw.githubusercontent.com/nodeshift/nodejs-reference-architecture/main/npcheck.json
  const response = await fetch('https://raw.githubusercontent.com/nodeshift/nodejs-reference-architecture/main/npcheck.json');
  const refArchModules = await response.json();

  // Get the downloads for the module list
  const moduleDownloads = await getModuleDownloadStats(refArchModules.modules);

  // Get the pacakge metadata for the module list
  const packageMetadatas = await getPackumentData(refArchModules.modules);

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
      reviewlevel: obj.reviewlevel,
      activitycurrent: obj.activitycurrent,
      activitytarget: obj.activitytarget,
      foundation: obj.foundation,
      section: obj.section,
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

  //Add the download run date values
  document.querySelector('#runDate').innerHTML = `Download Numbers are from ${mapped[0].start} to ${mapped[0].end}`
  createTableHeader();
  createTableRows(mapped);
};

app();
