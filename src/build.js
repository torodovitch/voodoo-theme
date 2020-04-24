const { readFile, writeFile } = require("fs").promises;
const https = require("https");
const stripJsonComments = require("./strip-json-comments");

const THEME_COLOR_REFERENCE_URL = "https://code.visualstudio.com/api/references/theme-color";

const getApiKeys = url =>
	new Promise((resolve, reject) => {
		https.get(url, res => {
			let body = "";
			res.setEncoding("utf8");
			res.on("data", data => (body += data));
			res.on("end", () => resolve(body));
			res.on("error", reject);
		});
	});

const BUILD_PATH = "themes/voodoo-fork-color-theme.json";
const BUILD_TEST_PATH = "src/build-test.jsonc";
const THEME_SOURCE_PATH = "src/theme-src.jsonc";

const SOURCE_FILEPATH = THEME_SOURCE_PATH; // THEME_SOURCE_PATH or BUILD_TEST_PATH

async function parseSource() {
	// Parse the theme source's raw data.
	const themeFile = await readFile(SOURCE_FILEPATH, "utf-8");
	const theme = JSON.parse(stripJsonComments(themeFile));

	// Build.
	let logs = [];

	// Colors.
	const apiKeys = await getApiKeys(THEME_COLOR_REFERENCE_URL).then(body => {
		const matches = body.match(new RegExp("<li><code>.+?</code>", "g"));

		if (!matches) {
			throw new Error(
				"Couldn't find any matches with <li><code>...</code>, maybe docs have changed?"
			);
		}

		return [...matches].map(key => key.replace("<li><code>", "").replace("</code>", ""));
	});

	for (let [key, value] of Object.entries(theme.colors)) {
		if (value in theme.variables) {
			theme.colors[key] = theme.variables[value];

			if (!apiKeys.includes(key)) {
				logs.push(["warn", `'${key}' was not found in the api references, deprecated?`]);
			}
		} else {
			logs.push(["error", `'${key}' uses an invalid colour variable in 'colors'.`]);
			delete theme.colors[key];
		}
	}

	// Token colors.
	theme.tokenColors.forEach((scope, index) => {
		for (let [key, value] of Object.entries(scope.settings)) {
			if (key !== "foreground" && key !== "background") {
				continue;
			}

			if (value in theme.variables) {
				scope.settings[key] = theme.variables[value];
			} else {
				logs.push(["error", `'${scope.name}' uses an invalid variable in 'tokenColors'.`]);
				delete theme.tokenColors.splice(index, 1);
			}
		}
	});

	// Variables.
	delete theme.variables;

	return { theme, logs };
}

(async () => {
	const { theme, logs } = await parseSource();

	logs.sort().forEach(log => {
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

	await writeFile(BUILD_PATH, JSON.stringify(theme), "utf-8");
})().catch(console.error);
