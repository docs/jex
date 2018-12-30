# jex

## Usage

```
jex serve <sitedir>
```

## Conventions / Requirements

- Pages live in the `/pages` directory and have `.md` extension
- Data lives in the `/data` directory.

## Config

- `pagesDir`
- `dataDir`  
- `pageFileFilter`: (file) => { return true },
- `dataFileFilter`: [Function: dataFileFilter],
- `createPermalinks (page)`
- Express Middleware
  - `beforeContext (req, res, next)`
  - `afterContext (req, res, next)` 
  - `beforeRenderPage (req, res, next)` 