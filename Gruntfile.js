var createConfig = require('./lib/create-browserify-config');

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-usemin');

	// Configuration
	grunt.initConfig({
		clean: {
			pre: [".tmp/", "dist/"],
			post: ".tmp/"
		},
		copy: {
			html: {
				src: 'index.html',
				dest: 'dist/'
			}
		},
		useminPrepare: {
			html: 'index.html',
			options: {
				flow: {
					steps: {
						js: [
							{
								name: 'browserify',
								createConfig: createConfig
							},
							'uglifyjs'
						]
					},
					post: {}
				}
			}
		},
		usemin: {
			html: "dist/index.html"
		},
	});

	grunt.registerTask('build', [
		'clean:pre',
		'useminPrepare',
		'browserify',
		'uglify',
		'copy:html',
		'usemin',
		'clean:post',
	]);
};
