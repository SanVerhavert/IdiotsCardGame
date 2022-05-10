
import _ from "lodash";

/* function waitForPlayer
	A function waiting for player input

	TODO
*/

function waitForPlayer() {
	throw "Not yet implemented";
}

function Strictequal( N1, N2 ) {
	return N1 === N2;
}

function greaterOrEqual( N1, N2 ) {
	return N1 >= N2;
}

/* function select
	Selecting 0 one or more card from a set of given cards against dependent on a criterion (fun)

	@Param cards: array of card objects to select from
	@Param value: the cardvalue to select
	@Param fun: a function returning truthy or falsy dependent on a criterion

	@return The selected cards if any
*/

function select( cards, value, fun ) {
	var s = _.remove(  cards, function( card ) {
		return fun( card.value, value );
	} );
	return s;
}

/* function selectCard
	At the start of the game (gamePhase = 0): If player has a card in hand or faceUp that is
	equal to ´@Param value´ pick and return it.
	Not at start of game (gamePhase = 1): Take cards from your hand or faceUp that are equal
	or higer than the top card on the ´@Param disgardStack´. If the ´@Param disgardStack´ is
	empty, select the lowest card. If your hand and faceUp is empty, play a random card from
	faceDown. If you cannot select a card, take the disgardStack. return
	the selected card.

	@Param gamePhase: the phase the game is in; 0 at start of game, 1 not at start of game
	@Param drawStack: the stack to draw cards from
	@Param disgardStack; the stack of played cards
	@Param value: the value of the top card on the disgard stack; 0 if disgard stack is empty(?)

	@Return object with property selected card and disgardStack

	@SideEffects If a card is selected the hand, faceUp or faceDown is updated respectively
*/
function selectCard( gamePhase, disgardStack, value = 0 ) {
	var selected;

	if( gamePhase === 0 ) {   //start: first card played

		selected = _.concat( select( this.faceUp, value, Strictequal ), select( this.hand, value, Strictequal ) ); //play a card that is equal to value
        
		if( typeof selected === "undefined" ) {
			selected = 0;       //if no such card exists then pass
		}
	} else { //from second card
		if( disgardStack.length > 0 ) { //if there is a card in the disgardStack
			selected = _.concat(  select( this.faceUp, _.last( disgardStack ), greaterOrEqual ), select( this.hand, _.last( disgardStack ), greaterOrEqual ) ); //play a card that is equal or higher than the top card in disgardStack

			if( typeof selected === "undefined" ) {
				if( this.hand.length === 0 || this.faceUp.length === 0 ) {  //if your hand is empty and your face up is empty
				
					selected = 0;
	
					var rand = _.floor( Math.random() * 3  );
	
					selected = _.pullAt( this.faceDown, rand ); //you must play a face down card at random
				} else {    //if you cannot play a card
					this.hand.push( disgardStack );    //you must take the discard pile in hand
	
					disgardStack.length = 0;
				}
			}
		
		} else {	//if disgardStack is empty select the lowest card
			selected = _.sortBy( _.concat(  this.faceUp, this.hand ), function( c ) {
				return c.value;
			} ).shift();

			_.remove( this.faceUp, function( c ) {
				return c.value === selected.value;
			} );
			_.remove( this.hand, function( c ) {
				return c.value === selected.value;
			} );
		}
	}
	return {selected, disgardStack };
}

/* function takeCard
	takes as much cards from the ´@Param drawStack´ that are missing from the hand them to the
	hand. If the drawn card equals that of the last played card, then play it
	
	@Param drawStack: the card stack to draw from
	@Param disgardStack: the card stack containing the played cards

	@return returns an object with properties the (updated) drawStack and disgardStack

	@sideEffect updated the hand with the drawn cards if any
*/
function takeCard( drawStack, disgardStack ) {
	if( drawStack.length !== 0 && this.hand.length < 3 ) {   //if the draw pile is not empty and your hand has less than 3 cards
		var nToDrop = 3 - this.hand.length;
		
		var addCards = _.take( drawStack, 3 - this.hand.length ); //you take cards untill your hand has 3 cards
		
		//If the drawn card equals that of the last played card, then play it
		if( typeof disgardStack !== "undefined" && disgardStack.length !== 0 ) {
			disgardStack = _.concat( disgardStack, 
				_.remove( addCards, function( c ) {
					return c.value === _.last( disgardStack ).value;
				} )
			);
		}
		

		this.hand = _.concat( this.hand, addCards ); 

		drawStack =  _.drop( drawStack, nToDrop );
	}
	
	
	return { drawStack, disgardStack };
	
}

/* function createPlayer
	A function to create a new player object. Does not preform input checks.

	@Param hand: a vector of 3 card objects
	@Param faceUp: a vector of 3 card objects
	@Param faceDown: a vector of 3 card objects
	@Param real: boolean indicating if we want to make a real player or not

	@Return returns an object with 
		@Property real: boolean indicating if the object is a real player or not
		@Property hand: a vector of 3 card objects
		@Property faceUp: a vector of 3 card objects
		@Property faceDown: a vector of 3 card objects
		@Method playCard: function waitForPlayer if real is truthy or selectCard if real is falsy
		@Method takeCard: function takeCard
		
*/
export function createPlayer( hand, faceUp, faceDown, real ) {
	var playCard;

	if( real ) {
		playCard = waitForPlayer;
	} else{
		playCard = selectCard;
	}

	return {
		real,
		hand,
		faceUp,
		faceDown,
		playCard,
		takeCard
	};
}

/*Game object
    gamePhase: [0, 1] //0==start; 1==!start
    drawStack: [cards]
    disgardStack: [cards]
    init: f(nPlayers){
        IF nPlayers < 2     //minimal 2 players
            return ERR.lessThanTwoPlayers
            
        create players

        IF gamePhase>0
            gamePhase = 0

        generate a drawStack with # decks = round down nPlayers/3       //one deck of cards per 3 players (always full decks)
            //+ranks:
                //+standard ranks
                //+A's are highest
                //+2's don't matter in rank

        shuffel drawStack
        
        //each player has:
        //+3 face down cards
        //+3 face up cards (on top of the face down cards)
        //+3 cards in hand
        //+Deal happens three cards at a time
        
        for each player
            deal 3 face-down cards

        for each player
            deal 3 face-up cards
        
        for each player
            deal 3 hand cards
        }
    
    updateStack: f(cards){ //cards played by player
        IF cards.value < disgardStack[1].value AND cards.value !=2 //2's can be played on any card and any card can be played on a 2
            ERR.invalidMove
        
        IF cards.value === 10   //10's burn the pile
            clear disgardStack
        //if four of a kind are played at once or consecutively(!) the pile  burns
        ELSE 
            add cards to disgardStack
        }
*/