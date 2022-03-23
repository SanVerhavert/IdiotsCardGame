import { expect } from "chai";
import lint from "mocha-eslint";

describe( "testing idiots card game", function(){
	describe("spec file", function () {
		it("must be found", function () {
			expect(true).to.be.true;
		});
	});

	lint (["."]);
} );