import { defineConfig } from 'vitepress'
import itConfig from './config.it'
import enConfig from './config.en'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'CodNekt',
    description: 'A VitePress Site',
    themeConfig: {
        nav: [{ text: 'Home', link: '/' }],
        socialLinks: [{ icon: 'github', link: 'https://github.com/GianlucaBombaraDev/codnekt' }],
    },
    locales: {
        root: {
            label: 'English',
            lang: 'en',
            link: '/',
            ...enConfig,
        },
        it: {
            label: 'Italiano',
            lang: 'it',
            link: '/it/',
            ...itConfig,
        },
    },
})
