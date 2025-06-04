# NESS Sites

This repository contains the source for multiple sites under the `client` folder.  
Text backups of the page content live next to each site section and can be regenerated with a helper script.

## Exporting page text

To extract all string literals from the pages and update the backup files run:

```bash
npm install          # install TypeScript and tsx if not already present
npx tsx scripts/export-content.ts
```

This command scans every folder inside `client/src/site` and `client/src/pages`, collects the strings from their `.tsx` files and writes them into a `<foldername>.txt` file inside that folder.  
Run it whenever page content changes so the backups stay in sync.

## Environment variables

The server requires a `SESSION_SECRET` environment variable to sign session
cookies. If it is missing the server fails to start, so set it to a random
string before running the application. For example:

```bash
export SESSION_SECRET="a long random string"
npm run dev
```
