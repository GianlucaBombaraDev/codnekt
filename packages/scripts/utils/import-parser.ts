/**
 * Get imports list of php file
 * require | require_one | include | include_once
 * @param fileContent
 * @returns
 */
export function parsePHP(fileContent: string) {
    const matchRegex = /(require|require_once|include|include_once)\s*(?:\(\s*)?['"](.*?)['"](?:\s*\))?/g
    const matches = fileContent.match(matchRegex)

    return matches ? matches.map((match) => match.replace(matchRegex, '$2')) : []
}

/**
 *  Get imports list of css LESS file
 * @param fileContent
 * @returns
 */
export function parseLess(fileContent: string) {
    const importRegex = /@import\s+['"](.*?)['"];/g
    const imports = fileContent.match(importRegex)
    return imports ? imports.map((importStatement) => importStatement.replace(importRegex, '$1')) : []
}

/**
 *  Get imports list of css SASS file
 * @param fileContent
 * @returns
 */
export function parseSass(fileContent: string) {
    const importRegex = /@import\s+['"](.*?)['"];/g

    const imports = fileContent.match(importRegex)
    return imports ? imports.map((importStatement) => importStatement.replace(importRegex, '$1')) : []
}

/**
 *  Get imports list of javascript file
 * @param data
 * @returns
 */
export function parseJavascript(data: string) {
    const matchRegex = /^(?!\/\/).*import\s+(?:\w+|\{[^{}]+\})\s+from\s+'[^']+'/gm
    const exportRegex = /(?:import\s+(?:{(?:.*?)}\s+)?([^;]+)\s+from\s+['"](.*)['"])/

    const matches = data.match(matchRegex)

    // cancella {} e toglie spazi
    const _parseCurlyBrackets = (word: string): string =>
        word && word !== undefined ? word.replace(/{\s*/g, '').replace(/\s*}/g, '') : ''

    if (matches) {
        const result = matches.map((str) => {
            // @ts-ignore
            const [, names, path] = str.match(exportRegex)
            const [name, alias] = names.split(/\s+as\s+/)
            return {
                name: _parseCurlyBrackets(name),
                path,
                alias: _parseCurlyBrackets(alias),
                relation: path.split('/').pop(),
            }
        })
        return result
    } else {
        return null
    }
}
