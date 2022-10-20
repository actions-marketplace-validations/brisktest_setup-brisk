"use strict";
// Node.js core
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
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
        const token = core.getInput('brisk_token');
        // Gather OS details
        const osPlatform = os.platform();
        const osArch = os.arch();
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
