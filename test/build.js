var fs = require('fs');
var assert = require('assert');
var Q = require('q');
var path = require('path');
var exec = require('child_process').exec;
var jsdom = require("jsdom");
const {JSDOM} = jsdom;
var _= require('lodash');
var canner = require('../index');

rm_html = exec('rm ./test/**/**/index.html', function(err) {
  if (err)
    console.error(err)
})


describe('build in handlebars canner.json', function() {
  it("should build canner.json to html", function(done) {
    canner.build(__dirname + '/hbs/original/canner.json', {
        output: __dirname + '/hbs/original'
      })
      .then(function() {
        var output = fs.readFileSync(__dirname + '/hbs/original/index.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');
        var result = fs.readFileSync(__dirname + '/result/hbs_original.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');

        assert.equal(output, result);
        done();
      })
      .catch(function(err) {
        console.error(err)
      })
  })

  it("should build canner.json to html with hbs helper", function(done) {
    canner.build(__dirname + '/hbs/helper/canner.json', {
        output: __dirname + '/hbs/helper'
      })
      .then(function() {
        var output = fs.readFileSync(__dirname + '/hbs/helper/index.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');
        var result = fs.readFileSync(__dirname + '/result/hbs_helper.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');

        assert.equal(output, result);
        done();
      })
      .catch(function(err) {
        console.error(err);
      })
  })

  it("should build canner.yaml to html", function(done) {
    canner.build(__dirname + '/hbs/yaml/canner.yaml', {
        output: __dirname + '/hbs/yaml'
      })
      .then(function() {
        var output = fs.readFileSync(__dirname + '/hbs/yaml/index.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');
        var result = fs.readFileSync(__dirname + '/result/hbs_yaml.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');

        assert.equal(output, result);
        done();
      })
      .catch(function(err) {
        console.error(err);
      })
  })
})

describe('build in nunjucks canner.json', function() {
  it("should build canner.json to html", function(done) {
    canner.build(__dirname + '/nunjucks/original/canner.json', {
        output: __dirname + '/nunjucks/original',
        engine: 'nunjucks'
      })
      .then(function() {
        var output = fs.readFileSync(__dirname + '/nunjucks/original/index.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');
        var result = fs.readFileSync(__dirname + '/result/nun_original.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');

        assert.equal(output, result);
        done();
      })
      .catch(function(err) {
        console.error(err)
      })
  })


  it("should build canner.yaml to html", function(done) {
    canner.build(__dirname + '/nunjucks/yaml/canner.yaml', {
        output: __dirname + '/nunjucks/yaml',
        engine: 'nunjucks'
      })
      .then(function() {
        var output = fs.readFileSync(__dirname + '/nunjucks/yaml/index.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');
        var result = fs.readFileSync(__dirname + '/result/nun_yaml.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');

        assert.equal(output, result);
        done();
      })
      .catch(function(err) {
        console.error(err);
      })
  })
})

describe('build in jade canner.json', function() {
  it("should build canner.json to html", function(done) {
    canner.build(__dirname + '/jade/original/canner.json', {
        output: __dirname + '/jade/original',
        engine: 'jade'
      })
      .then(function() {
        var output = fs.readFileSync(__dirname + '/jade/original/index.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');
        var result = fs.readFileSync(__dirname + '/result/jade_original.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');

        assert.equal(output, result);
        done();
      })
      .catch(function(err) {
        console.error(err)
      })
  })


  it("should build canner.yaml to html", function(done) {
    canner.build(__dirname + '/jade/yaml/canner.yaml', {
        output: __dirname + '/jade/yaml',
        engine: 'jade'
      })
      .then(function() {
        var output = fs.readFileSync(__dirname + '/jade/yaml/index.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');
        var result = fs.readFileSync(__dirname + '/result/jade_yaml.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');

        assert.equal(output, result);
        done();
      })
      .catch(function(err) {
        console.error(err);
      })
  })
})

describe('build in swig canner.json', function() {
  it("should build canner.json to html", function(done) {
    canner.build(__dirname + '/swig/original/canner.json', {
        output: __dirname + '/swig/original',
        engine: 'swig'
      })
      .then(function() {
        var output = fs.readFileSync(__dirname + '/swig/original/index.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');
        var result = fs.readFileSync(__dirname + '/result/swig_original.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');

        assert.equal(output, result);
        done();
      })
      .catch(function(err) {
        console.error(err)
      })
  })


  it("should build canner.yaml to html", function(done) {
    canner.build(__dirname + '/swig/yaml/canner.yaml', {
        output: __dirname + '/swig/yaml',
        engine: 'swig'
      })
      .then(function() {
        var output = fs.readFileSync(__dirname + '/swig/yaml/index.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');
        var result = fs.readFileSync(__dirname + '/result/swig_yaml.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');

        assert.equal(output, result);
        done();
      })
      .catch(function(err) {
        console.error(err);
      })
  })
})

describe('build in mustache canner.json', function() {
  it("should build canner.json to html", function(done) {
    canner.build(__dirname + '/mustache/original/canner.json', {
        output: __dirname + '/mustache/original',
        engine: 'mustache'
      })
      .then(function() {
        var output = fs.readFileSync(__dirname + '/mustache/original/index.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');
        var result = fs.readFileSync(__dirname + '/result/mus.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');

        assert.equal(output, result);
        done();
      })
      .catch(function(err) {
        console.error(err)
      })
  })


  it("should build canner.yaml to html", function(done) {
    canner.build(__dirname + '/mustache/yaml/canner.yaml', {
        output: __dirname + '/mustache/yaml',
        engine: 'mustache'
      })
      .then(function() {
        var output = fs.readFileSync(__dirname + '/mustache/yaml/index.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');
        var result = fs.readFileSync(__dirname + '/result/mus.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');

        assert.equal(output, result);
        done();
      })
      .catch(function(err) {
        console.error(err);
      })
  })
})

