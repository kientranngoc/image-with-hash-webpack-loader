const { getOptions } = require('loader-utils')
const validateOptions = require('schema-utils')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const schema = {
  type: 'object',
  properties: {
    src: {
      type: 'string',
    },
    'query-param-key': {
      type: 'string',
    },
    'hash-algorithm': {
      type: 'string',
    },
    length: {
      type: 'number',
    },
    extensions: {
      type: 'array',
    },
  },
}

module.exports = function (source) {
  const options = getOptions(this)
  const replacer = (match, p1) => {
    // Verify if file exists
    const filePath = path.resolve(options['src'], p1)
    if (fs.existsSync(filePath)) {
      shasum = crypto.createHash(options['hash-algorithm'])
      s = fs.readFileSync(filePath)
      shasum.update(s)
      const hash = shasum.digest('hex')
      return `"${p1}?${options['query-param-key']}=${hash.substring(
        0,
        options['length']
      )}"`
    } else {
      return match
    }
  }

  validateOptions(schema, options, 'imageWithHashLoader')

  // Apply some transformations to the source...
  const imageRegex = new RegExp(
    '(?:\'|")(.*?.(' + options['extensions'].join('|') + '))(?:\'|")',
    'gim'
  )
  source = source.replace(imageRegex, replacer)
  return source
}
