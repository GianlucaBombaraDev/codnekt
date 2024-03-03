import { readFile } from 'fs/promises'
// @ts-ignore
import path from 'path'
import { getFileCategory } from '../utils/category-parser.js'
import { parsePHP, parseJavascript, parseSass, parseLess } from '../utils/import-parser.js'

export async function searchTreeConnections(filePath = '', file: any) {
    // Path to the JavaScript file
    // Regular expression to match import statements
    // This will match both single and multi-line imports, including dynamic imports
    try {
        return await readAndExtractImports(file, filePath)
    } catch (err) {
        console.error('Error:', err)
        return null
    }
}

interface IResponseFile {
    name: string
    path: string
    alias?: string
    relation?: string
}

interface IResponseImports {
    categories: string | boolean
    match: null | IResponseFile[]
}

async function readAndExtractImports(file: any, filePath: string) {
    try {
        const data = await readFile(filePath, 'utf8')

        const response: IResponseImports = {
            categories: getFileCategory(file, data),
            match: null,
        }

        const extension = path.extname(file).slice(1)

        // @ts-ignore
        if (extension === 'php') response.match = parsePHP(data)
        // @ts-ignore
        if (['js', 'vue'].includes(extension)) response.match = parseJavascript(data)
        // @ts-ignore
        if (extension === 'scss') response.match = parseSass(data)
        // @ts-ignore
        if (extension === 'less') response.match = parseLess(data)

        return response
    } catch (err) {
        console.error('Error reading the file:', err)
        throw err
    }
}
