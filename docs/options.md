---
id: options
title: Options
sidebar_label: Options
---


## Parse options

- `bare_returns` (default `false`) -- support top level `return` statements

- `html5_comments` (default `true`)

- `shebang` (default `true`) -- support `#!command` as the first line

- `spidermonkey` (default `false`) -- accept a Spidermonkey (Mozilla) AST

## Compress options

- `defaults` (default: `true`) -- Pass `false` to disable most default
  enabled `compress` transforms. Useful when you only want to enable a few
  `compress` options while disabling the rest.

- `arrows` (default: `true`) -- Class and object literal methods are converted
  will also be converted to arrow expressions if the resultant code is shorter:
  `m(){return x}` becomes `m:()=>x`. To do this to regular ES5 functions which
  don't use `this` or `arguments`, see `unsafe_arrows`.

- `arguments` (default: `false`) -- replace `arguments[index]` with function
  parameter name whenever possible.

- `booleans` (default: `true`) -- various optimizations for boolean context,
  for example `!!a ? b : c → a ? b : c`

- `booleans_as_integers` (default: `false`) -- Turn booleans into 0 and 1, also
  makes comparisons with booleans use `==` and `!=` instead of `===` and `!==`.

- `collapse_vars` (default: `true`) -- Collapse single-use non-constant variables,
  side effects permitting.

- `comparisons` (default: `true`) -- apply certain optimizations to binary nodes,
  e.g. `!(a <= b) → a > b` (only when `unsafe_comps`), attempts to negate binary
  nodes, e.g. `a = !b && !c && !d && !e → a=!(b||c||d||e)` etc. Note: `comparisons`
  works best with `lhs_constants` enabled.

- `computed_props` (default: `true`) -- Transforms constant computed properties
  into regular ones: `{["computed"]: 1}` is converted to `{computed: 1}`.

- `conditionals` (default: `true`) -- apply optimizations for `if`-s and conditional
  expressions

- `dead_code` (default: `true`) -- remove unreachable code

- `directives` (default: `true`) -- remove redundant or non-standard directives

- `drop_console` (default: `false`) -- Pass `true` to discard calls to
  `console.*` functions. If you only want to discard a portion of console, 
   you can pass an array like this `['log', 'info']`, which will only discard `console.log`、 `console.info`.

- `drop_debugger` (default: `true`) -- remove `debugger;` statements

- `ecma` (default: `5`) -- Pass `2015` or greater to enable `compress` options that
  will transform ES5 code into smaller ES6+ equivalent forms.

- `evaluate` (default: `true`) -- attempt to evaluate constant expressions

- `expression` (default: `false`) -- Pass `true` to preserve completion values
  from terminal statements without `return`, e.g. in bookmarklets.

