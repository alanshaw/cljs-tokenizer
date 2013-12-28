var cljsTokenize = require("../")

var t = cljsTokenize(function (src, token) {
  console.log(token.type + ' => ' + JSON.stringify(src))
})

process.stdin.pipe(t)