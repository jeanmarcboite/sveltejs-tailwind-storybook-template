_Looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)_

---

```bash
npx degit sveltejs/template showcase
cd showcase
```

## Install tailwind

```bash
npm i --save-dev svelte-preprocess
npm i --save-dev postcss-utilities @fullhuman/postcss-purgecss autoprefixer postcss postcss-cli postcss-import@12 postcss-nesting
npm i --save-dev tailwindcss
npx tailwindcss init
npm i --save-dev rollup-plugin-postcss
```

- Change the rollup config

```javascript
import postcss from 'rollup-plugin-postcss'
import autoPreprocess from 'svelte-preprocess'
```

```javascript
  svelte({
      preprocess: autoPreprocess({
        // https://github.com/kaisermann/svelte-preprocess/#user-content-options
        sourceMap: !production,
        postcss: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
            require('postcss-nested'),
          ],
        },
      }),
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: (css) => {
        css.write('bundle.css')
      },
    }),
    postcss({
      extract: 'public/utils.css',
    }),
```

- create a file src/Tailwind.svelte

```javascript
<style global lang="postcss">
  /* only apply purgecss on utilities, per Tailwind docs */ /* purgecss start
  ignore */ @tailwind base; @tailwind components; /* purgecss end ignore */
  @tailwind utilities;
</style>
```

- modify App.svelte

```javascript
<script>
  import Tailwind from "./Tailwind.svelte";

  export let name;
</script>

<style lang="postcss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;

      .tw {
        @apply font-sans text-lg text-center text-green-800;
      }
    }
  }
</style>

<Tailwind />
<main>
  <h1>Hello {name}!</h1>
  <p class="tw">tailwind included<span class="text-red-800">!</span></p>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
</main>
```

## Install storybook

- run cli

```bash
npx -p @storybook/cli sb init --type svelte  --use-npm
```

- add postcss to .storybook/main.js

```javascript
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
```

- preload tailwindcss in preview-head.html

```javascript
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.9.6/tailwind.min.css"
  integrity="sha512-l7qZAq1JcXdHei6h2z8h8sMe3NbMrmowhOl+QkP3UhifPpCW2MC4M0i26Y8wYpbz1xD9t61MLT9L1N773dzlOA=="
  crossorigin="anonymous"
/>
```

## Install electron

```bash
npm i chokidar cross-env electron npm-run-all --save-dev
```

- add electron.js, modify package.json
- relativise pathes in public/index.html

```javascript
	<link rel='stylesheet' href='build/bundle.css'>
<script defer src="build/bundle.js"></script>
```

# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

_Note that you will need to have [Node.js](https://nodejs.org) installed._

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for _any_ path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Using TypeScript

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```

## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
