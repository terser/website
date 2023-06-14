'use strict'

/**
 * Generates docs MD files from the terser README.md
 **/

const fs = require('fs')
const path = require('path')

if (!process.argv[2]) {
  throw new Error('Usage: ./generate-docs.js path/to/terser/README.md')
}

const doc = fs.readFileSync(process.argv[2], 'utf-8')

const readDemarcated = marker => {
  const markerRegExp = new RegExp(String.raw`<!--\s*${marker}:START\s*-->`)
  const markerEndRegExp = new RegExp(String.raw`<!--\s*${marker}:END\s*-->`)

  const matchStart = doc.match(markerRegExp)
  const matchEnd = doc.match(markerEndRegExp)

  if (!(matchStart && matchEnd)) {
    throw new Error('Marker ' + marker + ' not found')
  }

  return doc.slice(matchStart.index + matchStart[0].length, matchEnd.index)
}

const writeMd = (docFile, text, header) => {
  const writePath = path.join(__dirname, 'docs', docFile)
  const docHeader = [
    '---',
    ...Object.entries(header).map(pair => pair.join(': ')),
    '---',
    ''
  ].join('\n')
  fs.writeFileSync(writePath, docHeader + text)
}

writeMd('api-reference.md', readDemarcated('API_REFERENCE'), {
  id: 'api-reference',
  title: 'API Reference',
  sidebar_label: 'API Reference'
})
writeMd('cli-usage.md', readDemarcated('CLI_USAGE'), {
  id: 'cli-usage',
  title: 'CLI Usage',
  sidebar_label: 'CLI Usage'
})
writeMd('reporting-issues.md', readDemarcated('REPORTING_ISSUES'), {
  id: 'reporting-issues',
  title: 'Reporting Issues',
  sidebar_label: 'Reporting Issues'
})
