async function getModuleDownloadStats (refArchPackages) {
  // `https://api.npmjs.org/downloads/point/${year}-01-01:${year}-12-31/${framework}`
  const baseURL = 'https://api.npmjs.org/downloads/point';

  // Array to hold all the pacakge download data
  const packageDownloads = [];
  // Loop through the modules array
  for (const refArchPackage of refArchPackages) {
    // for each module, find the stats
    const response = await fetch(`${baseURL}/last-year/${refArchPackage.name}`);
    const data = await response.json();
    packageDownloads.push(data);
    // console.log(`module: ${data.package}  yearly Downloads: ${data.downloads} start: ${data.start} end: ${data.end}`);
  }

  return packageDownloads;
}
