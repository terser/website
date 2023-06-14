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

const fixCrossLinks = markdowns => {
  const dashify = title =>
    title
      .toLowerCase()
      .replaceAll(/\W|_/g, '-')
      .replaceAll(/-+/g, '-')
      .replaceAll(/^-|-$/g, '')

  const titleLinks = {}
  for (const [filename, md] of Object.entries(markdowns)) {
    const url = `/docs/${filename.replace(/.md$/, '')}`

    titleLinks[dashify(filename)] = url
    for (const title of md.matchAll(/^#+\s*(.+)$/gm)) {
      titleLinks[dashify(title[1])] = url + '#' + dashify(title[1])
    }
  }

  for (const [filename, md] of Object.entries(markdowns)) {
    markdowns[filename] = md.replaceAll(/\(#(.+?)\)/g, (_, $1) => {
      const fixedLink = titleLinks[$1]
      if (!fixedLink) throw new Error('broken link at ' + filename + ': ' + $1)
      return `(${fixedLink})`
    })
  }

  return markdowns
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

let markdowns = {
  'api-reference': readDemarcated('API_REFERENCE'),
  'cli-usage': readDemarcated('CLI_USAGE'),
  'options': readDemarcated('OPTIONS'),
  'reporting-issues': readDemarcated('REPORTING_ISSUES'),
  'miscellaneous': readDemarcated('MISCELLANEOUS'),
}

markdowns = fixCrossLinks(markdowns)

writeMd('api-reference.md', markdowns['api-reference'], {
  id: 'api-reference',
  title: 'API Reference',
  sidebar_label: 'API Reference'
})
writeMd('cli-usage.md', markdowns['cli-usage'], {
  id: 'cli-usage',
  title: 'CLI Usage',
  sidebar_label: 'CLI Usage'
})
writeMd('options.md', markdowns['options'], {
  id: 'options',
  title: 'Options',
  sidebar_label: 'Options'
})
writeMd('reporting-issues.md', markdowns['reporting-issues'], {
  id: 'reporting-issues',
  title: 'Reporting Issues',
  sidebar_label: 'Reporting Issues'
})
writeMd('miscellaneous.md', markdowns['miscellaneous'], {
  id: 'miscellaneous',
  title: 'Miscellaneous',
  sidebar_label: 'Miscellaneous'
})
