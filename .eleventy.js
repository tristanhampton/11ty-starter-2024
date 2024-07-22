const os = require('os');
const dumpFilter = require("@jamshop/eleventy-filter-dump");

module.exports = function (config) {
	//--- Plugins
	config.addFilter("dump", dumpFilter);

	//--- Misc Options
	// Additional files to watch for changes
	config.addWatchTarget("./eleventy/");

	//--- Adds CSS to _site
	config.addPassthroughCopy({ "src/css": "css" });

	//--- Adds JS to _site
	config.addPassthroughCopy({ "src/js": "js" });

	//--- Adds Favicons to _site
	config.addPassthroughCopy({ "src/favicons": "favicons" });

	//--- Adds images to _site
	config.addPassthroughCopy({ "src/img": "img" });

	//--- Adds fonts to _site
	config.addPassthroughCopy({ "src/fonts": "fonts" });

	//--- Determine if local or live
	config.addGlobalData('local', function () {
		const hostname = os.hostname();

		if (hostname.includes('local')) {
			return true;
		} else {
			return false;
		}
	});

	config.setBrowserSyncConfig({
		files: './_site/css/*.css'
	});

	return {
		pathPrefix: "/",
		dir: {
			input: "./src/_content/",
			output: "_site",
			includes: "../../src/_includes",
			layouts: "../../src/_layouts",
			data: "../../src/_data"
		}
	};
}