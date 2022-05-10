
import { Cards } from "./Cards.js";

export const Players = {
	realPlayer: {
		real: true,
		hand: Cards.Hand,
		faceUp: Cards.FaceUp,
		faceDown: Cards.FaceDown
	},
	botPlayer:{
		real: false,
		hand: Cards.Hand,
		faceUp: Cards.FaceUp,
		faceDown: Cards.FaceDown
	}
};