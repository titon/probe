/**
 * @copyright	Copyright 2010-2013, The Titon Project
 * @license		http://opensource.org/licenses/bsd-license.php
 * @link		http://titon.io
 */

(function(window) {
	'use strict';

	// Exit early if lodash or underscore does not exist
	if (typeof window._ === 'undefined') {
		return;
	}

	// Mapping of lodash functions and prototypes
	var probes = [
		// Array
		[
			[Array],
			['compact', 'difference', 'drop', 'findIndex', 'first', 'flatten', 'head', 'indexOf', 'initial', 'intersection', 'last', 'lastIndexOf', 'range', 'rest', 'sortedIndex', 'tail', 'take', 'union', 'uniq', 'unique', 'unzip', 'without', 'zip']
		// Collections
		], [
			[Array, Object, String],
			['all', 'any', 'at', 'collect', 'contains', 'countBy', 'detect', 'each', 'every', 'filter', 'find', 'findWhere', 'foldl', 'foldr', 'forEach', 'groupBy', 'include', 'inject', 'invoke', 'map', 'max', 'min', 'pluck', 'reduce', 'reduceRight', 'reject', 'select', 'shuffle', 'size', 'some', 'sortBy', 'toArray', 'where']
		// Functions
		], [
			[Function],
			['bind', 'compose', 'createCallback', 'debounce', 'defer', 'delay', 'memoize', 'once', 'partial', 'partialRight', 'throttle']
		// Objects
		], [
			[Object],
			['assign', 'defaults', 'extend', 'findKey', 'forIn', 'forOwn', 'functions', 'has', 'invert', 'keys', 'merge', 'methods', 'omit', 'pairs', 'pick', 'transform', 'values']
		// Strings
		], [
			[String],
			['escape', 'unescape', 'template', 'uniqueId']
		// Numbers
		], [
			[Number],
			['times']
		// All
		], [
			[Array, Object, String, Number],
			['isEmpty', 'isEqual', 'isUndefined', 'isNull', 'toString', 'valueOf']
		]
	];

	// Loop over each collection and probe the prototype
	var a, b, c,probe, proto, func,
		_ = window._, slice = Array.prototype.slice;

	for (a = 0; probe = probes[a]; a++) {

		// Loop over each prototype
		for (b = 0; proto = probe[0][b]; b++) {

			// Loop over each function
			for (c = 0; func = probe[1][c]; c++) {

				// Skip if the function already exists on the prototype
				// We don't wont to cause collisions with built-ins or user defined
				if (proto.prototype[func] && typeof proto.prototype[func] === 'function') {
					continue;
				}

				// Extend the prototype by calling lodash in a closure
				// Prepend the "this" value to the beginning of the arguments
				// This should allow for method chaining
				proto.prototype[func] = (function(func) {
					return function() {
						var args = slice.call(arguments) || [];
							args.unshift(this);

						return _[func].apply(this, args);
					}
				})(func);
			}
		}
	}
})(window);