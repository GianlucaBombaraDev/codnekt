# Installation

Install Codnekt with your favorite package manager:

```bash{5}
yarn add code
---
npm install code
---
pnpm install code
```

Then execute the command to scan your project files by defining the path of the folder to be scanned

```bash{1}
codnekt --path='YOUR_FILES_PATH'
```

Once the scan is complete, a browser window will open where you can see the links to your project!

:::warning
We currently support only a subset of files for scanning, including vue, js.

Consult the dedicated page to find out which file types are supported.
:::