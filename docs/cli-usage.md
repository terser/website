---
id: cli-usage
title: CLI Usage
sidebar_label: CLI Usage
---


    terser [input files] [options]

Terser can take multiple input files.  It's recommended that you pass the
input files first, then pass the options.  Terser will parse input files
in sequence and apply any compression options.  The files are parsed in the
same global scope, that is, a reference from a file to some
variable/function declared in another file will be matched properly.

If no input file is specified, Terser will read from STDIN.

If you wish to pass your options before the input files, separate the two with
a double dash to prevent input files being used as option arguments:

    terser --compress --mangle -- input.js

### Command line options

```
    -h, --help                  Print usage information.
                                `--help options` for details on available options.
    -V, --version               Print version number.
    -p, --parse <options>       Specify parser options:
                                `acorn`  Use Acorn for parsing.
                                `bare_returns`  Allow return outside of functions.
                                                Useful when minifying CommonJS
                                                modules and Userscripts that may
                                                be anonymous function wrapped (IIFE)
                                                by the .user.js engine `caller`.
                                `expression`  Parse a single expression, rather than
                                              a program (for parsing JSON).
                                `spidermonkey`  Assume input files are SpiderMonkey
                                                AST format (as JSON).
    -c, --compress [options]    Enable compressor/specify compressor options:
                                `pure_funcs`  List of functions that can be safely
                                              removed when their return values are
                                              not used.
    -m, --mangle [options]      Mangle names/specify mangler options:
                                `reserved`  List of names that should not be mangled.
    --mangle-props [options]    Mangle properties/specify mangler options:
                                `builtins`  Mangle property names that overlaps
                                            with standard JavaScript globals and DOM
                                            API props.
                                `debug`  Add debug prefix and suffix.
                                `keep_quoted`  Only mangle unquoted properties, quoted
                                               properties are automatically reserved.
                                               `strict` disables quoted properties
                                               being automatically reserved.
                                `regex`  Only mangle matched property names.
                                `reserved`  List of names that should not be mangled.
    -f, --format [options]      Specify format options.
                                `preamble`  Preamble to prepend to the output. You
                                            can use this to insert a comment, for
                                            example for licensing information.
                                            This will not be parsed, but the source
                                            map will adjust for its presence.
                                `quote_style`  Quote style:
                                               0 - auto
                                               1 - single
                                               2 - double
                                               3 - original
                                `wrap_iife`  Wrap IIFEs in parenthesis. Note: you may
                                             want to disable `negate_iife` under
                                             compressor options.
                                `wrap_func_args`  Wrap function arguments in parenthesis.
    -o, --output <file>         Output file path (default STDOUT). Specify `ast` or
                                `spidermonkey` to write Terser or SpiderMonkey AST
                                as JSON to STDOUT respectively.
    --comments [filter]         Preserve copyright comments in the output. By
                                default this works like Google Closure, keeping
                                JSDoc-style comments that contain "@license" or
                                "@preserve". You can optionally pass one of the
                                following arguments to this flag:
                                - "all" to keep all comments
                                - `false` to omit comments in the output
                                - a valid JS RegExp like `/foo/` or `/^!/` to
                                keep only matching comments.
                                Note that currently not *all* comments can be
                                kept when compression is on, because of dead
                                code removal or cascading statements into
                                sequences.
    --config-file <file>        Read `minify()` options from JSON file.
    -d, --define <expr>[=value] Global definitions.
    --ecma <version>            Specify ECMAScript release: 5, 2015, 2016, etc.
    -e, --enclose [arg[:value]] Embed output in a big function with configurable
                                arguments and values.
    --ie8                       Support non-standard Internet Explorer 8.
                                Equivalent to setting `ie8: true` in `minify()`
                                for `compress`, `mangle` and `format` options.
                                By default Terser will not try to be IE-proof.
    --keep-classnames           Do not mangle/drop class names.
    --keep-fnames               Do not mangle/drop function names.  Useful for
                                code relying on Function.prototype.name.
    --module                    Input is an ES6 module. If `compress` or `mangle` is
                                enabled then the `toplevel` option will be enabled.
    --name-cache <file>         File to hold mangled name mappings.
    --safari10                  Support non-standard Safari 10/11.
                                Equivalent to setting `safari10: true` in `minify()`
                                for `mangle` and `format` options.
                                By default `terser` will not work around
                                Safari 10/11 bugs.
    --source-map [options]      Enable source map/specify source map options:
                                `base`  Path to compute relative paths from input files.
                                `content`  Input source map, useful if you're compressing
                                           JS that was generated from some other original
                                           code. Specify "inline" if the source map is
                                           included within the sources.
                                `filename`  Name and/or location of the output source.
                                `includeSources`  Pass this flag if you want to include
                                                  the content of source files in the
                                                  source map as sourcesContent property.
                                `root`  Path to the original source to be included in
                                        the source map.
                                `url`  If specified, path to the source map to append in
                                       `//# sourceMappingURL`.
    --timings                   Display operations run time on STDERR.
    --toplevel                  Compress and/or mangle variables in top level scope.
    --wrap <name>               Embed everything in a big function, making the
                                “exports” and “global” variables available. You
                                need to pass an argument to this option to
                                specify the name that your module will take
                                when included in, say, a browser.
