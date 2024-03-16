module.exports = function(grunt){
    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            less:{
                development:{
                    files:{
                        'dev/styles/main.css': 'src/styles/main.less'
                    }
                },
                production:{
                    options:{
                        compress: true,
                    },
                    files:{
                        'dist/main.min.css':'src/styles/main.less'
                    }
                }
            },
            watch: {
                less: {
                    files: ['src/styles**/*.less'], /* [** qlqr pasta / * qlqr arquivo] */
                    tasks: ['less:development']
                }
            },
            replace: {
                dev: {
                    options: {
                        patterns: [
                            {
                                match: 'ENDERECO_DO_CSS',
                                replacement: './styles/main.css'
                            }
                        ]
                    },
                    files: [
                        {
                            extend: true,
                            flatten: true,
                            src: ['src/index.html'],
                            dest: 'dev/'
                        }
                    ]
                },
                dist: {
                    options: {
                        patterns: [
                            {
                                match: 'ENDERECO_DO_CSS',
                                replacement: './styles/main.min.css'
                            }
                        ]
                    },
                    files: [
                        {
                            extend: true,
                            flatten: true,
                            src: ['prebuild/index.html'],
                            dest: 'dist/'
                        }
                    ]
                }
            },
            htmlmin: {
                dist: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true,
                    },
                    files: {
                        'prebuild/index.html': 'src/index.html'
                    }
                }
            }
        })



    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist']);
}