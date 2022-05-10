export const Cards = {
	Hand: [
		{
			value: 4,
			face: "H",
			img: "path/to/file"
		},
		{
			value: 10,
			face: "H",
			img: "path/to/file"
		},
		{
			value: 3,
			face: "D",
			img: "path/to/file"
		}
	],
	FaceUp:[
		{
			value: 6,
			face: "D",
			img: "path/to/file"
		},
		{ 
			value: 2,
			face: "C",
			img: "path/to/file"
		},
		{
			value: 6,
			face: "C",
			img: "path/to/file"
		}
	],
	FaceDown: [
		{ 
			value: 3,
			face: "S",
			img: "path/to/file"
		},
		{
			value: 13,
			face: "S",
			img: "path/to/file"
		},
		{
			value: 7,
			face: "S",
			img: "path/to/file"
		}
	],
	expectStart: {
		selected: [
			{
				value: 3,
				face: "D",
				img: "path/to/file"
			}
		],
		disgardStack: []
	},
	handStart: [
		{
			value: 4,
			face: "H",
			img: "path/to/file"
		},
		{
			value: 10,
			face: "H",
			img: "path/to/file"
		}
	]
};