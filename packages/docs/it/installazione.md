# Installazione

Installa Codnekt con il tuo package manager preferito:

```bash{5}
yarn add codnekt
---
npm install codnekt
---
pnpm install codnekt
```

Esegui successivamente il comando per scansionare i file del tuo progetto definendo il path della cartella da scansionare

```bash{1}
codnekt --path='YOUR_FILES_PATH'
```

Una volta completato il scansionamento ti si aprirà una finestra broswer dove poter vedere i collegamenti del tuo progetto!

:::warning
Al momento supportiamo per lo scanning solo un sub-set di file, tra cui vue, js. 

Consulta la pagina dedicata per scoprire quali tipi di file sono supportati.
:::