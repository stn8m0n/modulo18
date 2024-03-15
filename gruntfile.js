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
                dev:{
                    options:{
                        patterns:[ //é um array as palavras são os termos que vamos substituir
                            {
                                match: 'ENDERECO_DO_CSS', //recebe a palavra que o pluggin deve receber
                                replacement: './styles/main.css' // vai apontar para a pasta de acesso final
                            }
                        ]
                    },
                    files: [//array que vai receber
                        {
                            expand: true,
                            flatten: true,
                            scr: ['src/index.html'],//arquivo a ser subtituido
                            dest: 'dev/'
                        }
                    ]
                }
            }
        })



    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production']);
}