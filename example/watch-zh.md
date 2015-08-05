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
### cwd
你資料中如果有用相對路徑, 那都會從`cwd`這個路徑變數去出發

### output
output是build的路徑

### serve
你要watch哪個資料夾

### watchCallback(html)
在watch裡面, 每次build完, 就會call這個function, 變數中的`html`是build完的結果

### reloader
如果你傳一個object到`canner.watch`, 而不是一個canner.json的路徑, 那我們會不知道如何重新讀進設定, 所以我們需要一個 `reloader` 去重新讀進settings

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
file operation filters 每次有檔案更動的時候(新增, 刪除, 更改), 我們就會call這個filter, 讓使用者可以自己比較資料中每一筆row跟變動檔案的filename跟stat, 在這個filter return true, 我們才會build, return false或不回傳東西, 我們就不build

### example usage
* 例如你希望檔案大小大於10mb, 才build, 那你可以看stat去做return
* 如果你希望比較變動檔案的檔名和資料裡的某個欄位, 哪你可以去比較`f`

### how filter work
在這個範例中, 我們先看extension是不是'.md', 是的話我們就再比較變動檔案的檔案路徑`f`和`row.data.content`

``` javascript
function (row, f, curr, prev) {
  // if md equals, return true
  if(path.extname(f)=='.md'){
    return (f==path.resolve(__dirname, row.data.content))
  }
}
```

### createFilter(row, f, stat)
當某個檔案新增的時候, 就會call這個

#### parameters
*	`row` 跑到的 row
*	`f` 新增檔案的檔案名稱
*	`stat` 檔案的metadata

### changeFilter(row, f, curr, prev)
檔案變更就會call

#### parameters
*	`curr` 現在檔案的metadata
*	`prev` 變更前檔案的metadata

### removeFilter(row, f, stat)
檔案刪除會call