// @ts-ignore
import fs from 'fs'
// @ts-ignore
import path from 'path'

export function generateFiles(numFiles = 5, dir = './build') {
    // Ensure the directory exists
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
    // Generate a list of file names
    const files = Array.from({ length: numFiles }, (_, i) => `file${i + 1}.js`)

    // Create and write files with random imports
    files.forEach((file, index) => {
        // Determine random imports, excluding the current file
        const imports = files
            .filter((_, i) => i !== index)
            .sort(() => 0.5 - Math.random()) // Shuffle
            .slice(0, Math.floor(Math.random() * files.length)) // Select a random number of imports

        // Generate import statements
        const importStatements = imports.map((importFile) => `import './${importFile}';`).join('\n')

        // Write the file with its imports
        fs.writeFileSync(path.join(dir, file), importStatements + `\n\nconsole.log('This is ${file}');`)
    })
}
