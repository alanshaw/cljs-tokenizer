var Tokenizer = require("tokenizer")

module.exports = function (cb) {
  var t = new Tokenizer(cb)

  t.addRule(/^:[\w=+\-*&?!$%|<>\./]*$/, "keyword")
  t.addRule(/^[A-Za-z_=+\-*&?!$%|<>\./][\w=+\-*&?!$%|<>\./]*$/, "symbol")

  t.addRule(/^\($/, "open paren")
  t.addRule(/^\)$/, "close paren")
  t.addRule(/^\[$/, "open square")
  t.addRule(/^\]$/, "close square")
  t.addRule(/^{$/, "open curly")
  t.addRule(/^}$/, "close curly")

  // Macro characters http://clojure.org/reader#toc2
  t.addRule(/^'$/, "quote")
  t.addRule(/^`$/, "syntax-quote")
  t.addRule(/^\\[A-Za-z0-9]*$/, "character")
  t.addRule(/^;[^\n]*$/, "comment")
  t.addRule(/^@$/, "deref")
  t.addRule(/^\^$/, "metadata")
  t.addRule(/^#$/, "dispatch")

  t.addRule(/^"([^"]|\\")*"?$/, "string")
  t.addRule(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/, "number")

  t.addRule(Tokenizer.whitespace)

  return t
}