describe('build in dust canner.json', function() {
  it("should build canner.json to html", function(done) {
    canner.build(__dirname + '/dust/original/canner.json', {
        output: __dirname + '/dust/original',
        engine: 'dust'
      })
      .then(function() {
        var output = fs.readFileSync(__dirname + '/dust/original/index.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');
        var result = fs.readFileSync(__dirname + '/result/dust.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');

        assert.equal(output, result);
        done();
      })
      .catch(function(err) {
        console.error(err)
      })
  })


  it("should build canner.yaml to html", function(done) {
    canner.build(__dirname + '/dust/yaml/canner.yaml', {
        output: __dirname + '/dust/yaml',
        engine: 'dust'
      })
      .then(function() {
        var output = fs.readFileSync(__dirname + '/dust/yaml/index.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');
        var result = fs.readFileSync(__dirname + '/result/dust.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');

        assert.equal(output, result);
        done();
      })
      .catch(function(err) {
        console.error(err);
      })
  })
})

describe('build using object', function() {
  it('should save to file', function(done) {
    var output = __dirname + '/hbs/original';
    canner.build(__dirname + '/hbs/original/canner.json', {
        output: output,
        data: {
          "title": "wwwy3y3",
          "items": "item wwwy3y3",
        }
      })
      .done(function() {
        var result = fs.readFileSync(__dirname + '/result/hbs_data_input.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');
        var html = fs.readFileSync(path.resolve(output, './index.html'), 'utf8').replace(/\s+/g, '');
        assert.equal(html, result);
        done();
      }, function(err) {
        console.log(err);
      })
  })

  it('should return html', function(done) {
    canner.build(__dirname + '/hbs/original/canner.json', {
        output: __dirname + '/hbs/original',
        data: {
          "title": "wwwy3y3",
          "items": "item wwwy3y3"
        },
        returnContent: true
      })
      .done(function(html) {
        var result = fs.readFileSync(__dirname + '/result/hbs_data_input.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');

        assert.equal(html[0].replace(/\s+/g, ''), result);
        done();
      }, function(err) {
        console.log(err);
      })
  })

  it('should use object to return content', function(done) {
    var obj = JSON.parse(fs.readFileSync(__dirname + '/hbs/original/canner.json', 'utf8'));
    canner.build(obj, {
        cwd: __dirname + '/hbs/original',
        output: __dirname + '/hbs/original',
        data: {
          "title": "wwwy3y3",
          "items": "item wwwy3y3"
        },
        returnContent: true
      })
      .done(function(html) {
        var result = fs.readFileSync(__dirname + '/result/hbs_data_input.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');

        assert.equal(html[0].replace(/\s+/g, ''), result);
        done();
      }, function(err) {
        console.log(err);
      })
  })

  it('should run beforeSave', function(done) {
    var output = __dirname + '/hbs/original';
    var obj = JSON.parse(fs.readFileSync(__dirname + '/hbs/original/canner.json', 'utf8'));
    canner.build(obj, {
        cwd: __dirname + '/hbs/original',
        output: output,
        data: {
          "title": "wwwy3y3",
          "items": "item wwwy3y3"
        },
        beforeSave: function(build, ok) {
          var window = new JSDOM(build);
          const document = window.window.document;
          
          let scriptElement=document.createElement("script");
          scriptElement.setAttribute("class","jsdom");
          scriptElement.setAttribute("src","http://code.jquery.com/jquery-2.1.1.js");
          document.body.appendChild(scriptElement);

          let TextElement=document.createElement("div");
          TextElement.setAttribute("class","testing");
          TextElement.innerHTML=`Hello World, It works`;
          document.body.appendChild(TextElement);
          //document.body.append(`<scriptclass="jsdom"src="http://code.jquery.com/jquery-2.1.1.js">`)
          //document.body.append('<div class="testing">Hello World, It works</div>');
          //jsdom.jQueryify(window, "http://code.jquery.com/jquery-2.1.1.js", function() {
          //  window.$("body").append('<div class="testing">Hello World, It works</div>');
            ok(document.documentElement.outerHTML);
          //});
        }
      })
      .done(function() {
        var result = fs.readFileSync(__dirname + '/result/hbs_jsdom.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');
        var html = fs.readFileSync(path.resolve(output, './index.html'), 'utf8').replace(/\s+/g, '');
        assert.equal(html, result);
        done();
      }, function(err) {
        console.log(err);
      })
  })


  it('should only build the datas pass filter function, using blog datas', function(done) {
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


    canner.build(posts, {
        cwd: __dirname ,
        returnContent: true,
        filter: function (row) {
          return row.data.url_name== 'test-post';
        }
      })
      .done(function(html) {

        var result = fs.readFileSync(__dirname + '/blog/opendata/post/2015/08/03/test-post.html', {
          encoding: 'utf8'
        }).replace(/\s+/g, '');

        assert.equal(html[0].replace(/\s+/g, ''), result);
        done();
      }, function(err) {
        console.log(err);
      })
  })


  it('should pass hbs options', function(done) {
    var obj = JSON.parse(fs.readFileSync(__dirname + '/hbs/original/canner.json', 'utf8'));
    canner.build(obj, {
        cwd: __dirname + '/hbs/original',
        output: __dirname + '/hbs/original',
        data: {
          "title": "wwwy3y3",
          "items": "<br>wwwy3y3<br>"
        },
        hbs: {
          noEscape: true
        },
        returnContent: true
      })
      .done(function(html) {
        assert.notEqual(html[0].indexOf('<br>'), -1);
        done();
      }, function(err) {
        console.log(err);
      })
  })
})


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
