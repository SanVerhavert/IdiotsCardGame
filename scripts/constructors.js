


/*realPlayer object
    hand: [3]
    face-up: [3]
    face-down: [3]
    playCard: [cards] //set of selected cards
*/

/*botPlayer object
    //inherits realPlayer
    //TODO Before start: Possible to change face up cards with hand cards [strategy: 2's, 10's and high cards face up]
    playCard: f(gamePhase=[0,1],
                disgardStack.top=card,
                drawStack=[cards]){
        
        IF gamePhase===0        //start: first card played
            IF face-up has a 3 OR hand has a 3      //first with a three face up plays it; if there are none, the first with a three in hand plays it
                select this card
            //TODO If there aren't any three's, the same is done for fours, and so on
        ELSE IF gamePhase>0     //from second card:
            IF hand has any cardvalue >= disgardStack.top OR face-up has any cardvalue >= disgardStack.top      //play a card that is equal or higher that disgard
                select these cards
        
            IF hand has any 2's OR face-up has any 2's
                select these cards
        
            IF no selected cards        //if your hand is empty and your face up is empty
                select at random card from face-down        //you must play a face down card at random
        
        IF no selected cards
            IF gamePhase===0
                return 0
            ELSE IF gamePhase>0     //if you cannot play a card you must take the discard pile in hand
                take up disgardStack
        ELSE IF !empty game.drawstack       //if the draw pile is not empty
            draw card from game draw.stack  //you take a card untill your hand has 3 cards

        return selected cards
        }
*/

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