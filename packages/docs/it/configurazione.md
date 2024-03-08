# Configurazione (presto disponibile)

:::warning
Al momento è una funzionalità ancora in cantiere e sotto sperimentazione. 

Le proprietà potrebbero cambiare.
:::

---

Prossimamente sarà disponibile la possibilità di aggiungere al proprio progetto un file **codnekt.config.js** per settare personalizzazioni alla propria istanza.

## Esempio

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


- **PATH** : percorso della cartella dalla quale far partire lo scan
- **EXCLUDE** : inserisci se necessario una lista di tipi di file da escludere dal parsing (es. [".ts", ".php"])
- **START** : qui potrai settare delle impostazioni per la pagina iniziale che ti si aprirà dopo l'esecuzione del comando