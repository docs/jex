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

### `afterContext(req, res, next)`

Express/Connect middleware function to modify `req.context` after it's created.

Default: none

### `beforeRender(req, res, next)`

Express/Connect middleware function to modify `req.context.page` before it's rendered.

### `createPermalinks(page)`

Function to override the generation of permalinks for a page.

The default behavior is to create a "clean URL" based on the path and filename:

- `foo/bar/index.md` -> `/foo/bar`
- `foo/bar/some-page.md` -> `/foo/bar/some-page`


## Dependencies

- [express](https://github.com/expressjs/express): Fast, unopinionated, minimalist web framework
- [flat](https://github.com/hughsk/flat): Take a nested Javascript object and flatten it, or unflatten an object with delimited keys
- [gray-matter](https://github.com/jonschlinkert/gray-matter): Parse front-matter from a string or file. Fast, reliable and easy to use. Parses YAML front matter by default, but also has support for YAML, JSON, TOML or Coffee Front-Matter, with options to set custom delimiters. Used by metalsmith, assemble, verb and many other projects.
- [hubdown](https://github.com/electron/hubdown): Convert markdown to GitHub-style HTML using a common set of remark plugins
- [js-yaml](https://github.com/nodeca/js-yaml): YAML 1.2 parser and serializer
- [liquid-node](https://github.com/sirlantis/liquid-node): Node.js port of Tobias Lütke&#39;s Liquid template engine.
- [lodash](https://github.com/lodash/lodash): Lodash modular utilities.
- [minimist](https://github.com/substack/minimist): parse argument options
- [walk-sync](https://github.com/joliss/node-walk-sync): Get an array of recursive directory contents

## Dev Dependencies

- [cheerio](https://github.com/cheeriojs/cheerio): Tiny, fast, and elegant implementation of core jQuery designed specifically for the server
- [got](https://github.com/sindresorhus/got): Simplified HTTP requests
- [jest](https://github.com/facebook/jest): Delightful JavaScript Testing.
- [nodemon](https://github.com/remy/nodemon): Simple monitor script for use during development of a node.js app.
- [standard](https://github.com/standard/standard): JavaScript Standard Style
- [tree-kill](https://github.com/pkrumins/node-tree-kill): kill trees of processes

## License

MIT
