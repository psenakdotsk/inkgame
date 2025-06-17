import React, {useEffect, useState} from 'react';
import {render, Text} from 'ink';
let display;
let sprites = [];

import GameObject from './objects';
function addSprite(...params) {
	const go = new GameObject(...params);
	sprites.push(go)
	return go
}

import Game from './game';

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
		Game({addSprite, renderGame});
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
