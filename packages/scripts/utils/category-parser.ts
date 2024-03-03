// @ts-ignore
import path from 'path'
import * as acorn from 'acorn'
import * as walk from 'acorn-walk'

export function getFileCategory(file: any, data: string) {
    let isTest = _checkIfTestFile(file)
    let categories

    if (isTest) {
        categories = {
            test: isTest,
        }
    } else {
        categories = {
            vue: _checkIfVue3(file, data),
            js: _checkIfJsClass(file, data),
        }
    }

    const filteredObj = Object.fromEntries(Object.entries(categories).filter(([key, value]) => value !== false))

    // Reconstruct the object from the filtered entries
    return Object.values(filteredObj)[0]
}

/**
 * Check if file is a __test__ file
 * @param fileName
 * @returns
 */
function _checkIfTestFile(fileName: string) {
    const testFilePatterns = ['.test.js', '.spec.js', '.test.ts', '.spec.ts']
    return testFilePatterns.some((pattern) => fileName.endsWith(pattern)) ? 'test' : false
}

/**
 * Check if Js file contains class
 * @param file
 * @param fileContents
 * @returns
 */
function _checkIfJsClass(file: any, fileContents: string) {
    const extension = path.extname(file).slice(1)
    if (extension !== 'js') return false

    let hasClass = false

    // Parse the file content
    const ast = acorn.parse(fileContents, { ecmaVersion: 'latest', sourceType: 'module' })

    // Traverse the AST to find class declarations
    walk.simple(ast, {
        ClassDeclaration() {
            hasClass = true
        },
    })

    return hasClass ? 'jsClass' : false
}

/**
 * Check if file is .vue and what version is
 * @param file
 * @param data
 * @returns
 */
function _checkIfVue3(file: any, data: string) {
    const extension = path.extname(file).slice(1)
    if (extension !== 'vue') return false

    const scriptSetupRegex = /<script\s+setup\s*>/
    const setupFunctionRegex = /setup\s*\(\s*props\s*,\s*context\s*\)/

    return scriptSetupRegex.test(data)
        ? 'vue3/script setup'
        : setupFunctionRegex.test(data)
          ? 'vue3/setup function'
          : 'vue2'
}
