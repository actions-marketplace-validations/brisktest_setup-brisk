"use strict";
// Node.js core
Object.defineProperty(exports, "__esModule", { value: true });
// External
const core = require("@actions/core");
const tc = require("@actions/tool-cache");
const fs_1 = require("fs");
async function downloadCLI(url, destinationDir) {
    core.debug(`Downloading Brisk CLI from ${url}`);
    const pathToCLI = await tc.downloadTool(url, destinationDir + '/brisk');
    core.debug(`Brisk CLI path is ${pathToCLI}.`);
    if (!pathToCLI) {
        throw new Error(`Unable to download Brisk from ${url}`);
    }
    return pathToCLI;
}
async function run() {
    try {
        // Gather GitHub Actions inputs
        const version = core.getInput('brisk_version');
        const api_token = core.getInput('api_token');
        const api_key = core.getInput('api_key');
        const project_token = core.getInput('project_token');
        const config_file = core.getInput('config_file');
        const brisk_ci = core.getInput('brisk_ci');
        if (api_token.length > 0) {
            core.exportVariable('BRISK_APITOKEN', api_token);
        }
        if (api_key.length > 0) {
            core.exportVariable('BRISK_APIKEY', api_key);
        }
        if (project_token.length > 0) {
            core.exportVariable('BRISK_PROJECT_TOKEN', project_token);
        }
        if (config_file.length > 0) {
            core.exportVariable('BRISK_PROJECT_CONFIG_FILE', config_file);
        }
        if (brisk_ci.length > 0) {
            core.exportVariable('BRISK_CI', brisk_ci);
        }
        else {
            core.exportVariable('BRISK_CI', 'true');
        }
        // Gather OS details
        // const osPlatform = os.platform();
        // const osArch = os.arch();
        core.debug(`Finding releases for Brisk version ${version}`);
        const url = `https://update.brisktest.com/brisk/${version}/linux-amd64/brisk`;
        core.debug(`download brisk from ${url}`);
        // Download requested version
        const destinationDir = process.env['RUNNER_TEMP'] || '';
        const pathToCLI = await downloadCLI(url, destinationDir);
        try {
            core.debug('Set executable permission to brisk file at ' + pathToCLI);
            (0, fs_1.chmodSync)(pathToCLI, '777');
            core.debug('We have changed the permission of brisk executable to 777');
        }
        catch (error) {
            core.debug(`chmodSync error: ${error}`);
            core.setFailed(error);
        }
        try {
            (0, fs_1.accessSync)(pathToCLI, fs_1.constants.X_OK);
            console.log('can execute');
        }
        catch (err) {
            core.error(`no access! ${err}`);
            core.setFailed(err);
        }
        // Add to path
        core.debug(`Brisk CLI path is ${pathToCLI}.`);
        // Add to path
        core.addPath(pathToCLI);
        core.addPath(destinationDir);
    }
    catch (error) {
        core.error(error);
        throw error;
    }
}
exports.default = run;
