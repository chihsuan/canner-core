## watch usage
``` javascript
canner.watch(posts, {
    cwd: __dirname ,
    serve: __dirname + '/blog',
    returnContent: true,
    watchCallback: function (html) {
      console.log(html)
    },
    reloader: function () {
      return loadJson();
    }, 
    changeFilter: function (row, f, curr, prev) {
      // if md equals, return true
      if(path.extname(f)=='.md'){
        return (f==path.resolve(__dirname, row.data.content))
      }
    }
  })
```

## parameters
### serve
the directory you want to watch

### watchCallback
everytime we call `build` in `watch`, we'll call `watchCallback` after `build` finish

### reloader
if you give us object in `canner.watch` parameters, we'll need a `reloader` to reload the object

#### reloader example

``` javascript
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
```

## file operation filters
file operation filters are called after we reload the settings, and we'll filter the datas using the filter. we keep the data row if filter return true, else we delete the row

### how filter work
for example, this function first see if the extenstion of changed file is `.md`

if true, it will compare changed file path with the markdown file in `row.data`

``` javascript
function (row, f, curr, prev) {
  // if md equals, return true
  if(path.extname(f)=='.md'){
    return (f==path.resolve(__dirname, row.data.content))
  }
}
```

### createFilter(row, f, stat)
called when a file is created

#### parameters
*	`row` means the data row you currenly compared with
*	`f` is the filename of file created
*	`stat` is stat of file created

### changeFilter(row, f, curr, prev)
called when a file is created

#### parameters
*	`curr` is the current file stat
*	`prev` is the previous file stat

### removeFilter(row, f, stat)
called when a file is removed