import { expect } from "chai";
import lint from "mocha-eslint";
import { createPlayer } from "../scripts/constructors.js";

import {realPlayer, botPlayer} from "./fixtures/index.js";

describe( "testing idiots card game", function() {
	describe( "spec file", function() {
		it( "must be found", function() {
			expect( true ).to.be.true;
		} );
	} );

	lint ( ["."] );

	describe( "constructors and related objects", function() {
		it( "must create an object with values", function() {
			var newRealPlayer = createPlayer( [ 1, 2, 3 ],
				[ 4, 5, 6 ],
				[ 7, 8, 9 ],
				true );
			var newBotPlayer = createPlayer( [1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
				false );
			
			expect( newRealPlayer ).to.equal( realPlayer );
			expect( newBotPlayer ).to.equal( botPlayer );
		} );
	} );
} );