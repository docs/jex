# Jex 🐢🚀 

> Breathe new life into old Jekyll sites

Jex is a Node.js module for building dynamic and static websites. It draws 
inspiration from Jekyll, a Ruby tool for creating static websites. Jekyll meets 
Express! 

Similarities to Jekyll:

- Write your pages in [Markdown](https://en.wikipedia.org/wiki/Markdown).
- Add metadata to your pages with [YAML frontmatter](https://jekyllrb.com/docs/front-matter/).
- Add [Liquid templating](https://shopify.github.io/liquid/) to make your page content dynamic.
- Add JSON and YML files to a data directory for use in your pages.
- Support multiple layouts.
- Support redirects for retired URL paths.

Differences from Jekyll:

- **Node.js** - Jex is a Node.js module written in JavaScript. (Jekyll is written in Ruby.)
- **Dynamic** or **Static** - Jex apps can be exported as static websites, or they can be run as web servers with Express under the hood.
- **Middleware** - Jex lets you bring your own Express/Connect middleware: Sass, Babel, etc.

## Examples

To get an idea of what a Jex project looks like, check out these examples:

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

## The Basics


### Pages

- are written in Markdown
- live in the `pages` directory
- have an `.md` or `.html` extension

### Data

- lives in the `/data` directory
- can be in `.json`, `.yml`, and `.yaml` files
- can be nested within directories
- is available in templates as `{{ data }}`

### Layouts

- live in the `/layouts` directory
- have a `.md` or `.html` extension
- must include a [Liquid] reference to `{{ content }}`

## Frontmatter

Frontmatter is YML that lives at the top of your pages. It looks like this:

```
---
title: The Loudest Webpage
volume: 11
---

Here begins the page content...
```

Jex has a few frontmatter properties with special meaning:

- `redirects` (TODO: write docs)
- `permalinks` (TODO: write docs)

## Configuration

Jex has sensible defaults, and configuration is not required. If you're 
starting a new Jex project, you can probably work within the defaults. 
If, however, you're adapting an existing project to work with Jex,
it may be necessary to configure it.

To configure your Jex app, create a `jex.js` file that looks like this:

```js
module.exports = {
  // config goes here
}
```

See the config options below.

## Config Options

- [`pagesDirectory`](#pagesdirectory)
- [`pagesIncludePatterns`](#pagesincludepatterns)
- [`pagesExcludePatterns`](#pagesexcludepatterns)
- [`dataDirectory`](#datadirectory)
- [`dataIncludePatterns`](#dataincludepatterns)
- [`dataExcludePatterns`](#dataexcludepatterns)
- [`layoutsDirectory`](#layoutsdirectory)
- [`layoutsIncludePatterns`](#layoutsincludepatterns)
- [`layoutsExcludePatterns`](#layoutsexcludepatterns)
- [`createPermalinks()`](#createpermalinkspage)
- [`afterContextualize()`](#aftercontextualizereq-res-next)
- [`beforeRender()`](#beforerenderreq-res-next)
- [`redirects`](#redirects)

### `pagesDirectory`

Where the pages live.

Default: `pages`

### `pagesIncludePatterns`

An array of [glob patterns] to include when loading pages.

Default: `['**/*.md', '**/*.markdown', '**/*.html']`

### `pagesExcludePatterns`

An array of [glob patterns] to exclude when loading pages.

Default: `['**/node_modules/**', '**/vendor/**']`

### `dataDirectory`

Where the data files live.

Default: `data`

### `dataIncludePatterns`

An array of [glob patterns] to include when loading data.

Default: `['**/*.md', '**/*.markdown', '**/*.html']`

### `dataExcludePatterns`

An array of [glob patterns] to exclude when loading data.

Default: `['**/node_modules/**', '**/vendor/**']`

### `layoutsDirectory`

Where the layouts live.

Default: `layouts`

### `layoutsIncludePatterns`

An array of [glob patterns] to include when loading layouts.

Default: `['**/*.md', '**/*.markdown', '**/*.html']`

### `layoutsExcludePatterns`

An array of [glob patterns] to exclude when loading layouts.

Default: `['**/node_modules/**', '**/vendor/**']`


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


[glob patterns]: https://en.wikipedia.org/wiki/Glob_(programming)
[Liquid]: https://shopify.github.io/liquid/