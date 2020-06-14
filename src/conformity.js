const path = require("path");
const https = require("https");
const readFile = require("fs").promises.readFile;
const stripJsonComments = require("./strip-json-comments");

const TESTED_FILE = "themes/voodoo-fork-color-theme.json";
const REFERENCE_FILE =
	"https://raw.githubusercontent.com/liamsheppard/voodoo-theme/master/themes/Voodoo-color-theme.json";
// master: "https://raw.githubusercontent.com/liamsheppard/voodoo-theme/master/themes/Voodoo-color-theme.json";

const resolveFilePath = (file) => {
	try {
		return new URL(file);
	} catch (error) {
		if (error.code !== "ERR_INVALID_URL") {
			throw error;
		}

		let filepath = path.resolve(file).replace("\\", "/");

		if (!filepath.startsWith("/")) {
			filepath = "/" + filepath;
		}

		return new URL(encodeURI("file://" + filepath));
	}
};

const retrieveHttps = (url) =>
	new Promise((resolve, reject) => {
		https.get(url, (res) => {
			let body = "";
			res.setEncoding("utf8");
			res.on("data", (data) => (body += data));
			res.on("end", () => resolve(body));
			res.on("error", reject);
		});
	});

const retrieveThemeFile = (filepath) => {
	return filepath.protocol === "https:"
		? retrieveHttps(filepath)
		: readFile(filepath.pathname, "utf-8");
};

const normalizeHexColour = (colour) => {
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

async function getColorsFrom(file) {
	const filepath = resolveFilePath(file);

	if (filepath.protocol !== "file:" && filepath.protocol !== "https:") {
		throw "Only supports file and https protocols.";
	}

	const themeFile = await retrieveThemeFile(filepath);
	const themeData = JSON.parse(
		stripJsonComments(themeFile).replace(/\,(?!\s*?[\{\[\"\'\w])/g, "")
	);

	// Colors.
	let colors = Object.entries(themeData.colors).map((k) => {
		return { key: k[0], value: normalizeHexColour(k[1]) };
	});

	// Token colors.
	let tokens = [];

	themeData.tokenColors.forEach((element) => {
		let settings = {
			fontStyle: element.settings.fontStyle,
			foreground: element.settings.foreground,
		};

		if (settings.foreground != undefined) {
			settings.foreground = normalizeHexColour(settings.foreground);
		}

		if (!Array.isArray(element.scope)) {
			tokens.push({ scope: element.scope, settings: settings });
		} else {
			element.scope.forEach((scope) => {
				tokens.push({ scope: scope, settings: settings });
			});
		}
	});

	return { colors, tokens };
}

(async () => {
	// Parse the themes' sources.
	const testedColors = await getColorsFrom(TESTED_FILE).then((colors) => {
		return colors;
	});

	const referenceColors = await getColorsFrom(REFERENCE_FILE).then((colors) => {
		return colors;
	});

	// Compare.
	let logs = [];

	// Colors.
	referenceColors.colors.forEach((color) => {
		const found = testedColors.colors.find((x) => x.key == color.key);

		if (!found) {
			logs.push(["error", `\"${color.key}\" is missing from \"${TESTED_FILE}\".`]);
		} else if (found.value != color.value) {
			logs.push([
				"warn",
				`\"${color.key}\" is \"${found.value}\" instead of \"${color.value}\".`,
			]);
		}
	});

	console.log("\n# Colors");

	if (logs.length === 0) {
		console.log("The tested file conforms to the passed reference!");
	} else {
		logs.sort().forEach((log) => {
			switch (log[0]) {
				case "error":
					console.error("\x1b[30m\x1b[41m x \x1b[0m \x1b[31m%s\x1b[0m", `${log[1]}`);
					break;
				case "warn":
					console.warn("\x1b[30m\x1b[43m ! \x1b[0m \x1b[33m%s\x1b[0m", `${log[1]}`);
					break;
				default:
					console.log(`${log[1]}`);
					break;
			}
		});
	}

	// Tokens.
	logs = [];

	referenceColors.tokens.forEach((token) => {
		const found = testedColors.tokens.find((x) => x.scope == token.scope);

		if (!found) {
			logs.push(["error", `\"${token.scope}\" is missing from \"${TESTED_FILE}\".`]);
		} else {
			if (found.settings.fontStyle != token.settings.fontStyle) {
				logs.push([
					"warn",
					`\"${token.scope}\"'s font style is \"${found.settings.fontStyle}\" instead of \"${token.settings.fontStyle}\".`,
				]);
			}
			if (found.settings.foreground != token.settings.foreground) {
				logs.push([
					"warn",
					`\"${token.scope}\"'s foreground is \"${found.settings.foreground}\" instead of \"${token.settings.foreground}\".`,
				]);
			}
		}
	});

	console.log("\n# Tokens");

	if (logs.length === 0) {
		console.log("The tested file conforms to the passed reference!");
	} else {
		logs.sort().forEach((log) => {
			switch (log[0]) {
				case "error":
					console.error("\x1b[30m\x1b[41m x \x1b[0m \x1b[31m%s\x1b[0m", `${log[1]}`);
					break;
				case "warn":
					console.warn("\x1b[30m\x1b[43m ! \x1b[0m \x1b[33m%s\x1b[0m", `${log[1]}`);
					break;
				default:
					console.log(`${log[1]}`);
					break;
			}
		});
	}
})().catch(console.error);
