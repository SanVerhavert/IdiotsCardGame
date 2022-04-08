
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
			describe( "realPlayer", function() {
				it.skip( "should wait for input if method playCard", function() {
				//skiped because implementation and therefore output is not clear yet
				} );
				it( "should update hand if method takeCard and there is still a card in draw stack", function() {
					var realPlayer = createPlayer( Cards.Hand, Cards.FaceUp, Cards.FaceDown, true );
					var dStack, drawStack;

					dStack = drawStack = _.sampleSize( Deck, 5 );					
					
					realPlayer.hand = _.sampleSize( realPlayer.hand, 2 );
					var playerHand = _.filter( realPlayer.hand, function( c ) {
						return c;
					} );

					//after needing to take 1 card
					drawStack = realPlayer.takeCard( drawStack, disgardStack )[0];
					
					expect( drawStack ).to.eql( _.drop( dStack, 1 ) ); //remaining 4 in drawStack as equal to last 4 in dStack
					expect( realPlayer.hand ).to.eql( _.concat( playerHand, dStack[0] ) ); //hand to include first of dStack

					playerHand = realPlayer.hand = _.sampleSize( realPlayer.hand );

					//after needing to take 2 cards
					drawStack = realPlayer.takeCard( drawStack, disgardStack )[0];
					
					expect( drawStack ).to.eql( _.drop( dStack, 3 ) ); // remaining 2 in drawStack to eaqual last 2 in dStack
					expect( realPlayer.hand ).to.eql( _.concat( playerHand, _.slice( dStack, 1, 3 ) ) ); //check hand to include 2 and 3 of dStack

					realPlayer.hand = [];

					//after needing to take 3 cards (but only 2 remaining)
					drawStack = realPlayer.takeCard( drawStack, disgardStack )[0];

					expect( drawStack ).to.be.empty; //check that drawStack is empty
					expect( realPlayer.hand ).to.eql( _.drop( dStack, 3 ) ); //check that had includes last 2 of dStack

					//autoplay card if it is the same card as you already played
					var disgardStack = drawStack = [
						{
							value: 6,
							face: "S",
							img: "path/to/file"
						}
					];

					playerHand = realPlayer.hand = [_.sample( Cards.Hand )];
					
					var result = realPlayer.takeCard( drawStack, disgardStack );

					drawStack = result[0];

					disgardStack = result[1];

					expect( drawStack.length ).to.equal( 0 ); //check that drawStack is empty
					expect( disgardStack.length ).to.equal( 2 ); //check that there are two elements in disgardStack
					expect( realPlayer.hand ).to.eql( playerHand ); //check that hand is not changed
				} );
				it( "should do nothing if method takeCard and there is no card in draw stack", function() {
					var realPlayer = createPlayer( Cards.Hand, Cards.FaceUp, Cards.FaceDown, true );

					const playerHand = realPlayer.hand = _.sampleSize( realPlayer.hand );

					realPlayer.takeCard( [] );

					expect( realPlayer.hand ).to.eql( playerHand ); // hand to be the same as before
				} );
			} );
			describe( "botPlayer", function() {
				var botPlayer;
				
				beforeEach( function() {
					botPlayer = createPlayer( Cards.Hand, Cards.FaceUp, Cards.FaceDown, false );
				} );
				it( "should return correct card (and empty disgardStack) if method playCard at start of game", function() {
					expect( botPlayer.playCard( 0, [], 3 ) ).to.eql( Cards.expectStart ); //shoudl return correct
					expect( botPlayer.hand ).to.eql( Cards.handStart ); //hand contains the two expected cards
				} );
				it.skip( "should return correct card and disgardStack if method playCard and can play card [not start of game]", function() {
					//with disgardStack
					//one card from hand
					//two cards from hand
					//three cards from hand
					//one card from faceUp
					//two cards from faceUp
					//three cards from faceUp
					//one card from hand and one card from faceUp
					//two cards from hand and two cards from faceUp
					//three cards from hand and three cards from faceUp

					//without disgard stack
					//lowest card from hand
					//lowest card from faceUp
					//lowest card from hand and faceUp
				} );
				it.skip( "should return undefined card, take disgardStack if any and return empty disgardStack, if method playCard and cannot play card [not start of game]", function() {

				} );
				it( "should update hand if method takeCard and there is still a card in draw stack", function() {
					var dStack, drawStack, disgardStack = [];

					dStack = drawStack = _.sampleSize( Deck, 5 );					
					
					botPlayer.hand = _.sampleSize( botPlayer.hand, 2 );
					var playerHand = _.filter( botPlayer.hand, function( c ) {
						return c;
					} );

					//after needing to take 1 card
					var result = botPlayer.takeCard( drawStack, disgardStack );

					drawStack = result[0];
					
					expect( result ).to.eql( [ _.drop( dStack, 1 ), disgardStack ] ); //remaining 4 in drawStack as equal to last 4 in dStack
					expect( botPlayer.hand ).to.eql( _.concat( playerHand, dStack[0] ) ); //hand to include first of dStack

					playerHand = botPlayer.hand = _.sampleSize( botPlayer.hand );

					//after needing to take 2 cards
					result = botPlayer.takeCard( drawStack, disgardStack );

					drawStack = result[0];
					
					expect( result ).to.eql( [ _.drop( dStack, 3 ), disgardStack] ); // remaining 2 in drawStack to eaqual last 2 in dStack
					expect( botPlayer.hand ).to.eql( _.concat( playerHand, _.slice( dStack, 1, 3 ) ) ); //check hand to include 2 and 3 of dStack

					botPlayer.hand = [];

					//after needing to take 3 cards (but only 2 remaining)
					result = drawStack = botPlayer.takeCard( drawStack, disgardStack );

					expect( result ).to.eql( [[],[]] ); //check that drawStack is empty
					expect( botPlayer.hand ).to.eql( _.drop( dStack, 3 ) ); //check that had includes last 2 of dStack

					//autoplay card if it is the same card as you already played
				} );
				it( "should do nothing if method takeCard and there is no card in draw stack", function() {
					const playerHand = botPlayer.hand = _.sampleSize( botPlayer.hand );

					botPlayer.takeCard( [] );

					expect( botPlayer.hand ).to.eql( playerHand ); // hand to be the same as before
				} );
			} );
		} );
		
	} );
} );