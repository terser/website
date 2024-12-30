---
id: api-reference
title: API Reference
sidebar_label: API Reference
---


Assuming installation via NPM, you can load Terser in your application
like this:

```javascript
const { minify } = require("terser");
```

Or,

```javascript
import { minify } from "terser";
```

Browser loading is also supported. It exposes a global variable `Terser` containing a `.minify` property:
```html
<script src="https://cdn.jsdelivr.net/npm/source-map@0.7.3/dist/source-map.js"></script>
<script src="https://cdn.jsdelivr.net/npm/terser/dist/bundle.min.js"></script>
```

There is an async high level function, **`async minify(code, options)`**,
which will perform all minification [phases](/docs/api-reference#minify-options) in a configurable
manner. By default `minify()` will enable [`compress`](/docs/options#compress-options)
and [`mangle`](/docs/options#mangle-options). Example:
```javascript
var code = "function add(first, second) { return first + second; }";
var result = await minify(code, { sourceMap: true });
console.log(result.code);  // minified output: function add(n,d){return n+d}
console.log(result.map);  // source map
```

There is also a `minify_sync()` alternative version of it, which returns instantly.

You can `minify` more than one JavaScript file at a time by using an object
for the first argument where the keys are file names and the values are source
code:
```javascript
var code = {
    "file1.js": "function add(first, second) { return first + second; }",
    "file2.js": "console.log(add(1 + 2, 3 + 4));"
};
var result = await minify(code);
console.log(result.code);
// function add(d,n){return d+n}console.log(add(3,7));
```

The `toplevel` option:
```javascript
var code = {
    "file1.js": "function add(first, second) { return first + second; }",
    "file2.js": "console.log(add(1 + 2, 3 + 4));"
};
var options = { toplevel: true };
var result = await minify(code, options);
console.log(result.code);
// console.log(3+7);
```

The `nameCache` option:
```javascript
var options = {
    mangle: {
        toplevel: true,
    },
    nameCache: {}
};
var result1 = await minify({
    "file1.js": "function add(first, second) { return first + second; }"
}, options);
var result2 = await minify({
    "file2.js": "console.log(add(1 + 2, 3 + 4));"
}, options);
console.log(result1.code);
// function n(n,r){return n+r}
console.log(result2.code);
// console.log(n(3,7));
```

You may persist the name cache to the file system in the following way:
```javascript
var cacheFileName = "/tmp/cache.json";
var options = {
    mangle: {
        properties: true,
    },
    nameCache: JSON.parse(fs.readFileSync(cacheFileName, "utf8"))
};
fs.writeFileSync("part1.js", await minify({
    "file1.js": fs.readFileSync("file1.js", "utf8"),
    "file2.js": fs.readFileSync("file2.js", "utf8")
}, options).code, "utf8");
fs.writeFileSync("part2.js", await minify({
    "file3.js": fs.readFileSync("file3.js", "utf8"),
    "file4.js": fs.readFileSync("file4.js", "utf8")
}, options).code, "utf8");
fs.writeFileSync(cacheFileName, JSON.stringify(options.nameCache), "utf8");
```

An example of a combination of `minify()` options:
```javascript
var code = {
    "file1.js": "function add(first, second) { return first + second; }",
    "file2.js": "console.log(add(1 + 2, 3 + 4));"
};
var options = {
    toplevel: true,
    compress: {
        global_defs: {
            "@console.log": "alert"
        },
        passes: 2
    },
    format: {
        preamble: "/* minified */"
    }
};
var result = await minify(code, options);
console.log(result.code);
// /* minified */
// alert(10);"
```

An error example:
```javascript
try {
    const result = await minify({"foo.js" : "if (0) else console.log(1);"});
    // Do something with result
} catch (error) {
    const { message, filename, line, col, pos } = error;
    // Do something with error
}
```

## Minify options

- `ecma` (default `undefined`) - pass `5`, `2015`, `2016`, etc to override
  `compress` and `format`'s `ecma` options.

- `enclose` (default `false`) - pass `true`, or a string in the format
  of `"args[:values]"`, where `args` and `values` are comma-separated
  argument names and values, respectively, to embed the output in a big
  function with the configurable arguments and values.

- `parse` (default `{}`) — pass an object if you wish to specify some
  additional [parse options](/docs/options#parse-options).

- `compress` (default `{}`) — pass `false` to skip compressing entirely.
  Pass an object to specify custom [compress options](/docs/options#compress-options).

- `mangle` (default `true`) — pass `false` to skip mangling names, or pass
  an object to specify [mangle options](/docs/options#mangle-options) (see below).

  - `mangle.properties` (default `false`) — a subcategory of the mangle option.
    Pass an object to specify custom [mangle property options](/docs/options#mangle-properties-options).

- `module` (default `false`) — Use when minifying an ES6 module. "use strict"
  is implied and names can be mangled on the top scope. If `compress` or
  `mangle` is enabled then the `toplevel` option will be enabled.

- `format` or `output` (default `null`) — pass an object if you wish to specify
  additional [format options](/docs/options#format-options).  The defaults are optimized
  for best compression.

- `sourceMap` (default `false`) - pass an object if you wish to specify
  [source map options](/docs/api-reference#source-map-options).

- `toplevel` (default `false`) - set to `true` if you wish to enable top level
  variable and function name mangling and to drop unused variables and functions.

- `nameCache` (default `null`) - pass an empty object `{}` or a previously
  used `nameCache` object if you wish to cache mangled variable and
  property names across multiple invocations of `minify()`. Note: this is
  a read/write property. `minify()` will read the name cache state of this
  object and update it during minification so that it may be
  reused or externally persisted by the user.

- `ie8` (default `false`) - set to `true` to support IE8.

- `keep_classnames` (default: `undefined`) - pass `true` to prevent discarding or mangling
  of class names. Pass a regular expression to only keep class names matching that regex.

- `keep_fnames` (default: `false`) - pass `true` to prevent discarding or mangling
  of function names. Pass a regular expression to only keep function names matching that regex.
  Useful for code relying on `Function.prototype.name`. If the top level minify option
  `keep_classnames` is `undefined` it will be overridden with the value of the top level
  minify option `keep_fnames`.

- `safari10` (default: `false`) - pass `true` to work around Safari 10/11 bugs in
  loop scoping and `await`. See `safari10` options in [`mangle`](/docs/options#mangle-options)
  and [`format`](/docs/options#format-options) for details.

## Minify options structure

```javascript
{
    parse: {
        // parse options
    },
    compress: {
        // compress options
    },
    mangle: {
        // mangle options

        properties: {
            // mangle property options
        }
    },
    format: {
        // format options (can also use `output` for backwards compatibility)
    },
    sourceMap: {
        // source map options
    },
    ecma: 5, // specify one of: 5, 2015, 2016, etc.
    enclose: false, // or specify true, or "args:values"
    keep_classnames: false,
    keep_fnames: false,
    ie8: false,
    module: false,
    nameCache: null, // or specify a name cache object
    safari10: false,
    toplevel: false
}
```

### Source map options

To generate a source map:
```javascript
var result = await minify({"file1.js": "var a = function() {};"}, {
    sourceMap: {
        filename: "out.js",
        url: "out.js.map"
    }
});
console.log(result.code); // minified output
console.log(result.map);  // source map
```

Note that the source map is not saved in a file, it's just returned in
`result.map`.  The value passed for `sourceMap.url` is only used to set
`//# sourceMappingURL=out.js.map` in `result.code`. The value of
`filename` is only used to set `file` attribute (see [the spec][sm-spec])
in source map file.

You can set option `sourceMap.url` to be `"inline"` and source map will
be appended to code.

You can also specify sourceRoot property to be included in source map:
```javascript
var result = await minify({"file1.js": "var a = function() {};"}, {
    sourceMap: {
        root: "http://example.com/src",
        url: "out.js.map"
    }
});
```

If you're compressing compiled JavaScript and have a source map for it, you
can use `sourceMap.content`:
```javascript
var result = await minify({"compiled.js": "compiled code"}, {
    sourceMap: {
        content: "content from compiled.js.map",
        url: "minified.js.map"
    }
});
// same as before, it returns `code` and `map`
```

If you're using the `X-SourceMap` header instead, you can just omit `sourceMap.url`.

If you happen to need the source map as a raw object, set `sourceMap.asObject` to `true`.

