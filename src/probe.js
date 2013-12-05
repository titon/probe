/**
 * @copyright	Copyright 2010-2013, The Titon Project
 * @license		http://opensource.org/licenses/bsd-license.php
 * @link		http://titon.io
 */

(function(root) {
	'use strict';

	var vendor,
		slice = Array.prototype.slice,
		isNode = (typeof module !== 'undefined' && module.exports);

	/**
	 * Loop over each collection and extend the prototypes.
	 *
	 * @param {Object} vendor
	 * @param {Array} probes
	 */
	function mapPrototype(vendor, probes) {
		var a, b, c, probe, proto, func;

		for (a = 0; (probe = probes[a]); a++) {

			// Loop over each prototype
			for (b = 0; (proto = probe[0][b]); b++) {

				// Loop over each function
				for (c = 0; (func = probe[1][c]); c++) {

					// Skip if the function already exists on the prototype
					// We don't wont to cause collisions with built-ins or user defined
					if (!vendor[func] || proto[func] || proto.prototype[func]) {
						continue;
					}

					// Objects can only use static methods
					// Applying to the prototype disrupts object literals
					if (proto === Object) {
						proto[func] = vendor[func];
					} else {
						extendPrototype.call(this, vendor, proto, func);
					}
				}
			}
		}
	}

	/**
	 * Extend the prototype with the vendor function.
	 * Prepend the "this" value to the beginning of the arguments.
	 *
	 * @param {Object} vendor
	 * @param {Object} proto
	 * @param {Function} func
	 */
	function extendPrototype(vendor, proto, func) {
		proto.prototype[func] = function() {
			var args = slice.call(arguments) || [];
				args.unshift(this);

			return vendor[func].apply(this, args);
		};
	}

	/**
	 * Check if a node module exists.
	 *
	 * @param {Object} name
	 * @returns {bool}
	 */
	function moduleExists(name) {
		try {
			return require.resolve(name);
		} catch(e) {
			return false;
		}
	}

	/**
	 * ----------------------------------------
	 *		Lo-Dash / Underscore
	 * ----------------------------------------
	 */

	if (isNode) {
		if (moduleExists('lodash')) {
			exports._ = root._ = require('lodash');

		} else if (moduleExists('underscore')) {
			exports._ = root._ = require('underscore');
		}
	}

	if (typeof root._ !== 'undefined') {
		vendor = root._;

		// Extend with custom methods
		vendor.extend(vendor, {

			/**
			 * Empty the collection.
			 *
			 * @param {Array|Object|String} collection
			 * @returns {*}
			 */
			empty: function(collection) {
				if (_.isArray(collection)) {
					collection = [];
				} else if (_.isString(collection)) {
					collection = '';
				} else {
					collection = {};
				}

				return collection;
			},

			/**
			 * Convert a string to a camel case form by remove all non-alphanumeric characters
			 * and capitalizing the first character of each word.
			 *
			 * @param {String} string
			 * @returns {String}
			 */
			camelCase: function(string) {
				return string.replace(/\W\D/g, function(match){
					return match.charAt(1).toUpperCase();
				});
			},

			/**
			 * Capitalize the first character in all words, so long as that word follows a boundary.
			 *
			 * @param {String} string
			 * @returns {String}
			 */
			capitalize: function(string) {
				return string.replace(/\b[a-z]/g, function(match){
					return match.toUpperCase();
				});
			},

			/**
			 * Convert a camel cased or spaced out string to a slug based hyphenated form.
			 * This will remove all non-alphanumeric characters.
			 *
			 * @param {String} string
			 * @returns {String}
			 */
			slugify: function(string) {
				return string
					// Lowercase camel form
					.replace(/[A-Z]/g, function(match){
						return ' ' + match.charAt(0);
					})
					// Remove excess whitespace
					.replace(/\s{2,}/g, ' ')
					// Replace non-alphanumeric
					.replace(/[^A-Za-z0-9_-]/g, '-')
					// Trim dashes
					.replace(/^-+|-+$/, '')
					// Lowercase
					.toLowerCase();
			},

			/**
			 * Limit a number between minimum and maximum boundaries.
			 *
			 * @param {Number} number
			 * @param {Number} min
			 * @param {Number} max
			 * @returns {Number}
			 */
			limit: function(number, min, max){
				return Math.min(max, Math.max(min, number));
			},

			/**
			 * Round a number using a precision.
			 *
			 * @param {Number} number
			 * @param {Number} precision
			 * @returns {Number}
			 */
			round: function(number, precision) {
				precision = Math.pow(10, precision || 0).toFixed(precision < 0 ? -precision : 0);

				return Math.round(number * precision) / precision;
			},

			/**
			 * Convert a number to a float.
			 *
			 * @param {Number} number
			 * @returns {Number}
			 */
			toFloat: function(number) {
				return parseFloat(number);
			},

			/**
			 * Convert a float to a number.
			 *
			 * @param {Number} number
			 * @param {Number} base
			 * @returns {Number}
			 */
			toInt: function(number, base) {
				return parseInt(number, base || 10);
			}
		});

		// Mapping of functions and prototypes
		mapPrototype(vendor, [
			// Array
			[
				[Array],
				[
					'compact', 'difference', 'drop', 'findIndex', 'findLastIndex', 'first', 'flatten', 'head', 'indexOf', 'initial', 'intersection', 'last', 'lastIndexOf', 'pull',
					'range', 'remove', 'rest', 'sortedIndex', 'tail', 'take', 'union', 'uniq', 'unique', 'unzip', 'without', 'xor', 'zip', 'zipObject'
				]
			// Collections
			], [
				[Array, Object, String],
				[
					'all', 'any', 'at', 'collect', 'contains', 'countBy', 'detect', 'empty', 'each', 'eachRight', 'every', 'filter', 'find', 'findLast', 'findWhere', 'foldl', 'foldr', 'forEach', 'forEachRight',
					'groupBy', 'include', 'indexBy', 'inject', 'invoke', 'map', 'max', 'min', 'pluck', 'reduce', 'reduceRight', 'reject', 'sample', 'select', 'shuffle', 'size', 'some', 'sortBy', 'toArray', 'where',
					'constant'
				]
			// Functions
			// Unsupported: after, bindAll, bindKey, wrap
			], [
				[Function],
				[
					'bind', 'compose', 'curry', 'debounce', 'defer', 'delay', 'memoize', 'once', 'partial', 'partialRight', 'throttle',
					'createCallback'
				]
			// Objects
			// Unsupported: create
			], [
				[Object],
				[
					'assign', 'clone', 'cloneDeep', 'defaults', 'extend', 'findKey', 'findLastKey', 'forIn', 'forInRight', 'forOwn', 'forOwnRight', 'functions', 'has',
					'invert', 'keys', 'mapValues', 'merge', 'methods', 'mixin', 'omit', 'pairs', 'pick', 'property', 'result', 'transform', 'values'
				]
			// Strings
			], [
				[String],
				['escape', 'unescape', 'template', 'uniqueId', 'camelCase', 'slugify', 'capitalize']
			// Numbers
			], [
				[Number],
				['times', 'limit', 'round', 'toFloat', 'toInt', 'parseInt']
			// All
			], [
				[Array, Object, String, Number],
				['isEmpty', 'isEqual', 'isUndefined', 'isNull', 'toString', 'valueOf']
			]
		]);
	}
})(this);