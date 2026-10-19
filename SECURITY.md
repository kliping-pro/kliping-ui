# Security policy

## Reporting a vulnerability

Please report security issues privately through GitHub: open the repository's
**Security** tab and choose **Report a vulnerability**. Do not open a public
issue for a vulnerability.

Include what is affected (a registry item, the `kliping` CLI, or the site),
the version (`npx kliping@latest --version`), and the steps to reproduce.
You will get a reply within 7 days.

## Scope

- **The `kliping` CLI** — for example, a registry item that can write files
  outside the project, or a command that runs something the user did not ask for.
- **Registry items** — code served from `https://kliping.pro/r` that is
  unsafe once installed (such as rendering untrusted HTML).
- **The site** `https://kliping.pro`.

Third-party registries you add to `components.json` are outside this scope.

## Supported versions

Only the latest published `kliping` version receives fixes.
