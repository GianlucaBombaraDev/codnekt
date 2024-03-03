// @ts-ignore
import { searchTreeConnections } from '../src/search-tree-files-connection.ts'
import * as fsPromises from 'fs/promises'
import path from 'path'
import { getFileCategory } from '../utils/category-parser'
import { parseJavascript } from '../utils/import-parser'

// Mock the fs/promises and path modules, and utility functions
jest.mock('fs/promises')
jest.mock('path')
jest.mock('../utils/category-parser', () => ({
    getFileCategory: jest.fn(),
}))
jest.mock('../utils/import-parser', () => ({
    parsePHP: jest.fn(),
    parseJavascript: jest.fn(),
    parseSass: jest.fn(),
    parseLess: jest.fn(),
}))

describe('searchTreeConnections', () => {
    // Example test for a JavaScript file
    it('should correctly handle a JavaScript file', async () => {
        const fakeFilePath = 'path/to/file.js'
        const fakeFileContent = 'import something from "somewhere";'
        const fakeResponse = [{ name: 'somewhere', path: 'path/to/somewhere', alias: 'something', relation: 'import' }]

        // Mock implementations
        ;(fsPromises.readFile as jest.Mock).mockResolvedValue(fakeFileContent)
        ;(path.extname as jest.Mock).mockReturnValue('.js')
        ;(getFileCategory as jest.Mock).mockReturnValue('javascript')
        ;(parseJavascript as jest.Mock).mockReturnValue(fakeResponse)

        const result = await searchTreeConnections(fakeFilePath, fakeFilePath)

        expect(result).toEqual({
            categories: 'javascript',
            match: fakeResponse,
        })

        expect(fsPromises.readFile).toHaveBeenCalledWith(fakeFilePath, 'utf8')
        expect(getFileCategory).toHaveBeenCalledWith(fakeFilePath, fakeFileContent)
        expect(parseJavascript).toHaveBeenCalledWith(fakeFileContent)
    })
})
