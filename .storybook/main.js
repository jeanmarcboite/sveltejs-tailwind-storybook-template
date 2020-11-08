const sveltePreprocess = require('svelte-preprocess')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    const svelteLoader = config.module.rules.find(
      (r) => r.loader && r.loader.includes('svelte-loader'),
    )
    svelteLoader.options = {
      ...svelteLoader.options,
      preprocess: sveltePreprocess({
        postcss: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
            require('postcss-nested'),
          ],
        },
      }),
    }
    return config
  },
}
