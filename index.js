var Tokenizer = require("tokenizer")

module.exports = function (cb) {
  var t = new Tokenizer(cb)

  t.addRule(/^:[\w=+\-*&?!$%|<>\./]*$/, "keyword")
  t.addRule(/^[A-Za-z_=+\-*&?!$%|<>\./][\w=+\-*&?!$%|<>\./]*$/, "symbol")

  t.addRule(/^;[^\n]*$/, "line comment")

  t.addRule(/^\($/, "open paren")
  t.addRule(/^\)$/, "close paren")
  t.addRule(/^\[$/, "open square")
  t.addRule(/^\]$/, "close square")
  t.addRule(/^{$/, "open curly")
  t.addRule(/^}$/, "close curly")

  t.addRule(/^(#|'|\^|@)$/, "operator")

  t.addRule(/^"([^"]|\\")*"?$/, "string")
  t.addRule(/^\\[A-Za-z0-9]*$/, "character")
  t.addRule(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/, "number")
  t.addRule(Tokenizer.whitespace)

  return t
}