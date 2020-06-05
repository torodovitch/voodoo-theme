// This comment should be the default dark blue colour.
console.log("Hello World");

const CONST_VALUE = "some string value";

console.warn(`Formatted console warning printing the above ${CONST_VALUE}.`);

let foo = bar;

for (let index = 0; index < array.length; index++) {
	const element = array[index];
}

export default class JsDemoObject {
	normalizeHexColour = (colour) => {
		if (/^#[a-f0-9]{3}$/gi.test(colour)) {
			let r = colour[1] + colour[1];
			let g = colour[2] + colour[2];
			let b = colour[3] + colour[3];
			return `#${r}${g}${b}ff`.toLowerCase();
		}

		if (/^#[a-f0-9]{6}$/gi.test(colour)) {
			return `${colour}ff`.toLowerCase();
		}

		if (/^#[a-f0-9]{4}$/gi.test(colour)) {
			let r = colour[1] + colour[1];
			let g = colour[2] + colour[2];
			let b = colour[3] + colour[3];
			let a = colour[4] + colour[4];
			return `#${r}${g}${b}${a}`.toLowerCase();
		}

		return colour.toLowerCase();
	};
}
