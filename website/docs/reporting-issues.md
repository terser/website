---
id: reporting-issues
title: Reporting Issues
sidebar_label: Reporting Issues
---


## A minimal, reproducible example

You're expected to provide a [minimal reproducible example] of input code that will demonstrate your issue.

To get to this example, you can remove bits of your code and stop if your issue ceases to reproduce.

## Obtaining the source code given to Terser

Because users often don't control the call to `await minify()` or its arguments, Terser provides a `TERSER_DEBUG_DIR` environment variable to make terser output some debug logs.

These logs will contain the input code and options of each `minify()` call.

```bash
TERSER_DEBUG_DIR=/tmp/terser-log-dir command-that-uses-terser
ls /tmp/terser-log-dir
terser-debug-123456.log
```

If you're not sure how to set an environment variable on your shell (the above example works in bash), you can try using cross-env:

```
> npx cross-env TERSER_DEBUG_DIR=/path/to/logs command-that-uses-terser
```

## Stack traces

In the terser CLI we use [source-map-support](https://npmjs.com/source-map-support) to produce good error stacks. In your own app, you're expected to enable source-map-support (read their docs) to have nice stack traces that will help you write good issues.

