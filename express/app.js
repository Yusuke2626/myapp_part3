module.exports = require('./lib/express');

var experss = require('express');
var app = experss();

// ルートパスにアクセスするとHello Worldを返す
app.get("/", function(req, res) {
    res.send('Hello World');
});

// サーバ起動
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
