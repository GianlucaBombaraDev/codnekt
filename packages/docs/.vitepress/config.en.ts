import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'CodNekt',
    description: 'Codnekt Documentation',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [{ text: 'Home', link: '/en' }],

        sidebar: [
            {
                text: 'Introduction',
                items: [
                    { text: 'Why Codnekt?', link: '/en/introduction' },
                    { text: 'Installation', link: '/en/installation' },
                    { text: 'Configuration', link: '/en/configuration' },
                    { text: 'Supported File', link: '/en/supported-file' },
                ],
            },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/GianlucaBombaraDev/codnekt' }],
    },
})
