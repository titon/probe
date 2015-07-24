/**
 * @copyright   2010-2013, The Titon Project
 * @license     http://opensource.org/licenses/bsd-license.php
 * @link        http://titon.io
 */

describe('Probe', function() {
    var expect, probe,
        vendor = {
            foo: function() {},
            pass: function(a, b) {
                return a * b;
            },
            chain: function(a, b) {
                return a + b;
            }
        };

    if (typeof module !== 'undefined' && module.exports) {
        expect = require('chai').expect;
        probe = require('../../src/probe');
    } else {
        expect = chai.expect;
        probe = window.Probe;
    }

    var prefix = probe.methodPrefix,
        foo = prefix + 'foo',
        bar = prefix + 'bar';

    it('should extend the prototype with vendor function', function() {        
        expect(Number.prototype[foo]).to.be.an('undefined');
        expect(Number.prototype[bar]).to.be.an('undefined');

        probe.mapPrototypes(vendor, [Number], ['foo', 'bar']);

        expect(Number.prototype[foo]).to.be.an('function');
        expect(Number.prototype[bar]).to.be.an('undefined');
    });

    it('should not overwrite previous functions with the same name', function() {
        var string = {};
        string[prefix + 'indexOf'] = function(str, char) {
            return 1337;
        };

        probe.mapPrototypes(string, [String], ['indexOf']);

        expect('Probe'.indexOf('r')).to.equal(1);
    });

    it('should not apply to the Object prototype', function() {
        expect(Object[foo]).to.be.an('undefined');
        expect(Object.prototype[foo]).to.be.an('undefined');

        probe.mapPrototypes(vendor, [Object], ['foo']);

        expect(Object[foo]).to.be.an('function');
        expect(Object.prototype[foo]).to.be.an('undefined');
    });

    it('should pass the type as the first argument', function() {
        probe.mapPrototypes(vendor, [Number], ['pass']);

        expect((10)[prefix + 'pass'](22)).to.equal(220);
    });

    it('should allow for chaining', function() {
        probe.mapPrototypes(vendor, [Number], ['chain']);

        expect((5)[prefix + 'pass'](8)[prefix + 'chain'](12)).to.equal(52);
    });
});