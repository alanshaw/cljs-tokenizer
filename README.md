cljs-tokenizer [![Build Status](https://travis-ci.org/alanshaw/cljs-tokenizer.png)](https://travis-ci.org/alanshaw/cljs-tokenizer) [![Dependency Status](https://david-dm.org/alanshaw/cljs-tokenizer.png?theme=shields.io)](https://david-dm.org/alanshaw/cljs-tokenizer)
===
Tokenizes your clojurescript.

If it doesn't work, it's probably because I have no idea what I'm doing. I've never even coded in clojurescript. Help needed and appreciated.

Usage
---

```javascript
var tokenize = require('cljs-tokenizer')
var t = tokenize(function (src, token) {
  console.log(token.type + " => " + JSON.stringify(src))
})
process.stdin.pipe(t)
```

For the input file hello.cljs:

```clojurescript
(ns hello.core)

; Hello World in clojurescript
(defn -main []
  (println "Hello World"))

(set! *main-cli-fn* -main)
```

output:

```
$ node example/tokens.js < example/hello.cljs
open paren => "("
symbol => "ns"
whitespace => " "
symbol => "hello.core"
close paren => ")"
whitespace => "\n\n"
comment => "; Hello World in clojurescript"
whitespace => "\n"
open paren => "("
symbol => "defn"
whitespace => " "
symbol => "-main"
whitespace => " "
open square => "["
close square => "]"
whitespace => "\n  "
open paren => "("
symbol => "println"
whitespace => " "
string => "\"Hello World\""
close paren => ")"
close paren => ")"
whitespace => "\n\n"
open paren => "("
symbol => "set!"
whitespace => " "
symbol => "*main-cli-fn*"
whitespace => " "
symbol => "-main"
close paren => ")"
```

### var t = tokenize(cb)


Return a new [tokenizer](https://npmjs.org/package/tokenizer) through stream with clojurescript syntax rules loaded into it.

Each parsed token will fire the `cb(src, token)` callback.

Each token has a `token.type` with the rule as a string name and `token.regex` as the regular expression for the rule that matched.

### t.addRule(regex, name)

Add additional rules as `regex` with a `name`.

Install
---

With [npm](https://npmjs.org) do:

```
npm install cljs-tokenizer
```

License
---

MIT