```

Specify `--output` (`-o`) to declare the output file.  Otherwise the output
goes to STDOUT.

## CLI source map options

Terser can generate a source map file, which is highly useful for
debugging your compressed JavaScript.  To get a source map, pass
`--source-map --output output.js` (source map will be written out to
`output.js.map`).

Additional options:

- `--source-map "filename='<NAME>'"` to specify the name of the source map.

- `--source-map "root='<URL>'"` to pass the URL where the original files can be found.

- `--source-map "url='<URL>'"` to specify the URL where the source map can be found.
  Otherwise Terser assumes HTTP `X-SourceMap` is being used and will omit the
  `//# sourceMappingURL=` directive.

For example:

    terser js/file1.js js/file2.js \
             -o foo.min.js -c -m \
             --source-map "root='http://foo.com/src',url='foo.min.js.map'"

The above will compress and mangle `file1.js` and `file2.js`, will drop the
output in `foo.min.js` and the source map in `foo.min.js.map`.  The source
mapping will refer to `http://foo.com/src/js/file1.js` and
`http://foo.com/src/js/file2.js` (in fact it will list `http://foo.com/src`
as the source map root, and the original files as `js/file1.js` and
`js/file2.js`).

### Composed source map

When you're compressing JS code that was output by a compiler such as
CoffeeScript, mapping to the JS code won't be too helpful.  Instead, you'd
like to map back to the original code (i.e. CoffeeScript).  Terser has an
option to take an input source map.  Assuming you have a mapping from
CoffeeScript → compiled JS, Terser can generate a map from CoffeeScript →
compressed JS by mapping every token in the compiled JS to its original
location.

To use this feature pass `--source-map "content='/path/to/input/source.map'"`
or `--source-map "content=inline"` if the source map is included inline with
the sources.

## CLI compress options

