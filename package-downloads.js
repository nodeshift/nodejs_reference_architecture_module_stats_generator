'use strict';

// `https://api.npmjs.org/downloads/point/${year}-01-01:${year}-12-31/${framework}`
const baseURL = 'https://api.npmjs.org/downloads/point';

async function getModuleDownloadStats (refArchPackages) {
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

module.exports = getModuleDownloadStats;


/*

downloads: 137061
end: "2022-05-24"
package: "cldr-localenames-full"
start: "2022-01-01"

*/
