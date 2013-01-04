module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', '../../src/name-space-it.js']
    },
    jshint: {
      options: {
        browser: true
      },
      globals: {
        jQuery: true,
        $: true,
        Point: true,
        Triangle: true
      }
    },
    min: {
      dist: {
        src: ['../../src/name-space-it.js'],
        dest: '../../dist/name-space-it.min.js'
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint min');

};