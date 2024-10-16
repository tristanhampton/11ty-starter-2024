import os from 'os';

export default function(eleventyConfig) {
	// 11ty uses gitignore to ignore watching files. Disable this.
	eleventyConfig.setUseGitIgnore(false);

	eleventyConfig.setQuietMode(true);

	// We're setting 11ty to build when scss/js is updated, but we want a delay so that the assets have time to build
	eleventyConfig.setWatchThrottleWaitTime(120);

	//--- Plugins


	//--- Misc Options
	// Additional files to watch for changes
	eleventyConfig.addWatchTarget("src/scss/**/*.scss");
	eleventyConfig.addWatchTarget("src/js/**/*.js");

	//--- Adds CSS/JS to _site
	eleventyConfig.addPassthroughCopy({ "_dist/main.css": "css/main.css" });
	eleventyConfig.addPassthroughCopy({ "_dist/main.js": "js/main.js" });

	//--- Adds Favicons to _site
	eleventyConfig.addPassthroughCopy({ "src/favicons": "favicons" });

	//--- Adds images to _site
	eleventyConfig.addPassthroughCopy({ "src/img": "img" });

	//--- Adds fonts to _site
	eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });

	eleventyConfig.addShortcode("youtube", (videoURL, title) => {
		const url = new URL(videoURL);
		const id = url.searchParams.get("v");
		return `
			<iframe class="yt-shortcode" src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video player${title ? ` for ${title}` : ""}" frameborder="0" allowfullscreen></iframe>`;
	});

	eleventyConfig.addShortcode('galleryItem', (img, caption, galleryID) => {
		return `<a class="gallery__item" href="${img}" data-fancybox="${galleryID}" data-caption="${caption}"><img src="${img}"></a> `;
	});

	//--- Determine if local or live
	eleventyConfig.addGlobalData('local', function () {
		const hostname = os.hostname();

		if (hostname.includes('local')) {
			return true;
		} else {
			return false;
		}
	});

	return {
		dir: {
			input: "./src/_content",
			output: "_site",
			layouts: "../_layouts",
			includes: "../_includes",
			data: "../_data"
		}
	}
}