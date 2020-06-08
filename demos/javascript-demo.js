// This comment should be the default dark blue colour.
console.log("Hello World");

const CONST_VALUE = "some string value";

console.warn(`Formatted console warning printing the above ${CONST_VALUE}.`);

let array = [];
let other_array = [];

for (let index = 0; index < array.length; index++) {
	if (typeof array[index] === "string") {
		const element = array[index];
	}

	other_array.push(element);
}

/**
 * Updates the passed topbar state according to the passed main ui
 * object's properties.
 * @param {TopbarState} state the topbar state to update.
 * @param {*} main the main ui object.
 */
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

	/**
	 * Updates the topbar's transparency state.
	 * @param {boolean} isTransparent whether transparency should be enabled or not.
	 */
	setTransparency(isTransparent) {
		this.isTransparent = isTransparent;
	}
}

/** @namespace */
class JSDocDemoClass {
	/**
	 * Solves equations of the form a * x = b
	 * @example <caption>Example usage of method1.</caption>
	 * // returns 2
	 * globalNS.method1(5, 10);
	 * @returns {Number} Returns the value of x for the equation.
	 */
	method1(a, b) {
		return b / a;
	}

	/** @constructor */
	JSDocDemoClass() {
		/** A module. Its name is module:foo/bar.
		 * @module foo/bar
		 */
		/** The built in string object. Its name is external:String.
		 * @external String
		 */
		/** An event. Its name is module:foo/bar.event:MyEvent.
		 * @event module:foo/bar.event:MyEvent
		 */
	}

	chat = {
		/**
		 * Refer to this by {@link chat."#channel"}.
		 * @namespace
		 */
		"#channel": {
			/**
			 * Refer to this by {@link chat."#channel".open}.
			 * @type {boolean}
			 * @defaultvalue
			 */
			open: true,
			/**
			 * Internal quotes have to be escaped by backslash. This is
			 * {@link chat."#channel"."say-\"hello\""}.
			 */
			'say-"hello"': function (msg) {},
		},
	};

	/**
	 * Now we define an event in our {@link chat."#channel"} namespace.
	 * @event chat."#channel"."op:announce-motd"
	 */
}
