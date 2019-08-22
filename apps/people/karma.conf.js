// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const { constants } = require('karma');

module.exports = () => {
  return {
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    port: 9876,
    colors: true,
    logLevel: constants.LOG_INFO,
    autoWatch: true,
    browserNoActivityTimeout: 60000,
    browsers: ['ChromeHeadless'],
    singleRun: true
  };
};
