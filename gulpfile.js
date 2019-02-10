//require('./gulp/tasks/styles');
//require('./gulp/tasks/watch');
'use strict';

var gulp = require('gulp');
var HubRegistry = require('gulp-hub');

/* load some files into the registry */
var hub = new HubRegistry(['./gulp/tasks/*.js']);

/* tell gulp to use the tasks just loaded */
gulp.registry(hub);
