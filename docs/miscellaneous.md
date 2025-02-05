---
id: miscellaneous
title: Miscellaneous
sidebar_label: Miscellaneous
---


### Keeping copyright notices or other comments

You can pass `--comments` to retain certain comments in the output.  By
default it will keep comments starting with "!" and JSDoc-style comments that
contain "@preserve", "@copyright", "@license" or "@cc_on" (conditional compilation for IE).
You can pass `--comments all` to keep all the comments, or a valid JavaScript regexp to
keep only comments that match this regexp.  For example `--comments /^!/`
will keep comments like `/*! Copyright Notice */`.

Note, however, that there might be situations where comments are lost.  For
example:
```javascript
function f() {
    /** @preserve Foo Bar */
    function g() {
        // this function is never called
    }
    return something();
}
```

Even though it has "@preserve", the comment will be lost because the inner
function `g` (which is the AST node to which the comment is attached to) is
discarded by the compressor as not referenced.

The safest comments where to place copyright information (or other info that
needs to be kept in the output) are comments attached to toplevel nodes.

### The `unsafe` `compress` option

It enables some transformations that *might* break code logic in certain
contrived cases, but should be fine for most code.  It assumes that standard
built-in ECMAScript functions and classes have not been altered or replaced.
You might want to try it on your own code; it should reduce the minified size.
Some examples of the optimizations made when this option is enabled:

- `new Array(1, 2, 3)` or `Array(1, 2, 3)` → `[ 1, 2, 3 ]`
- `Array.from([1, 2, 3])` → `[1, 2, 3]`
- `new Object()` → `{}`
- `String(exp)` or `exp.toString()` → `"" + exp`
- `new Object/RegExp/Function/Error/Array (...)` → we discard the `new`
- `"foo bar".substr(4)` → `"bar"`

### Conditional compilation

You can use the `--define` (`-d`) switch in order to declare global
variables that Terser will assume to be constants (unless defined in
scope).  For example if you pass `--define DEBUG=false` then, coupled with
dead code removal Terser will discard the following from the output:
```javascript
if (DEBUG) {
    console.log("debug stuff");
}
```

You can specify nested constants in the form of `--define env.DEBUG=false`.

Another way of doing that is to declare your globals as constants in a
separate file and include it into the build.  For example you can have a
`build/defines.js` file with the following:
```javascript
var DEBUG = false;
var PRODUCTION = true;
// etc.
```

and build your code like this:

    terser build/defines.js js/foo.js js/bar.js... -c

Terser will notice the constants and, since they cannot be altered, it
will evaluate references to them to the value itself and drop unreachable
code as usual.  The build will contain the `const` declarations if you use
them. If you are targeting < ES6 environments which does not support `const`,
using `var` with `reduce_vars` (enabled by default) should suffice.

### Conditional compilation API

You can also use conditional compilation via the programmatic API. With the difference that the
property name is `global_defs` and is a compressor property:

```javascript
var result = await minify(fs.readFileSync("input.js", "utf8"), {
    compress: {
        dead_code: true,
        global_defs: {
            DEBUG: false
        }
    }
});
```

To replace an identifier with an arbitrary non-constant expression it is
necessary to prefix the `global_defs` key with `"@"` to instruct Terser
to parse the value as an expression:
```javascript
await minify("alert('hello');", {
    compress: {
        global_defs: {
            "@alert": "console.log"
        }
    }
}).code;
// returns: 'console.log("hello");'
```

Otherwise it would be replaced as string literal:
```javascript
await minify("alert('hello');", {
    compress: {
        global_defs: {
            "alert": "console.log"
        }
    }
}).code;
// returns: '"console.log"("hello");'
```

### Annotations

Annotations in Terser are a way to tell it to treat a certain function call differently. The following annotations are available:

 * `/*@__INLINE__*/` - forces a function to be inlined somewhere.
 * `/*@__NOINLINE__*/` - Makes sure the called function is not inlined into the call site.
 * `/*@__PURE__*/` - Marks a function call as pure. That means, it can safely be dropped.
 * `/*@__KEY__*/` - Marks a string literal as a property to also mangle it when mangling properties.
 * `/*@__MANGLE_PROP__*/` - Opts-in an object property (or class field) for mangling, when the property mangler is enabled.

You can use either a `@` sign at the start, or a `#`.

Here are some examples on how to use them:

```javascript
/*@__INLINE__*/
function_always_inlined_here()

/*#__NOINLINE__*/
function_cant_be_inlined_into_here()

const x = /*#__PURE__*/i_am_dropped_if_x_is_not_used()

function lookup(object, key) { return object[key]; }
lookup({ i_will_be_mangled_too: "bar" }, /*@__KEY__*/ "i_will_be_mangled_too");
```