You need to pass `--compress` (`-c`) to enable the compressor.  Optionally
you can pass a comma-separated list of [compress options](#compress-options).

Options are in the form `foo=bar`, or just `foo` (the latter implies
a boolean option that you want to set `true`; it's effectively a
shortcut for `foo=true`).

Example:

    terser file.js -c toplevel,sequences=false

## CLI mangle options

To enable the mangler you need to pass `--mangle` (`-m`).  The following
(comma-separated) options are supported:

- `toplevel` (default `false`) -- mangle names declared in the top level scope.

- `eval` (default `false`) -- mangle names visible in scopes where `eval` or `with` are used.

When mangling is enabled but you want to prevent certain names from being
mangled, you can declare those names with `--mangle reserved` — pass a
comma-separated list of names.  For example:

    terser ... -m reserved=['$','require','exports']

to prevent the `require`, `exports` and `$` names from being changed.

### CLI mangling property names (`--mangle-props`)

**Note:** THIS **WILL** BREAK YOUR CODE. A good rule of thumb is not to use this unless you know exactly what you're doing and how this works and read this section until the end.

Mangling property names is a separate step, different from variable name mangling.  Pass
`--mangle-props` to enable it. The least dangerous
way to use this is to use the `regex` option like so:

```
terser example.js -c -m --mangle-props regex=/_$/
```

This will mangle all properties that end with an
underscore. So you can use it to mangle internal methods.

By default, it will mangle all properties in the
input code with the exception of built in DOM properties and properties
in core JavaScript classes, which is what will break your code if you don't:

1. Control all the code you're mangling
2. Avoid using a module bundler, as they usually will call Terser on each file individually, making it impossible to pass mangled objects between modules.
3. Avoid calling functions like `defineProperty` or `hasOwnProperty`, because they refer to object properties using strings and will break your code if you don't know what you are doing.

An example:

```javascript
// example.js
var x = {
    baz_: 0,
    foo_: 1,
    calc: function() {
        return this.foo_ + this.baz_;
    }
};
x.bar_ = 2;
x["baz_"] = 3;
console.log(x.calc());
```
Mangle all properties (except for JavaScript `builtins`) (**very** unsafe):
```bash
$ terser example.js -c passes=2 -m --mangle-props
```
```javascript
var x={o:3,t:1,i:function(){return this.t+this.o},s:2};console.log(x.i());
```
Mangle all properties except for `reserved` properties (still very unsafe):
```bash
$ terser example.js -c passes=2 -m --mangle-props reserved=[foo_,bar_]
```
```javascript
var x={o:3,foo_:1,t:function(){return this.foo_+this.o},bar_:2};console.log(x.t());
```
Mangle all properties matching a `regex` (not as unsafe but still unsafe):
```bash
$ terser example.js -c passes=2 -m --mangle-props regex=/_$/
```
```javascript
var x={o:3,t:1,calc:function(){return this.t+this.o},i:2};console.log(x.calc());
```

Combining mangle properties options:
```bash
$ terser example.js -c passes=2 -m --mangle-props regex=/_$/,reserved=[bar_]
```
```javascript
var x={o:3,t:1,calc:function(){return this.t+this.o},bar_:2};console.log(x.calc());
```

In order for this to be of any use, we avoid mangling standard JS names and DOM
API properties by default (`--mangle-props builtins` to override).

A regular expression can be used to define which property names should be
mangled.  For example, `--mangle-props regex=/^_/` will only mangle property
names that start with an underscore.

When you compress multiple files using this option, in order for them to
work together in the end we need to ensure somehow that one property gets
mangled to the same name in all of them.  For this, pass `--name-cache filename.json`
and Terser will maintain these mappings in a file which can then be reused.
It should be initially empty.  Example:

```bash
$ rm -f /tmp/cache.json  # start fresh
$ terser file1.js file2.js --mangle-props --name-cache /tmp/cache.json -o part1.js
$ terser file3.js file4.js --mangle-props --name-cache /tmp/cache.json -o part2.js
```

Now, `part1.js` and `part2.js` will be consistent with each other in terms
of mangled property names.

Using the name cache is not necessary if you compress all your files in a
single call to Terser.

### Mangling unquoted names (`--mangle-props keep_quoted`)

Using quoted property name (`o["foo"]`) reserves the property name (`foo`)
so that it is not mangled throughout the entire script even when used in an
unquoted style (`o.foo`). Example:

```javascript
// stuff.js
var o = {
    "foo": 1,
    bar: 3
};
o.foo += o.bar;
console.log(o.foo);
```
```bash
$ terser stuff.js --mangle-props keep_quoted -c -m
```
```javascript
var o={foo:1,o:3};o.foo+=o.o,console.log(o.foo);
```

### Debugging property name mangling

You can also pass `--mangle-props debug` in order to mangle property names
without completely obscuring them. For example the property `o.foo`
would mangle to `o._$foo$_` with this option. This allows property mangling
of a large codebase while still being able to debug the code and identify
where mangling is breaking things.

```bash
$ terser stuff.js --mangle-props debug -c -m
```
```javascript
var o={_$foo$_:1,_$bar$_:3};o._$foo$_+=o._$bar$_,console.log(o._$foo$_);
```

You can also pass a custom suffix using `--mangle-props debug=XYZ`. This would then
mangle `o.foo` to `o._$foo$XYZ_`. You can change this each time you compile a
script to identify how a property got mangled. One technique is to pass a
random number on every compile to simulate mangling changing with different
inputs (e.g. as you update the input script with new properties), and to help
identify mistakes like writing mangled keys to storage.

