import JsDemoObject from "./javascript-demo";

/**
 * Returns whether the passed file path uses the .JSON extension or not.
 *
 * @param filepath The file path to check.
 */
export function isJson(filepath: string) {
	return filepath.slice(((filepath.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase() === "json";
}

/**
 * Indicates a token used in tokenized string.
 */
export enum TokenType {
	/**
	 * Paragraph text.
	 */
	Paragraph = "P",
}

export default class Lexer extends JsDemoObject {
	/**
	 * Returns a collection of a token type retrieved from the passed text
	 * content based on some lexer's rules.
	 *
	 * @param text The text to tokenize.
	 */
	public static tokenize(text: string): TokenType {
		return TokenType.Paragraph;
	}
}
