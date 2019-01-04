# jex 🐢🚀 (Jekyll meets Express)

> Breathe new life into old Jekyll sites

`jex` is a Node.js module for building dynamic and static websites. It draws 
inspiration from Jekyll, a Ruby tool for creating static websites.

Similarities to Jekyll:

- Write your web pages in Markdown (or HTML).
- Add JSON and YML files to a data directory for use with your content.
- Use the Liquid templating language for dynamic rendering.
- Use YAML frontmatter to add metadata to your pages.
- Use multiple layouts.
- Add redirects when your URLs change.

Differences from Jekyll:

- **Node.js**: jex is a Node.js module written in JavaScript. Jekyll is written in Ruby.
- **Dynamic** or **Static**: jex apps can be exported as static websites, or they can be run as web servers with Express under the hood.
- **Middleware**: jex provides hooks for 
- **Babel**: Write your browser code using the latest flavor of JavaScript (ES6, ES2018, etc), and it is dynamically browserified and transpiled for browser compatibility.
- **Sass**: Write your stylesheets in Sass or SCSS and they're dynamically rendered as CSS.

## Examples

Wanna see what a Jex website looks like? Check out these examples:

- [examples/basic](examples/basic) 
- [examples/custom](examples/custom)

## Installation

Jex is still in early development, and is not yet published to npm.

You can install it directly from the GitHub repo:

```sh
npm install jex/jex
```

## Usage

```
jex serve <sitedir>
```

## Rules

- **Pages** are written in Markdown. They live in the `pages` directory and must have an `.md` extension.
- **Data** lives in the `/data` directory and can have `.json`, `.yml`, or `.yaml` extension.
- **Layouts** live in the `/layouts` directory and must have an `.md` extension.

## Frontmatter

- `redirects`
- `permalinks`

## Configuration

Configuration is not required! All of the options below have sensible defaults,
but they can be overridden to fit the needs of your specific project.

To configure your jex app, create a `jex.js` file in the root of your project. 
Here's an example:

```js
module.exports = {
  pagesDir: 'content/en',
  dataDir: '.',
  layoutsDir: 'my/layouts',
  afterContext: (req, res, next) => {
    req.context.modifiedByMiddleware = true
    next()
  },
  beforeRender: (req, res, next) => {
    req.context.page.modifiedByMiddleware = true
    next()
  }
}
```

## Config Options

- [`pagesDir`](#pagesdir)
- [`dataDir`](#datadir)
- [`layoutsDir`](#layoutsdir)
- [`pageFileFilter()`](#pagefilefilterfilename)
- [`dataFileFilter()`](#datafilefilterfilename)
- [`createPermalinks()`](#createpermalinkspage)
- [`afterContextualize()`](#aftercontextualizereq-res-next)
- [`beforeRender()`](#beforerenderreq-res-next)
- [`redirects`](#redirects)

### `pagesDir`

Where the pages live.

Default: `pages`

### `dataDir`

Where the data files live.

Default: `data`

### `layoutsDir`

Where the layouts live.

Default: `layouts`

### `pageFileFilter(filename)`

Filter function to customize which page files are included or ignored.

Default:

```js
(filename) => { return true }
```

### `dataFileFilter(filename)`

Filter function to customize which data files are included or ignored.

Default:

```js
(filename) => { return true }
```

### `createPermalinks(page)`

Function to override the generation of permalinks for a page.

The default behavior is to create a "clean URL" based on the path and filename:

- `foo/bar/index.md` -> `/foo/bar`
- `foo/bar/some-page.md` -> `/foo/bar/some-page`

### `afterContextualize(req, res, next)`

Express/Connect middleware function to modify `req.context` after it's created.

Default: none

### `beforeRender(req, res, next)`

Express/Connect middleware function to modify `req.context.page` before it's rendered.

### `redirects`

Object for defining redirects.

## License

MIT
