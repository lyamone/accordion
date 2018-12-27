/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';
/**
 * Use Gulp hub after update to version 4.
 * HubRegistry             =      require('gulp-hub')
 */
var wrench = require('wrench');

/**
 *  This will load all js files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function (file) {
    return (/\.(js)$/i).test(file);
}).map(function (file) {
    require('./gulp/' + file);
});