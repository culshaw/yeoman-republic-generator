'use strict'

var path		= require('path');
var generator 	= require('yeoman-generator');
var util    	= require('util');

// Documentation: https://github.com/yeoman/generator/wiki/base

var Generator = module.exports = function Generator(args, options) {
	generator.Base.apply(this, arguments);
	// this.option('flag', { desc: 'Desc for flag', ...})
	// this.argument('filename', { desc: 'Desc for filename argument', ...})

	this.option('format', {
		desc: 'Select one of css/sass/scss for the bs format?'
	});

	this.format = options.format;
};

util.inherits(Generator, generator.Base);

Generator.prototype.askFor = function askFor(argument) {
	if(this.format) { 
		// Skip if already set.
		return false;
	}

	var cb = this.async(),
		formats = ['css', 'sass', 'scss'],
		prompts = [{
			name: 'format',
			message: 'In what format do you want the bs stylesheets?',
			defaults: formats.join('/')
		}];

	this.format = formats[0]

	this.prompt(prompts, function(err, props) {
		if(err) {
			return this.emit('error', err);
		}

		formats.forEach(function(opt) {
			if((new RegExp(opt, 'i')).test(props.format)) {
				this.format = opt;
			}
		}, this)

		cb();
	}.bind(this);
};

Generator.prototype.bootstrapFiles = function bootstrapFiles() {

	var packages = {
		css: 'boostrap.css',
		sass: 'sass-bootstrap',
		less: 'bootstrap'
	};

	var prompts = [{
		name: 'bs',
		message: 'This is some bs message, we aren\'t installing bower packages',
		defaults: ''
	}];

	this.prompt(prompts, function() {
		return false;
	})

	return false;

	//this.bowerInstall(packages[this.format]);
};

// Copies the entire template directory (with `.`, meaning the
// templates/ root) to the specified location
Generator.prototype.scaffold = function scaffold() {
	this.directory('.', 'place/to/generate');
};
