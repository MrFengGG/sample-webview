'use strict';
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    mainJs:resolveAppPath('src/main.js'),
    html:resolveAppPath('public/index.html'),
    buildPath:resolveAppPath('static'),
    rootPath:appDirectory,
    mockPath:resolveAppPath("mock/proxy.js")
};