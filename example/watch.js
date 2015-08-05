var fs = require('fs');
var assert = require('assert');
var Q = require('q');
var path = require('path');
var _= require('lodash');

var canner = require('../');

posts= loadJson();
var cwd= __dirname + '/blog';
canner.watch(posts, {
    cwd: cwd,
    output: cwd,
    serve: __dirname + '/blog',
    /*returnContent: true,
    watchCallback: function (html) {
      console.log(html)
    },*/
    reloader: function () {
      return loadJson();
    }, 
    changeFilter: function (row, f, curr, prev) {
      // if md equals, return true
      if(path.extname(f)=='.md'){
        return (f==path.resolve(cwd, row.data.content));
      }else{
        return true;
      }
    }
  })
  .done(function(html) {
    console.log(html)
  }, function(err) {
    console.log(err);
  })

function loadJson () {
  var obj = JSON.parse(fs.readFileSync(__dirname + '/blog/blog-multi.json', 'utf8'));
  var posts = obj.posts;
  var post_layout = obj.post_settings.layout;
  var post_root_path = obj.post_settings.path;

  if(!_.isArray(posts))
      posts = [posts];

  posts = _.map(posts, function(post) {
      var post_date = post.date;
      var post_url = post.url_name + '.html';
      var file_path = generatePath(post_root_path, post_date, post_url);

      var canner_obj = {
        layout: post_layout,
        filename: file_path,
        data: post
      };

      return canner_obj;
    })
  return posts
}

function generatePath(root, date, url_name) {

  // building the post path
  var date_reg = /(\d{4}\/\d{2}\/\d{2})\s+(\d{2}):(\d{2}):(\d{2})/g;
  var parse_d = date_reg.exec(date)

  if(parse_d) {
    var day = parse_d[1];

    var gen_path = path.join(root, day, url_name)
    return gen_path;
  }else {
    // date parse error
    throw new Error('Please check your date strings, format should be like "2015/08/03 22:07:39"')
  }
}
