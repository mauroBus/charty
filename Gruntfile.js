/**
Build generator via grunt
*/
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
  'use strict';

  /** Load all grunt tasks */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  /** Configurable paths */
  var yeomanConfig = {
    app: 'src',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,

    /** Concat */
    concat: {
      dist: {
        src: [
          '<%= yeoman.app %>/api/charty.js',
          '<%= yeoman.app %>/components/scales/*.js',
          '<%= yeoman.app %>/components/base/basechart.js',
          '<%= yeoman.app %>/composition/simpledatagroup.js',
          '<%= yeoman.app %>/components/axis/axis.js',
          '<%= yeoman.app %>/components/bar/bar.js',
          '<%= yeoman.app %>/components/circle/circle.js',
          '<%= yeoman.app %>/components/donut/donut.js',
          '<%= yeoman.app %>/components/line/line.js',
          '<%= yeoman.app %>/components/roundedrectangle/roundedrectangle.js',
          '<%= yeoman.app %>/components/text/text.js',
          '<%= yeoman.app %>/components/triangle/triangle.js',
          '<%= yeoman.app %>/composition/multipledatagroup.js',
          '<%= yeoman.app %>/composition/multipleinstancesmixin.js',
          '<%= yeoman.app %>/composition/axis/xyaxis.js',
          '<%= yeoman.app %>/composition/axis/yxyaxis.js',
          '<%= yeoman.app %>/composition/barchart/barchart.js',
          '<%= yeoman.app %>/composition/donutwithinnertext/donutwithinnertext.js',
          '<%= yeoman.app %>/composition/labeledtrianglechart/labeledtrianglechart.js',
          '<%= yeoman.app %>/composition/linechart/*.js',
          '<%= yeoman.app %>/composition/scatterplot/scatterplot.js',
          '<%= yeoman.app %>/utils/datavalidator/datavalidator.js',
          '<%= yeoman.app %>/utils/accessor/accessor.js',
          '<%= yeoman.app %>/api/chartinterface.js',
          '<%= yeoman.app %>/api/chartsapi.js'
        ],
        dest: '<%= yeoman.dist %>/charty.js'
      }
    },

    /** Minimify code */
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/charty.min.js': '<%= yeoman.dist %>/charty.js'
        }
      }
    }

  });

  /** Build js */
  grunt.registerTask('build-js', [
    'concat',
    'uglify'
  ]);
};