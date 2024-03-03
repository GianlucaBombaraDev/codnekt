import { getFileCategory } from '../utils/category-parser'
import * as acorn from 'acorn'
import * as walk from 'acorn-walk'
import * as path from 'path'

// Mock the 'path' and 'acorn' modules
jest.mock('path', () => ({
    extname: jest.fn(),
}))

jest.mock('acorn', () => ({
    parse: jest.fn(),
}))

jest.mock('acorn-walk', () => ({
    simple: jest.fn(),
}))

describe('getFileCategory', () => {
    it('should identify a Vue 3 file using script setup', () => {
        const fileName = 'component.vue'
        const fileData = '<script setup>'
        ;(path.extname as jest.Mock).mockReturnValue('.vue')

        const category = getFileCategory(fileName, fileData)
        expect(category).toEqual('vue3/script setup')
    })

    it('should identify a JavaScript file containing a class', () => {
        const fileName = 'script.js'
        const fileData = 'class MyClass {}'
        ;(path.extname as jest.Mock).mockReturnValue('.js')
        ;(acorn.parse as jest.Mock).mockReturnValue({}) // Mock the AST
        ;(walk.simple as jest.Mock).mockImplementation((ast, visitors) => {
            if (visitors.ClassDeclaration) visitors.ClassDeclaration()
        })

        const category = getFileCategory(fileName, fileData)
        expect(category).toEqual('jsClass')
    })

    it('should identify a test file', () => {
        const testFileNames = ['test.spec.ts', 'test.test.js']
        testFileNames.forEach((fileName) => {
            const category = getFileCategory(fileName, '')
            expect(category).toEqual('test')
        })
    })
})
