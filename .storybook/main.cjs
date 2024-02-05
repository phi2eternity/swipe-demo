const path = require('path');

module.exports = {
    "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions","@storybook/preset-scss","storybook-css-modules"],
    "framework": "@storybook/react",
    "core": {
        "builder": "@storybook/builder-vite"
    },
    "features": {
        "storyStoreV7": true
    },
    viteFinal: async (config, {configType}) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@src': path.resolve(__dirname, '../src'),
            '@pages':  path.resolve(__dirname, '../src/pages'),
            '@features':  path.resolve(__dirname, '../src/features'),
            '@components':  path.resolve(__dirname, '../src/components'),
            '@utils':  path.resolve(__dirname, '../src/utils'),
            '@hooks':  path.resolve(__dirname, '../src/hooks'),
            '@assets':  path.resolve(__dirname, '../src/assets'),
            '@domain':  path.resolve(__dirname, '../src/domain'),
            '@data':  path.resolve(__dirname, '../src/data'),
            '@quicker':  path.resolve(__dirname, '../src'),
            '@styles':  path.resolve(__dirname, '../src/styles'),

        }
        return config
    }
}
