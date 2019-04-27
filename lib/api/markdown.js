// markdown generater.
var async = require('async');
var Q = require('q');
let marked = require('marked');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
var fs = require('fs');
var path = require('path');

var md = function (content, dir) {
  var d = Q.defer();

  //remove meta close tag
  let origin = content.match(/(<meta[^>]*>)/gm);
  let result = content.match(/(<meta[^>]*>)/gm);
  if (result != null) {
    result.forEach((item, index) => {
      result[index] = item.replace('/', '')
    })
    for (let i = 0; i <= origin.length - 1; i++) {
      content = content.replace(origin[i], result[i]);
    }
  }

  // replace markdown divs with html-parsed markdowns

  (function () {
    if (content.search('data-markdown=') !== -1) {
      let window = new JSDOM(content).window;
      let document = window.document;
      let divElements = document.getElementsByTagName('div');
      const parser = new window.DOMParser();

      //find which element is div with markdown
      for (let index = 0; index <= divElements.length - 1; index++) {

        let path = divElements[index].getAttribute('data-markdown');

        //get content
        if (path !== null) {

          //parse markdown to HTML document
          let file = fs.readFileSync(`${dir}/${path}`, { encoding: 'utf8' });
          let parsedDocument = parser.parseFromString(marked.parse(file), `text/html`);

          //insert HTML and remove div element with markdown
          divElements[index].insertAdjacentHTML('beforebegin', parsedDocument.body.outerHTML)
          divElements[index].remove();
        }
      }
      d.resolve(`<html>${document.documentElement.innerHTML}</html>`);
    } else {

      return d.resolve(content);
    }
  }());

  return d.promise;
}


module.exports = md
