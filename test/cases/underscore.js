/**
 * @copyright   2010-2013, The Titon Project
 * @license     http://opensource.org/licenses/bsd-license.php
 * @link        http://titon.io
 */

describe('Underscore', function() {
    var expect;

    if (typeof module !== 'undefined' && module.exports) {
        expect = require('chai').expect;
    } else {
        expect = chai.expect;
    }

    it('should apply Underscore functions to the natives', function() {
        expect(Array.prototype.union).to.be.defined;
    });

    it('should allow for chaining', function() {
        var test = [1, 2, 3].union([3, 4, 5]).filter(function(v) {
            return v != 2;
        }).reverse();

        expect(test).to.deep.equal([5, 4, 3, 1]);
        expect(test.last()).to.equal(1);
    });
});