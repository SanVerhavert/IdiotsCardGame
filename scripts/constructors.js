
import _ from "lodash";

/*realPlayer constructor
    hand: [3]
    face-up: [3]
    face-down: [3]
    playCard: [cards] //set of selected cards
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

function select( cards, value, fun ) {
	var s = _.remove(  cards, function( card ) {
		return fun( card.value, value );
	} );
	return s;
}

function selectCard( gamePhase, drawStack, value ) {
	var selected;

	if( gamePhase === 0 ) {   //start: first card played

		selected = _.concat( select( this.faceUp, value, Strictequal ), select( this.hand, value, Strictequal ) ); //play a card that is equal to value
        
		if( typeof selected === "undefined" ) {
			selected = 0;       //if no such card exists then pass
		}
	} else { //from second card
		selected = _.concat(  select( this.faceUp, value, greaterOrEqual ), select( this.hand, value, greaterOrEqual ) ); //play a card that is equal or higher than value

		if( typeof selected === "undefined" ) {
			if( this.hand.length === 0 || this.faceUp.length === 0 ) {  //if your hand is empty and your face up is empty
            
				selected = 0;

				var rand = _.floor( Math.random() * 3  );

				selected = _.pullAt( this.faceDown, rand ); //you must play a face down card at random
			} else {    //if you cannot play a card
				this.hand.push( drawStack );    //you must take the discard pile in hand

				drawStack.length = 0;
			}
		}
	}
}

function takeSome( drawStack ) {
	if( !this.real ) {
		if( drawStack.length !== 0 && this.hand.length < 3 ) {   //if the draw pile is not empty and your hand has les than 3 cards
			this.hand.push( _.take( drawStack, 3 - this.hand.length ) );    //you take cards untill your hand has 3 cards
			drawStack = _.drop( drawStack, 3 - this.hand.length );
		}
	}
    
}

export function createPlayer( hand, faceUp, faceDown, real ) {
	var playCard, takeCard;

	if( real ) {
		playCard = waitForPlayer;
	} else{
		playCard = selectCard;

		takeCard = takeSome;
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

/*Card object
    value: INT
    face: char
    img: filename
*/

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