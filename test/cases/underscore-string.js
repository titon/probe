/**
 * @copyright   2010-2013, The Titon Project
 * @license     http://opensource.org/licenses/bsd-license.php
 * @link        http://titon.io
 */

describe('Underscore.String', function() {
    var expect;

    if (typeof module !== 'undefined' && module.exports) {
        expect = require('chai').expect;
    } else {
        expect = chai.expect;
    }

    it('should apply Underscore.String functions to the natives', function() {
        expect(String.prototype._swapCase).to.be.defined;
    });

    it('should allow for chaining', function() {
        var test = 'Titon Probe'._swapCase()._insert(6, '- ');

        expect(test).to.equal('tITON - pROBE');
        expect('titon-probe'._classify()).to.equal('TitonProbe');
    });
});