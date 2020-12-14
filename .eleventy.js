const moment = require('moment');
moment.locale('en');

module.exports = (function(eleventyConfig) {
    eleventyConfig.addFilter('dateIso', date => {
        return moment(date).toISOString();
      });
    eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('LL'); // E.g. May 31, 2019
    });
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/_data");
    eleventyConfig.addPassthroughCopy("src/img");
    return {
        dir: {
            output: "dist",
            input: "src",
            data: "_data",
            includes: "partials_layouts"
        }
    };
});

function extractExcerpt(article) {
    if (!article.hasOwnProperty('templateContent')) {
      console.warn('Failed to extract excerpt: Document has no property "templateContent".');
      return null;
    }
   
    let excerpt = null;
    const content = article.templateContent;
   
    // The start and end separators to try and match to extract the excerpt
    const separatorsList = [
      { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
      { start: '<p>', end: '</p>' }
    ];
   
    eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));

    separatorsList.some(separators => {
      const startPosition = content.indexOf(separators.start);
      const endPosition = content.indexOf(separators.end);
   
      if (startPosition !== -1 && endPosition !== -1) {
        excerpt = content.substring(startPosition + separators.start.length, endPosition).trim();
        return true; // Exit out of array loop on first match
      }
    });
   
    return excerpt;
  }