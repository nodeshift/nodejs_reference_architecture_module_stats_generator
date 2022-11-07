'use strict';

const got = require('got')
const YEARS = [2016, 2017, 2018, 2019, 2020, 2021]
const FRAMEWORKS = require('./web-frameworks.json')
const totalRegistryDownloadsByYear = {}

async function getRegistryDownloads () {
  for (const year of YEARS) {
    const { body } = await got(`https://api.npmjs.org/downloads/point/${year}-01-01:${year}-12-31`, {
      responseType: 'json'
    })
    totalRegistryDownloadsByYear[year] = body.downloads
  }
  console.log(totalRegistryDownloadsByYear)

  console.log('*** Framework Metrics ***')
  for (const framework of FRAMEWORKS) {
    const frameworkData = [framework]
    for (const year of YEARS) {
      const {
        body
      } = await got(`https://api.npmjs.org/downloads/point/${year}-01-01:${year}-12-31/${framework}`, {
        responseType: 'json'
      })
      frameworkData.push(body.downloads/ totalRegistryDownloadsByYear[year]);
      //frameworkData.push(body.downloads)
    }
    console.log(frameworkData.toString())
  }
}

getRegistryDownloads()
