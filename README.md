# VueNeon

[![npm](https://img.shields.io/npm/v/vue-neon.svg)](https://www.npmjs.com/package/vue-neon) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> Node Interface for Noah project

## Installation

```bash
npm install --save vue-neon
```

## Example
[Code Pen](https://codepen.io/kaivnd/pen/oKwPbw)

## Usage

### Bundler (Webpack, Rollup)

```js
import Vue from 'vue'
import VueNeon from 'vue-neon'
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'vue-neon/dist/vue-neon.css'

Vue.use(VueNeon)
```

### Browser

```html
<!-- Include after Vue -->
<!-- Local files -->
<link rel="stylesheet" href="vue-neon/dist/vue-neon.css"></link>
<script src="vue-neon/dist/vue-neon.js"></script>

<!-- From CDN -->
<link rel="stylesheet" href="https://unpkg.com/vue-neon/dist/vue-neon.css"></link>
<script src="https://unpkg.com/vue-neon"></script>
```

## Development

### Launch visual tests

```bash
npm run dev
```

### Launch Karma with coverage

```bash
npm run dev:coverage
```

### Build

Bundle the js and css of to the `dist` folder:

```bash
npm run build
```


## Publishing

The `prepublish` hook will ensure dist files are created before publishing. This
way you don't need to commit them in your repository.

```bash
# Bump the version first
# It'll also commit it and create a tag
npm version
# Push the bumped package and tags
git push --follow-tags
# Ship it 🚀
npm publish
```

## License

[MIT](http://opensource.org/licenses/MIT)
