var compression = require('compression')();

//
// Helper for connect. The idea behind it is to load a middle with a given
// directory.
//
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    'use strict';

    /** Load all grunt tasks */
    require('matchdep')
        .filterDev('grunt-*')
        .forEach(grunt.loadNpmTasks);

    /** General settings **/
    var config = {
        SRC: 'src',
        DIST: 'dist',
        GH_PAGES: 'gh-pages',
        TMP: '.tmp',
        TMP_CHARTY: '<%= config.TMP %>/examples/assets/vendor/<%= pkg.name %>/dist',
        JS_TREE: [
            '<%= config.SRC %>/utils/datavalidator/datavalidator.js',
            '<%= config.SRC %>/api/chartyinit.js',
            '<%= config.SRC %>/api/chartynames.js',
            '<%= config.SRC %>/components/scales/*.js',
            '<%= config.SRC %>/composition/datamapper/datamapper.js',
            '<%= config.SRC %>/components/base/basechart.js',
            '<%= config.SRC %>/composition/simpledatagroup.js',
            '<%= config.SRC %>/components/axis/axis.js',
            '<%= config.SRC %>/components/bar/bar.js',
            '<%= config.SRC %>/components/bar/horizontalbar.js',
            '<%= config.SRC %>/components/bar/winlossbar.js',
            '<%= config.SRC %>/components/circle/circle.js',
            '<%= config.SRC %>/components/donut/donut.js',
            '<%= config.SRC %>/components/line/line.js',
            '<%= config.SRC %>/components/roundedrectangle/roundedrectangle.js',
            '<%= config.SRC %>/components/text/text.js',
            '<%= config.SRC %>/components/text/abovetext.js',
            '<%= config.SRC %>/components/text/righttext.js',
            '<%= config.SRC %>/components/text/winlosstext.js',
            '<%= config.SRC %>/components/text/labeledtext.js',
            '<%= config.SRC %>/components/triangle/triangle.js',
            '<%= config.SRC %>/composition/multipledatagroup.js',
            '<%= config.SRC %>/composition/multipleinstancesmixin.js',
            '<%= config.SRC %>/composition/axis/xyaxis.js',
            '<%= config.SRC %>/composition/axis/yxyaxis.js',
            '<%= config.SRC %>/composition/barchart/barchart.js',
            '<%= config.SRC %>/composition/groupedbarchart/groupedbarchart.js',
            '<%= config.SRC %>/composition/donutwithinnertext/donutwithinnertext.js',
            '<%= config.SRC %>/composition/labeledtrianglechart/labeledtrianglechart.js',
            '<%= config.SRC %>/composition/linechart/*.js',
            '<%= config.SRC %>/composition/scatterplot/scatterplot.js',
            '<%= config.SRC %>/utils/accessor/accessor.js',
            '<%= config.SRC %>/utils/events/functionevent.js',
            '<%= config.SRC %>/utils/events/bootstrapevent.js',
            '<%= config.SRC %>/utils/events/eventfactory.js',
            '<%= config.SRC %>/utils/events/eventmanager.js',
            '<%= config.SRC %>/api/chartinterface.js',
            '<%= config.SRC %>/api/chartyapi.js',
            '<%= config.SRC %>/api/charty.js'
        ]
    };

    grunt.initConfig({
        config: config,
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapStyle: 'embed',
                    banner: '/*! <%= pkg.name %> - <%= grunt.template.today("isoDateTime") %> */\n',
                },
                files: {
                    '<%= config.TMP_CHARTY %>/<%= pkg.name %>.min.js' : config.JS_TREE
                }
            }
        },

        uglify: {
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("isoDateTime") %> */',
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    mangle: false
                },
                files: {
                    '<%= config.DIST %>/<%= pkg.name %>.min.js': config.JS_TREE
                }
            }
        },

        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                options: {
                    paths: 'src/',
                    outdir: 'gh-pages/doc/'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            default: config.JS_TREE
        },

        jsbeautifier: {
            modify: {
                src: config.JS_TREE,
                options: {
                    config: '.jsbeautifyrc'
                }
            },
            verify: {
                src: config.JS_TREE,
                options: {
                    mode: 'VERIFY_ONLY',
                    config: '.jsbeautifyrc'
                }
            }
        },

        connect: {
            default: {
                options: {
                    port: 9000,
                    middleware: function(connect, options) {
                        return [
                            compression,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'gh-pages')
                        ];
                    }
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            html: {
                files: [
                    '<%= config.GH_PAGES %>/examples/*.html'
                ]
            },
            js: {
                files: config.JS_TREE,
                tasks: ['reload']
            }
        }
    });

    grunt.registerTask('server', [
        'connect',
        'watch'
    ]);

    grunt.registerTask('reload', [
        'concat'
    ]);

    grunt.registerTask('build', [
        'uglify'
    ]);

    grunt.registerTask('release', [
        'build',
        'yuidoc'
    ]);
};
