# keicho-scrapbox-proxy

Keicho proxy for Scrapbox, using TamperMonkey. To generate the userscript which
can be installed to TamperMonkey, run

<!--markdownlint-capture -->
<!--markdownlint-disable MD013-->

```shell
deno run --unstable --allow-read=./index.ts --allow-write=./index.user.js --allow-net=raw.githubusercontent.com build.ts && deno fmt index.user.js
```

<!--markdownlint-restore -->
