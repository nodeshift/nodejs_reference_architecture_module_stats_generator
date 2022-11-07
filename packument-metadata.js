'use strict';

// The base REST API for looking up packument metadata
// https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md
// https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#public-registry-api
const baseURL = 'https://registry.npmjs.org';

async function getPackumentData(refArchPackages) {
  // Array to store all the packages metadata
  const packumentMetadatas = [];

  // Loop through the modules array
  for (const refArchPackage of refArchPackages) {
    // for each module, find the stats
    const response = await fetch(`${baseURL}/${refArchPackage.name}`);
    const packumentData = await response.json()
    packumentMetadatas.push(packumentData);
  }

  return packumentMetadatas;
}

module.exports = getPackumentData;
