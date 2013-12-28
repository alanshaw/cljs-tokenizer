var fs = require("fs")
  , async = require("async")
  , stream = require("stream")
  , cljsTokenize = require("../")

var fixturesDir = __dirname + "/fixtures"

fs.readdir(fixturesDir, function (er, srcs) {
  if (er) throw er

  var tasks = srcs.map(function (src) {
    return function (cb) {
      console.log("\nTokenizing", src)

      var t = cljsTokenize()
      t.on("error", cb)

      var tokenStream = new stream.Writable()

      tokenStream._writableState.objectMode = true
      tokenStream._write = function (token, enc, cb) {
        console.log(token.type + " => " + JSON.stringify(token.content))
        cb()
      }

      tokenStream.on("finish", cb)

      fs.createReadStream(fixturesDir + "/" + src).pipe(t).pipe(tokenStream)
    }
  })

  async.series(tasks, function (er) {
    if (er) throw er
    console.log("Success")
  })
})
