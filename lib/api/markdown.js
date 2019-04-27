// markdown generater.
var async = require('async');
var Q = require('q');
var fs = require('fs');
var path = require('path');
const marked = require('marked');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

var md = function (content, dir) {
  var d = Q.defer();

  //remove meta close tag
  let origin = content.match(/(<meta[^>]*>)/gm);
  let result = content.match(/(<meta[^>]*>)/gm);
  if (result !== null) {
    result.forEach((item, index) => {
      result[index] = item.replace('/', '')
    });
    origin.forEach((item, index) => {
      content = content.replace(origin[index], result[index]);
    });
  }

  // replace markdown divs with html-parsed markdowns
  (function () {
    if (content.search('data-markdown=') !== -1) {
      const window = new JSDOM(content).window;
      const parser = new window.DOMParser();
      let document = window.document;
      let divCollection = document.getElementsByTagName('div');
      let divArray = [...divCollection];

      //find which element is div with markdown
      divArray.forEach((item, index) => {
        let path = divArray[index].getAttribute('data-markdown');
        if (path !== null) {

          //parse markdown to HTML document
          let file = fs.readFileSync(`${dir}/${path}`, { encoding: 'utf8' });
          let parsedDocument = parser.parseFromString(marked.parse(file), `text/html`);

          //insert HTML and remove div element with markdown
          divArray[index].insertAdjacentHTML('beforebegin', parsedDocument.body.outerHTML);
          divArray[index].remove();
        }
      });
      d.resolve(`<html>${document.documentElement.innerHTML}</html>`);
    } else {
      return d.resolve(content);
    }
  }());

  return d.promise;
}


module.exports = md
