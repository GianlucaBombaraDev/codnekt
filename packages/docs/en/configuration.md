# Configuration (coming soon)

:::warning
At the moment it is a feature still in the pipeline and under experimentation.

Properties may change.
:::

---

The possibility of adding a **codnekt.config.js** file to your project to set customizations for your instance will soon be available.

## Example

```js{3}
module.exports = {
    path: 'YOUR_FILE_PATH',
    exclude: ARRAY_OF_TYPES_FILE_TO_EXCLUDE,
    start: {
        mode: 'TABLE|GRAPH',
        filters: ARRAY_OF_FILTER,
        sorting: ARRAY_OF_SORTING,
    }
}
```


- **PATH**: path of the folder from which to start the scan
- **EXCLUDE** : enter if necessary a list of file types to exclude from parsing (e.g. [".ts", ".php"])
- **START**: here you can set settings for the home page that will open after executing the command