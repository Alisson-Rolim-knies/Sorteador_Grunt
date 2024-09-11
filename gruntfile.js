module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {  // configurando plugin do less
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production: {
                options: {
                    compress: true // Removi a vírgula extra aqui
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        }, // configurando plugin do watch que observa e atualiza o projeto automaticamente 
        watch: {
            less: {
                files: ['src/styles/**/*.less'], // Removi a vírgula extra aqui
                tasks: ['less:development'],
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        }, // aqui está fazendo com que o html aponte para o ambiente de desenvolvimento
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',  // O QUE PROCURA 
                            replacement: './styles/main.css' // O QUE ACHA E TROCA
                        },
                        {
                            match: 'ENDERECO_DO_JS',  // O QUE PROCURA 
                            replacement: '../src/scripts/main.js' // O QUE ACHA E TROCA
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
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
                            match: 'ENDERECO_DO_CSS',  // O QUE PROCURA 
                            replacement: './styles/main.min.css' // O QUE ACHA E TROCA
                        },
                        {
                            match: 'ENDERECO_DO_JS',  // O QUE PROCURA 
                            replacement: './scripts/main.min.js' // O QUE ACHA E TROCA
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
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
                    removeComments: true, // apaga qualquer comentário no html
                    collapseWhitespace: true // apaga qualquer espaço no html
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': ['src/scripts/main.js']
                }
            }
        }

    });

    // carregando plugins
    grunt.loadNpmTasks('grunt-contrib-less'); 
    grunt.loadNpmTasks('grunt-contrib-watch'); 
    grunt.loadNpmTasks('grunt-replace'); 
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); 
    grunt.loadNpmTasks('grunt-contrib-clean'); 
    grunt.loadNpmTasks('grunt-contrib-uglify'); 

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean','uglify']);
};

