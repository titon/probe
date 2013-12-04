module.exports = function(grunt) {
	function createBanner() {
		return "/*!\n" +
			" * Titon Probe v<%= pkg.version %>\n" +
			" * <%= pkg.copyright %> - <%= pkg.homepage %>\n" +
			" * <%= pkg.licenses[0].type %> - <%= pkg.licenses[0].url %>\n" +
			" */\n";
	}

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				browser: true,
				loopfunc: true
			},
			build: {
				src: ['src/lodash-probe.js']
			}
		},

		uglify: {
			options: {
				report: 'min',
				banner: createBanner()
			},
			build: {
				files: {
					'dist/lodash-probe.min.js': 'src/lodash-probe.js'
				}
			}
		},

		jslint: {
			src: [
				'src/lodash-probe.js'
			]
		}

	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jslint');

	// Register tasks
	grunt.registerTask('validate', ['jshint']);
	grunt.registerTask('lint', ['jslint']);
	grunt.registerTask('default', ['jshint', 'uglify']);
};