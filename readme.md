# jex

> Breathe new life into old Jekyll sites

## Installation

```sh
npm install @zeke/jex
```

## Usage

```
jex serve <sitedir>
```

## Examples

See [examples/basic](examples/basic) and [examples/custom](examples/custom).

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

- [`pagesDir`](#pages-dir)
- [`dataDir`](#data-dir)
- [`layoutsDir`](#layouts-dir)
- [`pageFileFilter()`](#page-file-filter)
- [`dataFileFilter()`](#data-file-filter)
- [`createPermalinks()`](#create-permalinks)
- [`afterContextualize()`](#after-contextualize)
- [`beforeRender()`](#before-render)

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
