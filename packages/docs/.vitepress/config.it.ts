import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'CodNekt',
    description: 'Documentazione Ufficiale di Codnekt',
    themeConfig: {
        nav: [{ text: 'Home', link: '/it' }],

        sidebar: [
            {
                text: 'Introduzione',
                items: [
                    { text: 'Perchè Codnekt?', link: '/it/introduzione' },
                    { text: 'Installazione', link: '/it/installazione' },
                    { text: 'Configurazione', link: '/it/configurazione' },
                    { text: 'File supportati', link: '/it/file-supportati' },
                ],
            },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/GianlucaBombaraDev/codnekt' }],
    },
})
