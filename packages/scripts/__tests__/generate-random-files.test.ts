import fs from 'fs'
import path from 'path'
// @ts-ignore
import { generateFiles } from '../src/generate-random-files.ts'

describe('generateFiles', () => {
    const testDir = './assets' // Test directory to generate files

    // Clean up the directory after tests
    afterAll(() => {
        fs.rm(testDir, { recursive: true }, (err) => {
            if (err) {
                // Handle error
                console.error(err)
                return
            }
        })
    })

    it('should generate specified number of files with random imports', () => {
        const numFiles = 5

        generateFiles(numFiles, testDir)

        // Check if the files are generated
        for (let i = 1; i <= numFiles; i++) {
            const filename = `file${i}.js`
            const filepath = path.join(testDir, filename)
            expect(fs.existsSync(filepath)).toBeTruthy() // Check if file exists
        }
    })

    it('should generate files with correct content', () => {
        const numFiles = 5

        generateFiles(numFiles, testDir)

        for (let i = 1; i <= numFiles; i++) {
            const filename = `file${i}.js`
            const filepath = path.join(testDir, filename)
            const fileContent = fs.readFileSync(filepath, 'utf8')

            // Check if file content includes the file's name
            expect(fileContent.includes(`console.log('This is ${filename}');`)).toBeTruthy()

            // Check if all imports are valid
            const importRegex = /import '(.*?)';/g
            let match
            const imports = []
            while ((match = importRegex.exec(fileContent))) {
                imports.push(match[1])
            }
            for (const importFile of imports) {
                expect(fs.existsSync(path.join(testDir, importFile))).toBeTruthy()
            }
        }
    })
})
