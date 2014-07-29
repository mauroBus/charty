/**
 * Build generator via Grunt
 */
var mountFolder = function(connect, dir) {
    return connect.static(require('path')
        .resolve(dir));
};

module.exports = function(grunt) {
    'use strict';

    /** Load all grunt tasks */
    require('matchdep')
        .filterDev('grunt-*')
        .forEach(grunt.loadNpmTasks);

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
                    '<%= yeoman.app %>/utils/datavalidator/datavalidator.js',
                    '<%= yeoman.app %>/api/chartyinit.js',
                    '<%= yeoman.app %>/api/chartynames.js',
                    '<%= yeoman.app %>/components/scales/*.js',
                    '<%= yeoman.app %>/composition/datamapper/datamapper.js',
                    '<%= yeoman.app %>/components/base/basechart.js',
                    '<%= yeoman.app %>/composition/simpledatagroup.js',
                    '<%= yeoman.app %>/components/axis/axis.js',
                    '<%= yeoman.app %>/components/bar/bar.js',
                    '<%= yeoman.app %>/components/bar/horizontalbar.js',
                    '<%= yeoman.app %>/components/bar/winlossbar.js',
                    '<%= yeoman.app %>/components/circle/circle.js',
                    '<%= yeoman.app %>/components/donut/donut.js',
                    '<%= yeoman.app %>/components/line/line.js',
                    '<%= yeoman.app %>/components/roundedrectangle/roundedrectangle.js',
                    '<%= yeoman.app %>/components/text/text.js',
                    '<%= yeoman.app %>/components/text/abovetext.js',
                    '<%= yeoman.app %>/components/text/righttext.js',
                    '<%= yeoman.app %>/components/text/winlosstext.js',
                    '<%= yeoman.app %>/components/triangle/triangle.js',
                    '<%= yeoman.app %>/composition/multipledatagroup.js',
                    '<%= yeoman.app %>/composition/multipleinstancesmixin.js',
                    '<%= yeoman.app %>/composition/axis/xyaxis.js',
                    '<%= yeoman.app %>/composition/axis/yxyaxis.js',
                    '<%= yeoman.app %>/composition/barchart/barchart.js',
                    '<%= yeoman.app %>/composition/groupedbarchart/groupedbarchart.js',
                    '<%= yeoman.app %>/composition/donutwithinnertext/donutwithinnertext.js',
                    '<%= yeoman.app %>/composition/labeledtrianglechart/labeledtrianglechart.js',
                    '<%= yeoman.app %>/composition/linechart/*.js',
                    '<%= yeoman.app %>/composition/scatterplot/scatterplot.js',
                    '<%= yeoman.app %>/utils/accessor/accessor.js',
                    '<%= yeoman.app %>/utils/events/functionevent.js',
                    '<%= yeoman.app %>/utils/events/bootstrapevent.js',
                    '<%= yeoman.app %>/utils/events/eventfactory.js',
                    '<%= yeoman.app %>/utils/events/eventmanager.js',
                    '<%= yeoman.app %>/api/chartinterface.js',
                    '<%= yeoman.app %>/api/chartyapi.js',
                    '<%= yeoman.app %>/api/charty.js',
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
        },

        /** Platojs */
        plato: {
            your_task: {
                files: {
                    'report': ['<%= yeoman.app %>/**/*.js'],
                }
            },
        },

        /** Yuidoc */
        yuidoc: {
            compile: {
                name: 'ChartyJS',
                description: 'ChartyJS Api doc',
                version: '0.5.8',
                options: {
                    paths: 'src/',
                    outdir: 'doc/'
                }
            }
        },

        /** JSHint */
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                '<%= yeoman.app %>/**/*.js'
            ]
        },

        /** JSBeautifier */
        jsbeautifier: {
            modify: {
                src: ['Gruntfile.js', '<%= yeoman.app %>/**/*.js'],
                options: {
                    config: '.jsbeautifyrc'
                }
            },
            verify: {
                src: ['Gruntfile.js', '<%= yeoman.app %>/**/*.js'],
                options: {
                    mode: 'VERIFY_ONLY',
                    config: '.jsbeautifyrc'
                }
            }
        }

    });

    /** Build js */
    grunt.registerTask('build-js', [
        'concat',
        'uglify'
    ]);

    /** Build js with plato */
    grunt.registerTask('build-js-plato', [
        'plato',
        'concat',
        'uglify'
    ]);

    /** Build js with plato and yuidoc */
    grunt.registerTask('build-js-all', [
        'plato',
        'concat',
        'uglify',
        'yuidoc'
    ]);
};
