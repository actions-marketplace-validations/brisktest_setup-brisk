# setup-brisk

[![Continuous Integration](https://github.com/brisktest/setup-brisk/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/brisktest/setup-brisk/actions/workflows/continuous-integration.yml)
[![Setup Brisk](https://github.com/brisktest/setup-brisk/actions/workflows/setup-brisk.yml/badge.svg)](https://github.com/brisktest/setup-brisk/actions/workflows/setup-brisk.yml)

The `brisktest/setup-brisk` action is a JavaScript action that sets up Brisk CLI in your GitHub Actions workflow by:

- Downloading a specific version of Brisk CLI and adding it to the `PATH`.
- Configuring the environment with env vars to configure your run such as api tokens and keys and project files.

After you've used the action, subsequent steps in the same job can run arbitrary Brisk commands using [the GitHub Actions `run` syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsrun). This allows most Brisk commands to work exactly like they do on your local command line.

## Usage

This action can be run on `ubuntu-latest` and `macos-latest` GitHub Actions runners.

The default configuration installs the latest version of Brisk CLI

```yaml
steps:
  - uses: brisktest/setup-brisk@v1
```

A specific version of Brisk CLI can be installed:

```yaml
steps:
  - uses: brisktest/setup-brisk@v1
    with:
      brisk_version: 0.1.25
```

Credentials for Brisk ([brisktest.com](https://brisktest.com/)) can be configured:

```yaml
steps:
  - uses: brisktest/setup-brisk@v1
    with:
      api_token: ${{ secrets.BRISK_TOKEN }}
      api_key: ${{ secrets.BRISK_API_KEY }}
```

## Inputs

The action supports the following inputs:

- `brisk_version` - (optional) The version of Brisk CLI to install. Defaults to latest or you can use a version string like 0.1.25
- `api_token` - (required) The API token from Brisk ([brisktest.com](https://brisktest.com/))
- `api_key` - (required) The API key from Brisk ([brisktest.com](https://brisktest.com/))
- `project_token` - (optional) The token that identifies the project. Can be provided in a config file, typically brisk.json
- `config_file` - (optional) Path to a different config file, defaults to brisk.json
- `brisk_ci` - (optional) Run brisk in CI mode. Defaults to true.

## Example Github Action

Here is a complete example of using this action in your project

```yaml
name: Brisk CI
on: [push]
jobs:
  Brisk-CI:
    runs-on: ubuntu-latest
    steps:
      - run: echo "🎉 The job was automatically triggered by a ${{ github.event_name }} event."
      - name: Check out repository code
        uses: actions/checkout@v3
      - run: echo "💡 The ${{ github.repository }} repository has been cloned to the runner."
      - name: Install Brisk
        uses: brisktest/setup-brisk@v0.0.10
        with:
          brisk_version: 'latest'
          api_token: '${{ secrets.BRISK_APITOKEN }}'
          api_key: '${{ secrets.BRISK_APIKEY }}'
          config_file: 'brisk-ci.json'
      - name: Run Brisk
        shell: 'script -q -e -c "bash {0}"'
        run: brisk
```

## License

[Mozilla Public License v2.0](LICENSE)

## Code of Conduct

[Code of Conduct](CODE_OF_CONDUCT.md)

## Experimental Status

By using the software in this repository (the "Software"), you acknowledge that: (1) the Software is still in development, may change, and has not been released as a commercial product by Brisk and is not currently supported in any way by Brisk; (2) the Software is provided on an "as-is" basis, and may include bugs, errors, or other issues; (3) the Software is NOT INTENDED FOR PRODUCTION USE, use of the Software may result in unexpected results, loss of data, or other unexpected results, and Brisk disclaims any and all liability resulting from use of the Software; and (4) Brisk reserves all rights to make all decisions about the features, functionality and commercial release (or non-release) of the Software, at any time and without any obligation or liability whatsoever.
