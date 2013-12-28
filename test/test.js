var fs = require("fs")
  , async = require("async")
  , cljsTokenize = require("../")

var fixturesDir = __dirname + "/fixtures"

fs.readdir(fixturesDir, function (er, srcs) {
  if (er) throw er

  var tasks = srcs.map(function (src) {
    return function (cb) {
      console.log("\nTokenizing", src)

      var t = cljsTokenize()

      t.on("token", function (token) {
        console.log(token.type + " => " + JSON.stringify(token.content))
      })
      t.on("error", cb)
      t.on("finish", cb)

      fs.createReadStream(fixturesDir + "/" + src).pipe(t)
    }
  })

  async.series(tasks, function (er) {
    if (er) throw er
    console.log("Success")
  })
})