### ESTree / SpiderMonkey AST

Terser has its own abstract syntax tree format; for
[practical reasons](http://lisperator.net/blog/uglifyjs-why-not-switching-to-spidermonkey-ast/)
we can't easily change to using the SpiderMonkey AST internally.  However,
Terser now has a converter which can import a SpiderMonkey AST.

For example [Acorn](https://github.com/acornjs/acorn) is a super-fast parser that produces a
SpiderMonkey AST.  It has a small CLI utility that parses one file and dumps
the AST in JSON on the standard output.  To use Terser to mangle and
compress that:

    acorn file.js | terser -p spidermonkey -m -c

The `-p spidermonkey` option tells Terser that all input files are not
JavaScript, but JS code described in SpiderMonkey AST in JSON.  Therefore we
don't use our own parser in this case, but just transform that AST into our
internal AST.

`spidermonkey` is also available in `minify` as `parse` and `format` options to
accept and/or produce a spidermonkey AST.

### Use Acorn for parsing

More for fun, I added the `-p acorn` option which will use Acorn to do all
the parsing.  If you pass this option, Terser will `require("acorn")`.

Acorn is really fast (e.g. 250ms instead of 380ms on some 650K code), but
converting the SpiderMonkey tree that Acorn produces takes another 150ms so
in total it's a bit more than just using Terser's own parser.

### Terser Fast Minify Mode

It's not well known, but whitespace removal and symbol mangling accounts
for 95% of the size reduction in minified code for most JavaScript - not
elaborate code transforms. One can simply disable `compress` to speed up
Terser builds by 3 to 4 times.

| d3.js | size | gzip size | time (s) |
|   --- | ---: |      ---: |     ---: |
| original                                    | 451,131 | 108,733 |     - |
| terser@3.7.5 mangle=false, compress=false   | 316,600 |  85,245 |  0.82 |
| terser@3.7.5 mangle=true, compress=false    | 220,216 |  72,730 |  1.45 |
| terser@3.7.5 mangle=true, compress=true     | 212,046 |  70,954 |  5.87 |
| babili@0.1.4                                | 210,713 |  72,140 | 12.64 |
| babel-minify@0.4.3                          | 210,321 |  72,242 | 48.67 |
| babel-minify@0.5.0-alpha.01eac1c3           | 210,421 |  72,238 | 14.17 |

To enable fast minify mode from the CLI use:
```
terser file.js -m
```
To enable fast minify mode with the API use:
```js
await minify(code, { compress: false, mangle: true });
```

#### Source maps and debugging

Various `compress` transforms that simplify, rearrange, inline and remove code
are known to have an adverse effect on debugging with source maps. This is
expected as code is optimized and mappings are often simply not possible as
some code no longer exists. For highest fidelity in source map debugging
disable the `compress` option and just use `mangle`.

When debugging, make sure you enable the **"map scopes"** feature to map mangled variable names back to their original names.  
Without this, all variable values will be `undefined`. See https://github.com/terser/terser/issues/1367 for more details.
<br/><br/>

![image](https://user-images.githubusercontent.com/27283110/230441652-ac5cf6b0-5dc5-4ffc-9d8b-bd02875484f4.png)

### Compiler assumptions

To allow for better optimizations, the compiler makes various assumptions:

- `.toString()` and `.valueOf()` don't have side effects, and for built-in
  objects they have not been overridden.
- `undefined`, `NaN` and `Infinity` have not been externally redefined.
- `arguments.callee`, `arguments.caller` and `Function.prototype.caller` are not used.
- The code doesn't expect the contents of `Function.prototype.toString()` or
  `Error.prototype.stack` to be anything in particular.
- Getting and setting properties on a plain object does not cause other side effects
  (using `.watch()` or `Proxy`).
- Object properties can be added, removed and modified (not prevented with
  `Object.defineProperty()`, `Object.defineProperties()`, `Object.freeze()`,
  `Object.preventExtensions()` or `Object.seal()`).
- `document.all` is not `== null`
- Assigning properties to a class doesn't have side effects and does not throw.

### Build Tools and Adaptors using Terser

https://www.npmjs.com/browse/depended/terser

### Replacing `uglify-es` with `terser` in a project using `yarn`

A number of JS bundlers and uglify wrappers are still using buggy versions
of `uglify-es` and have not yet upgraded to `terser`. If you are using `yarn`
you can add the following alias to your project's `package.json` file:

```js
  "resolutions": {
    "uglify-es": "npm:terser"
  }
```

to use `terser` instead of `uglify-es` in all deeply nested dependencies
without changing any code.

Note: for this change to take effect you must run the following commands
to remove the existing `yarn` lock file and reinstall all packages:

```
$ rm -rf node_modules yarn.lock
$ yarn
```

