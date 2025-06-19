import React, {useEffect, useState} from 'react';
import {render, Text} from 'ink';
let display;
let sprites = [];

class GameObject {
    constructor(x, y, width, height, char) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.char = char
    }

    isObjectColliding(x,y,width,height) {
        return x >= this.x && y >= this.y && x + width <= this.x + this.width && y + height <= this.y + this.height
    }
}

function addSprite(...params) {
	const go = new GameObject(...params);
	sprites.push(go)
	return go
}

import Game from './game.js';

const width = 160;
const height = 40;

const generateEmptyGrid = (width, height) => {
	return Array.from({length: height}, () =>
		Array.from({length: width}, () => ' '),
	);
};

function renderGame() {
	buffer = generateEmptyGrid(width, height)

	sprites.forEach(spr => {
		for (let y = spr.y; y < spr.y + spr.height; y++) {
			for (let x = spr.x; x < spr.x + spr.width; x++) {
				if (y >= 0 && y < height && x >= 0 && x < width) {
					buffer[y][x] = spr.char;
				}
			}
		}
	})

	display()
}

var buffer = generateEmptyGrid(width, height);
const GridDisplay = () => {
	useEffect(() => {
		var loop = Game({addSprite, renderGame})
		const id = setInterval(() => loop({addSprite, renderGame}), 1000/3);
		return () => clearInterval(id);
	  }, []);
	  

	const [grid, setGrid] = useState(buffer);
	display = () => {
		setGrid(buffer.map(row => [...row]));
	};

	// Join each row's chars into a string, then join rows with newlines
	const output = grid.map(row => row.join('')).join('\n');

	return <Text>{output}</Text>;
};

render(<GridDisplay />);
