var Tokenizer = require("tokenizer")

module.exports = function (cb) {
  var t = new Tokenizer(cb)

  t.addRule(/^::([A-Za-z_=+\-*&?!$%|<>][A-Za-z0-9_=+\-*&?!$%|<>]*)$/, "namespace keyword")
  t.addRule(/^:([A-Za-z_=+\-*&?!$%|<>][A-Za-z0-9_=+\-*&?!$%|<>]*)$/, "keyword")
  t.addRule(/^([A-Za-z_=+\-*&?!$%|<>][A-Za-z0-9_=+\-*&?!$%|<>]*)$/, "symbol")

  t.addRule(/^;[^\n]*$/, "line comment")

  t.addRule(/^\($/, "open paren")
  t.addRule(/^\)$/, "close paren")
  t.addRule(/^\[$/, "open square")
  t.addRule(/^\]$/, "close square")
  t.addRule(/^{$/, "open curly")
  t.addRule(/^}$/, "close curly")

  t.addRule(/^(#|'|\^|\.|\/)$/, "operator")

  t.addRule(/^"([^"\n]|\\")*"?$/, "string")
  t.addRule(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/, "number")
  t.addRule(Tokenizer.whitespace)

  return t
}