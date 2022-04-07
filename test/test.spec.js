
import chai from "chai";
import { expect } from "chai";
import lint from "mocha-eslint";
import _ from "lodash";

import { createPlayer } from "../scripts/constructors.js";

import { Deck } from "../scripts/deck.js";

import {Players,
	Cards } from "./fixtures/index.js";

describe( "testing idiots card game", function() {
	describe( "spec file", function() {
		it( "must be found", function() {
			expect( true ).to.be.true;
		} );
	} );

	lint ( ["."] );

	describe( "constructors and related objects", function() {
		describe( "createPlayer", function() {
			it( "must create a real player object with values", function() {
				var realPlayer = createPlayer( Cards.Hand, Cards.FaceUp, Cards.FaceDown, true );
				
				expect( realPlayer ).to.include( Players.realPlayer ); //object includes all correct keys and values
				expect( typeof( realPlayer.playCard ) ).to.equal( "function" ); //object includes playCard function
				expect( typeof( realPlayer.takeCard ) ).to.equal( "function" ); //object includes takeCard function
			} );
			it( "must create a bot player object with values", function() {
				var botPlayer = createPlayer( Cards.Hand, Cards.FaceUp, Cards.FaceDown, false );
				
				expect( botPlayer ).to.include( Players.botPlayer );//object includes all correct keys and values
				expect( typeof( botPlayer.playCard ) ).to.equal( "function" ); //object includes playCard function
				expect( typeof( botPlayer.takeCard ) ).to.equal( "function" ); //object includes takeCard function
			} );
			describe( "realPlayer", function() {it.skip( "should wait for input if method playCard", function() {
					//skiped because implementation and therefore output is not clear yet
				} );
				it( "should update hand if method takeCard and there is still a card in draw stack", function() {
					var realPlayer = createPlayer( Cards.Hand, Cards.FaceUp, Cards.FaceDown, true );
					var dStack, drawStack;

					dStack = drawStack = _.sampleSize( Deck, 5 );					
					
					realPlayer.hand = _.sampleSize( realPlayer.hand, 2 );
					var playerHand = _.filter( realPlayer.hand, function(c) {
						return c;
					} );

					//after needing to take 1 card
					drawStack = realPlayer.takeCard( drawStack );
					
					expect( drawStack ).to.eql( _.drop( dStack, 1 ) ); //remaining 4 in drawStack as equal to last 4 in dStack
					expect( realPlayer.hand).to.eql( _.concat( playerHand, dStack[0] ) ); //hand to include first of dStack

					playerHand = realPlayer.hand = _.sampleSize( realPlayer.hand );

					//after needing to take 2 cards
					drawStack = realPlayer.takeCard( drawStack );
					
					expect( drawStack ).to.eql( _.drop( dStack, 3 ) ); // remaining 2 in drawStack to eaqual last 2 in dStack
					expect( realPlayer.hand ).to.eql( _.concat( playerHand, _.slice( dStack, 1, 3 ) ) ); //check hand to include 2 and 3 of dStack

					realPlayer.hand = [];

					//after needing to take 3 cards (but only 2 remaining)
					drawStack = realPlayer.takeCard( drawStack );

					expect( drawStack).to.be.empty //check that drawStack is empty
					expect( realPlayer.hand ).to.eql( _.drop( dStack, 3 ) ); //check that had includes last 2 of dStack
				} );
				it.skip( "should do nothing if method takeCard and there is no card in draw stack", function() {

				} );
			} );
			describe.skip( "botPlayer", function() {
				var botPlayer = createPlayer( Cards.Hand, Cards.FaceUp, Cards.FaceDown, false );

				it( "should return correct card if method playCard at start of game", function() {
					
				} );
				it( "should return correct card or take one if method playCard [not start of game]", function() {
					//several stacks shuffels
				} );
				it( "should update hand if method takeCard and there is still a card in draw stack", function() {

				} );
				it( "should do nothing if method takeCard and there is no card in draw stack", function() {

				} );
			} );
		} );
		
	} );
} );