var expect = require( "chai" ).expect;
var lint = require( "mocha-eslint" );

describe( "testing idiots card game", function(){
	describe("spec file", function () {
		it("must be found", function () {
			expect(true).to.be.true;
		});
	});

	lint (["."]);
} );