// markdown generater.
var async = require('async');
var Q = require('q');
let marked= require('marked');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var fs = require('fs');
var path = require('path');

var md = function(content, dir) {
  var d = Q.defer();

  //change meta to correct format
  let origin=content.match(/(<meta[^>]*>)/gm);
  let result=content.match(/(<meta[^>]*>)/gm);
  if(result!=null){
    result.forEach((item,index)=>{
      result[index]=item.replace("/","")
    }) 
    for(let i=0;i<=origin.length-1;i++){
      console.log(origin[i]);
      console.log(result[i])
      content=content.replace(origin[i],result[i]);
    }
  }


  (function (){
    // check if there has markdown content or not
    if(content.search("data-markdown=")!=-1){
      let window = new JSDOM(content);
      let document = window.window.document;
      let results=document.getElementsByTagName("div");
      const parser=new window.window.DOMParser();
      
      //find which element is div with markdown
      for(let item=0;item<=results.length-1;item++){
        let i=results[item].getAttribute("data-markdown");
        //get content
        if(i!=null){
          let file=fs.readFileSync(dir+'/'+i,{encoding: 'utf8'});
          
          let htmlMD=marked.parse(file);

          htmlMD=htmlMD.replace(/(\r\n|\n|\r)/gm, "");
          
          let parsedDocument=parser.parseFromString(htmlMD,`text/html`);
          

          let next=results[item].previousElementSibling;
          next.insertAdjacentHTML("afterend",parsedDocument.body.outerHTML)
          
          results[item].remove();
        }
      }
      d.resolve(`<html>${document.documentElement.innerHTML}</html>`);
    }else


    return d.resolve(content);
  }());
  //md_attr.html(content, dir, function(mdbuild) {
  //  return d.resolve(mdbuild);
  //})

  return d.promise;
}


module.exports = md
