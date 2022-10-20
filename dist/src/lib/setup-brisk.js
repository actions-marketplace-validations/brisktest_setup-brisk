"use strict";
// Node.js core
Object.defineProperty(exports, "__esModule", { value: true });
// External
const core = require("@actions/core");
const tc = require("@actions/tool-cache");
// arch in [arm, x32, x64...] (https://nodejs.org/api/os.html#os_os_arch)
// return value in [amd64, 386, arm]
function mapArch(arch) {
    const mappings = {
        x32: '386',
        x64: 'amd64'
    };
    return mappings[arch] || arch;
}
// os in [darwin, linux, win32...] (https://nodejs.org/api/os.html#os_os_platform)
// return value in [darwin, linux, windows]
function mapOS(os) {
    const mappings = {
        win32: 'windows'
    };
    return mappings[os] || os;
}
async function downloadCLI(url) {
    core.debug(`Downloading Brisk CLI from ${url}`);
    const pathToCLI = await tc.downloadTool(url);
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
            core.exportVariable("BRISK_PROJECT_CONFIG_FILE", config_file);
        }
        if (brisk_ci.length > 0) {
            core.exportVariable("BRISK_CI", brisk_ci);
        }
        else {
            core.exportVariable("BRISK_CI", "true");
        }
        // Gather OS details
        // const osPlatform = os.platform();
        // const osArch = os.arch();
        core.debug(`Finding releases for Brisk version ${version}`);
        const url = `https://update.brisktest.com/brisk/${version}/linux-amd64/brisk`;
        // Download requested version
        const pathToCLI = await downloadCLI(url);
        // Add to path
        core.addPath(pathToCLI);
    }
    catch (error) {
        core.error(error);
        throw error;
    }
}
exports.default = run;
