# Titon Probe v0.4.1 #

Extends the native prototypes with functions from Lo-Dash, Underscore, or another vendor.

This allows for the following code:

```
_.uniq(_.flatten([1, 2, [2], 3, 2])); // => [1, 2, 3]
```

To be written as:

```
[1, 2, [2], 3, 2].flatten().uniq(); // => [1, 2, 3]
```

### Using In Node.js ###

Add Probe to your NPM `package.json`.

```
"dependencies": {
    "titon-probe": "*"
}
```

Install the dependencies from the command line.

```
npm install
```

Include the module in your script.

```
var probe = require('titon-probe'),
    _ = probe._, // lodash/underscore
    _s = probe._s; // underscore.string
```

### Using With Bower ###

Add Probe to your Bower `bower.json`.

```
"dependencies": {
    "probe": "*"
}
```

Install the dependencies from the command line.

```
bower install
```

Include the scripts in your application. Probe must come after Lo-Dash.

```
<script src="bower_components/lodash/dist/lodash.min.js" type="text/javascript"></script>
<script src="bower_components/probe/dist/probe.min.js" type="text/javascript"></script>
```

### Running Tests ###

To validate Probe is working with a specific vendor, run the following command from the project root.

```
mocha -R spec --recursive
```