- `global_defs` (default: `{}`) -- see [conditional compilation](/docs/miscellaneous#conditional-compilation)

- `hoist_funs` (default: `false`) -- hoist function declarations

- `hoist_props` (default: `true`) -- hoist properties from constant object and
  array literals into regular variables subject to a set of constraints. For example:
  `var o={p:1, q:2}; f(o.p, o.q);` is converted to `f(1, 2);`. Note: `hoist_props`
  works best with `mangle` enabled, the `compress` option `passes` set to `2` or higher,
  and the `compress` option `toplevel` enabled.

- `hoist_vars` (default: `false`) -- hoist `var` declarations (this is `false`
  by default because it seems to increase the size of the output in general)

- `if_return` (default: `true`) -- optimizations for if/return and if/continue

- `inline` (default: `true`) -- inline calls to function with simple/`return` statement:
  - `false` -- same as `0`
  - `0` -- disabled inlining
  - `1` -- inline simple functions
  - `2` -- inline functions with arguments
  - `3` -- inline functions with arguments and variables
  - `true` -- same as `3`

- `join_vars` (default: `true`) -- join consecutive `var`, `let` and `const` statements

- `keep_classnames` (default: `false`) -- Pass `true` to prevent the compressor from
  discarding class names. Pass a regular expression to only keep class names matching
  that regex. See also: the `keep_classnames` [mangle option](/docs/options#mangle-options).

- `keep_fargs` (default: `true`) -- Prevents the compressor from discarding unused
  function arguments.  You need this for code which relies on `Function.length`.

- `keep_fnames` (default: `false`) -- Pass `true` to prevent the
  compressor from discarding function names. Pass a regular expression to only keep
  function names matching that regex. Useful for code relying on `Function.prototype.name`.
  See also: the `keep_fnames` [mangle option](/docs/options#mangle-options).

- `keep_infinity` (default: `false`) -- Pass `true` to prevent `Infinity` from
  being compressed into `1/0`, which may cause performance issues on Chrome.

- `lhs_constants` (default: `true`) -- Moves constant values to the left-hand side
  of binary nodes. `foo == 42 → 42 == foo`

- `loops` (default: `true`) -- optimizations for `do`, `while` and `for` loops
  when we can statically determine the condition.

- `module` (default `false`) -- Pass `true` when compressing an ES6 module. Strict
  mode is implied and the `toplevel` option as well.

- `negate_iife` (default: `true`) -- negate "Immediately-Called Function Expressions"
  where the return value is discarded, to avoid the parens that the
  code generator would insert.

- `passes` (default: `1`) -- The maximum number of times to run compress.
  In some cases more than one pass leads to further compressed code.  Keep in
  mind more passes will take more time.

- `properties` (default: `true`) -- rewrite property access using the dot notation, for
  example `foo["bar"] → foo.bar`

- `pure_funcs` (default: `null`) -- You can pass an array of names and
  Terser will assume that those functions do not produce side
  effects.  DANGER: will not check if the name is redefined in scope.
  An example case here, for instance `var q = Math.floor(a/b)`.  If
  variable `q` is not used elsewhere, Terser will drop it, but will
  still keep the `Math.floor(a/b)`, not knowing what it does.  You can
  pass `pure_funcs: [ 'Math.floor' ]` to let it know that this
  function won't produce any side effect, in which case the whole
  statement would get discarded.  The current implementation adds some
  overhead (compression will be slower).

- `pure_getters` (default: `"strict"`) -- If you pass `true` for
  this, Terser will assume that object property access
  (e.g. `foo.bar` or `foo["bar"]`) doesn't have any side effects.
  Specify `"strict"` to treat `foo.bar` as side-effect-free only when
  `foo` is certain to not throw, i.e. not `null` or `undefined`.

- `pure_new` (default: `false`) -- Set to `true` to assume `new X()` never has
  side effects.

- `reduce_vars` (default: `true`) -- Improve optimization on variables assigned with and
  used as constant values.

- `reduce_funcs` (default: `true`) -- Inline single-use functions when
  possible. Depends on `reduce_vars` being enabled.  Disabling this option
  sometimes improves performance of the output code.

- `sequences` (default: `true`) -- join consecutive simple statements using the
  comma operator.  May be set to a positive integer to specify the maximum number
  of consecutive comma sequences that will be generated. If this option is set to
  `true` then the default `sequences` limit is `200`. Set option to `false` or `0`
  to disable. The smallest `sequences` length is `2`. A `sequences` value of `1`
  is grandfathered to be equivalent to `true` and as such means `200`. On rare
  occasions the default sequences limit leads to very slow compress times in which
  case a value of `20` or less is recommended.

- `side_effects` (default: `true`) -- Remove expressions which have no side effects
  and whose results aren't used.

- `switches` (default: `true`) -- de-duplicate and remove unreachable `switch` branches

- `toplevel` (default: `false`) -- drop unreferenced functions (`"funcs"`) and/or
  variables (`"vars"`) in the top level scope (`false` by default, `true` to drop
  both unreferenced functions and variables)

- `top_retain` (default: `null`) -- prevent specific toplevel functions and
  variables from `unused` removal (can be array, comma-separated, RegExp or
  function. Implies `toplevel`)

- `typeofs` (default: `true`) -- Transforms `typeof foo == "undefined"` into
  `foo === void 0`.  Note: recommend to set this value to `false` for IE10 and
  earlier versions due to known issues.

- `unsafe` (default: `false`) -- apply "unsafe" transformations
  ([details](/docs/miscellaneous#the-unsafe-compress-option)).

- `unsafe_arrows` (default: `false`) -- Convert ES5 style anonymous function
  expressions to arrow functions if the function body does not reference `this`.
  Note: it is not always safe to perform this conversion if code relies on the
  the function having a `prototype`, which arrow functions lack.
  This transform requires that the `ecma` compress option is set to `2015` or greater.

- `unsafe_comps` (default: `false`) -- Reverse `<` and `<=` to `>` and `>=` to
  allow improved compression. This might be unsafe when an at least one of two
  operands is an object with computed values due the use of methods like `get`,
  or `valueOf`. This could cause change in execution order after operands in the
  comparison are switching. Compression only works if both `comparisons` and
  `unsafe_comps` are both set to true.

- `unsafe_Function` (default: `false`) -- compress and mangle `Function(args, code)`
  when both `args` and `code` are string literals.

- `unsafe_math` (default: `false`) -- optimize numerical expressions like
  `2 * x * 3` into `6 * x`, which may give imprecise floating point results.

- `unsafe_symbols` (default: `false`) -- removes keys from native Symbol
  declarations, e.g `Symbol("kDog")` becomes `Symbol()`.

- `unsafe_methods` (default: false) -- Converts `{ m: function(){} }` to
  `{ m(){} }`. `ecma` must be set to `6` or greater to enable this transform.
  If `unsafe_methods` is a RegExp then key/value pairs with keys matching the
  RegExp will be converted to concise methods.
  Note: if enabled there is a risk of getting a "`<method name>` is not a
  constructor" TypeError should any code try to `new` the former function.

- `unsafe_proto` (default: `false`) -- optimize expressions like
  `Array.prototype.slice.call(a)` into `[].slice.call(a)`

- `unsafe_regexp` (default: `false`) -- enable substitutions of variables with
  `RegExp` values the same way as if they are constants.

- `unsafe_undefined` (default: `false`) -- substitute `void 0` if there is a
  variable named `undefined` in scope (variable name will be mangled, typically
  reduced to a single character)

- `unused` (default: `true`) -- drop unreferenced functions and variables (simple
  direct variable assignments do not count as references unless set to `"keep_assign"`)

## Mangle options

- `eval` (default `false`) -- Pass `true` to mangle names visible in scopes
  where `eval` or `with` are used.

- `keep_classnames` (default `false`) -- Pass `true` to not mangle class names.
  Pass a regular expression to only keep class names matching that regex.
  See also: the `keep_classnames` [compress option](/docs/options#compress-options).

- `keep_fnames` (default `false`) -- Pass `true` to not mangle function names.
  Pass a regular expression to only keep function names matching that regex.
  Useful for code relying on `Function.prototype.name`. See also: the `keep_fnames`
  [compress option](/docs/options#compress-options).

- `module` (default `false`) -- Pass `true` an ES6 modules, where the toplevel
  scope is not the global scope. Implies `toplevel` and assumes input code is strict mode JS.

- `nth_identifier` (default: an internal mangler that weights based on character
  frequency analysis) -- Pass an object with a `get(n)` function that converts an
  ordinal into the nth most favored (usually shortest) identifier.
  Optionally also provide `reset()`, `sort()`, and `consider(chars, delta)` to
  use character frequency analysis of the source code.

- `reserved` (default `[]`) -- Pass an array of identifiers that should be
  excluded from mangling. Example: `["foo", "bar"]`.

- `toplevel` (default `false`) -- Pass `true` to mangle names declared in the
  top level scope.

- `safari10` (default `false`) -- Pass `true` to work around the Safari 10 loop
  iterator [bug](https://bugs.webkit.org/show_bug.cgi?id=171041)
  "Cannot declare a let variable twice".
  See also: the `safari10` [format option](/docs/options#format-options).

Examples:

```javascript
// test.js
var globalVar;
function funcName(firstLongName, anotherLongName) {
    var myVariable = firstLongName +  anotherLongName;
}
```
```javascript
var code = fs.readFileSync("test.js", "utf8");

await minify(code).code;
// 'function funcName(a,n){}var globalVar;'

await minify(code, { mangle: { reserved: ['firstLongName'] } }).code;
// 'function funcName(firstLongName,a){}var globalVar;'

await minify(code, { mangle: { toplevel: true } }).code;
// 'function n(n,a){}var a;'
```

### Mangle properties options

- `builtins` (default: `false`) — Use `true` to allow the mangling of builtin
  DOM properties. Not recommended to override this setting.

- `debug` (default: `false`) — Mangle names with the original name still present.
  Pass an empty string `""` to enable, or a non-empty string to set the debug suffix.

- `keep_quoted` (default: `false`) — How quoting properties (`{"prop": ...}` and `obj["prop"]`) controls what gets mangled.
  - `"strict"` (recommended) -- `obj.prop` is mangled.
  - `false` -- `obj["prop"]` is mangled.
  - `true` -- `obj.prop` is mangled unless there is `obj["prop"]` elsewhere in the code.

- `nth_identifier` (default: an internal mangler that weights based on character
  frequency analysis) -- Pass an object with a `get(n)` function that converts an
  ordinal into the nth most favored (usually shortest) identifier.
  Optionally also provide `reset()`, `sort()`, and `consider(chars, delta)` to
  use character frequency analysis of the source code.

- `regex` (default: `null`) — Pass a [RegExp literal or pattern string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) to only mangle property matching the regular expression.

- `reserved` (default: `[]`) — Do not mangle property names listed in the
  `reserved` array.

- `undeclared` (default: `false`) - Mangle those names when they are accessed
  as properties of known top level variables but their declarations are never
  found in input code. May be useful when only minifying parts of a project.
  See [#397](https://github.com/terser/terser/issues/397) for more details.


## Format options

These options control the format of Terser's output code. Previously known
as "output options".

- `ascii_only` (default `false`) -- escape Unicode characters in strings and
  regexps (affects directives with non-ascii characters becoming invalid)

- `beautify` (default `false`) -- (DEPRECATED) whether to beautify the output.
  When using the legacy `-b` CLI flag, this is set to true by default.

- `braces` (default `false`) -- always insert braces in `if`, `for`,
  `do`, `while` or `with` statements, even if their body is a single
  statement.

- `comments` (default `"some"`) -- by default it keeps JSDoc-style comments
  that contain "@license", "@copyright", "@preserve" or start with `!`, pass `true`
  or `"all"` to preserve all comments, `false` to omit comments in the output,
  a regular expression string (e.g. `/^!/`) or a function.

- `ecma` (default `5`) -- set desired EcmaScript standard version for output.
  Set `ecma` to `2015` or greater to emit shorthand object properties - i.e.:
  `{a}` instead of `{a: a}`.  The `ecma` option will only change the output in
  direct control of the beautifier. Non-compatible features in your input will
  still be output as is. For example: an `ecma` setting of `5` will **not**
  convert modern code to ES5.

- `indent_level` (default `4`)

- `indent_start` (default `0`) -- prefix all lines by that many spaces

- `inline_script` (default `true`) -- escape HTML comments and the slash in
  occurrences of `</script>` in strings

- `keep_numbers` (default `false`) -- keep number literals as it was in original code
 (disables optimizations like converting `1000000` into `1e6`)

- `keep_quoted_props` (default `false`) -- when turned on, prevents stripping
  quotes from property names in object literals.

- `max_line_len` (default `false`) -- maximum line length (for minified code)

- `preamble` (default `null`) -- when passed it must be a string and
  it will be prepended to the output literally.  The source map will
  adjust for this text.  Can be used to insert a comment containing
  licensing information, for example.

- `quote_keys` (default `false`) -- pass `true` to quote all keys in literal
  objects

- `quote_style` (default `0`) -- preferred quote style for strings (affects
  quoted property names and directives as well):
  - `0` -- prefers double quotes, switches to single quotes when there are
    more double quotes in the string itself. `0` is best for gzip size.
  - `1` -- always use single quotes
  - `2` -- always use double quotes
  - `3` -- always use the original quotes

- `preserve_annotations` -- (default `false`) -- Preserve [Terser annotations](/docs/miscellaneous#annotations) in the output.

- `safari10` (default `false`) -- set this option to `true` to work around
  the [Safari 10/11 await bug](https://bugs.webkit.org/show_bug.cgi?id=176685).
  See also: the `safari10` [mangle option](/docs/options#mangle-options).

- `semicolons` (default `true`) -- separate statements with semicolons.  If
  you pass `false` then whenever possible we will use a newline instead of a
  semicolon, leading to more readable output of minified code (size before
  gzip could be smaller; size after gzip insignificantly larger).

- `shebang` (default `true`) -- preserve shebang `#!` in preamble (bash scripts)

- `spidermonkey` (default `false`) -- produce a Spidermonkey (Mozilla) AST

- `webkit` (default `false`) -- enable workarounds for WebKit bugs.
  PhantomJS users should set this option to `true`.

- `wrap_iife` (default `false`) -- pass `true` to wrap immediately invoked
  function expressions. See
  [#640](https://github.com/mishoo/UglifyJS2/issues/640) for more details.

- `wrap_func_args` (default `true`) -- pass `false` if you do not want to wrap
  function expressions that are passed as arguments, in parenthesis. See
  [OptimizeJS](https://github.com/nolanlawson/optimize-js) for more details.


