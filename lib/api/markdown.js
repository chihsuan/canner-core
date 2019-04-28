// markdown generater.
const Q = require('q');
const fs = require('fs');
const marked = require('marked');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const md = function (content, dir) {
  const d = Q.defer();
  let outputHTML = content;

  // remove meta close tag
  const origin = content.match(/(<meta[^>]*>)/gm);
  const result = content.match(/(<meta[^>]*>)/gm);
  if (result !== null) {
    result.forEach((item, index) => {
      result[index] = item.replace('/', '');
    });
    origin.forEach((item, index) => {
      outputHTML = outputHTML.replace(origin[index], result[index]);
    });
  }

  // replace markdown divs with html-parsed markdowns
  (function () {
    if (outputHTML.search('data-markdown=') !== -1) {
      const { window } = { window: new JSDOM(outputHTML).window };
      const { parser } = { parser: new window.DOMParser() };
      const { document } = { document: window.document };
      const divCollection = document.getElementsByTagName('div');
      const divArray = [...divCollection];

      // find which element is div with markdown
      divArray.forEach((item, index) => {
        const path = divArray[index].getAttribute('data-markdown');
        if (path !== null) {
          // parse markdown to HTML document
          const file = fs.readFileSync(`${dir}/${path}`, { encoding: 'utf8' });
          const parsedDocument = parser.parseFromString(marked.parse(file), 'text/html');

          // insert HTML and remove div element with markdown
          divArray[index].insertAdjacentHTML('beforebegin', parsedDocument.body.outerHTML);
          divArray[index].remove();
        }
      });
      return d.resolve(`<html>${document.documentElement.innerHTML}</html>`);
    }
    return d.resolve(outputHTML);
  }());

  return d.promise;
};


module.exports = md;
