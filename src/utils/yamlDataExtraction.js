const yamlRegex = /^[\t ]*([-]{3,}|[.]{3,}|[\w-]+:)[^\n]*(?:\n[\t ]+[^\n]*)*/gm

export function extractYamlFromString(text) {
  const matches = text.match(yamlRegex)
  if (matches) {
    const yamlData = matches.map((match) => {
      // Find the positions of all "---" delimiters
      const delimiterIndices = [...match.matchAll(/---/g)].map(
        (match) => match.index
      )
      if (delimiterIndices.length >= 2) {
        // Extract YAML data between the first and second delimiters
        const startIndex = delimiterIndices[0] + 3 // Skip the first '---'
        const endIndex = delimiterIndices[1] // Extract until the second '---'
        return match.substring(startIndex, endIndex).trim()
      }
      return match.trim()
    })
    return yamlData.join('\n')
  }
  return null
}

export function isYamlData(text) {
  return yamlRegex.test(text)
}

export function parseYAMLWithoutSpaces(yamlData) {
  const keyValuePairs = yamlData
    .split(',')
    .map((pair) => pair.trim().split(':'))
  const dataObject = {}

  keyValuePairs.forEach((pair) => {
    const key = pair[0].trim()
    const value = pair[1].trim()
    dataObject[key] = value
  })

  return dataObject
}

export function extractBodyFromYaml(inputString) {
  const dashDashIndex = inputString.indexOf(
    '---',
    inputString.indexOf('---') + 1
  ) // Find the index of the second '---'
  if (dashDashIndex !== -1) {
    return inputString.substring(dashDashIndex + 3).trim() // Extract the string after the second '---'
  } else {
    return '' // Return an empty string if the second '---' is not found
  }
}
