# setup-brisk

[![Continuous Integration](https://github.com/brisktest/setup-brisk/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/brisktest/setup-brisk/actions/workflows/continuous-integration.yml)
[![Setup Brisk](https://github.com/brisktest/setup-brisk/actions/workflows/setup-brisk.yml/badge.svg)](https://github.com/brisktest/setup-brisk/actions/workflows/setup-brisk.yml)

The `brisktest/setup-brisk` action is a JavaScript action that sets up Brisk CLI in your GitHub Actions workflow by:

- Downloading a specific version of Brisk CLI and adding it to the `PATH`.
- Configuring the [Brisk CLI configuration file](https://brisktest.com/getting_started) with a Brisk hostname and API token.

After you've used the action, subsequent steps in the same job can run arbitrary Brisk commands using [the GitHub Actions `run` syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsrun). This allows most Brisk commands to work exactly like they do on your local command line.

## Usage

This action can be run on `ubuntu-latest` and `macos-latest` GitHub Actions runners.

The default configuration installs the latest version of Brisk CLI

```yaml
steps:
- uses: brisktest/setup-brisk@v2
```

A specific version of Brisk CLI can be installed:

```yaml
steps:
- uses: brisktest/setup-brisk@v2
  with:
    brisk_version: 1.1.7
```

Credentials for Brisk  ([brisktest.com](https://brisktest.com/)) can be configured:

```yaml
steps:
- uses: brisktest/setup-brisk@v2
  with:
    brisk_token: ${{ secrets.BRISK_TOKEN }}
```


## Inputs

The action supports the following inputs:


- `brisk_version` - (optional) The version of Brisk CLI to install. Defaults to latest or you can use a version string like 1.1.25



## License

[Mozilla Public License v2.0](LICENSE)

## Code of Conduct

[Code of Conduct](CODE_OF_CONDUCT.md)

## Experimental Status

By using the software in this repository (the "Software"), you acknowledge that: (1) the Software is still in development, may change, and has not been released as a commercial product by Brisk and is not currently supported in any way by Brisk; (2) the Software is provided on an "as-is" basis, and may include bugs, errors, or other issues;  (3) the Software is NOT INTENDED FOR PRODUCTION USE, use of the Software may result in unexpected results, loss of data, or other unexpected results, and Brisk disclaims any and all liability resulting from use of the Software; and (4) Brisk reserves all rights to make all decisions about the features, functionality and commercial release (or non-release) of the Software, at any time and without any obligation or liability whatsoever.