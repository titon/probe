# Titon Probe v0.3.0 #

Extends the JS native prototypes with Lo-Dash (or Underscore) methods. This allows the following code

```
    _.uniq(_.flatten([1, 2, [2], 3, 2])); // => [1, 2, 3]
```

to be written as:

```
    [1, 2, [2], 3, 2].flatten().uniq(); // => [1, 2, 3]
```


### Usage ###

Add Probe to your Bower dependencies. Be sure to include Lo-Dash or Underscore in Bower or include locally.

```
"dependencies": {
    "lodash-probe": "*",
    "lodash": "*"
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

To use with Node.js:

```
"dependencies": {
    "lodash-probe": "*"
}
```

```
var _ = require('lodash-probe');
```

Now the built-in natives like String, Array, Object can use Lo-Dash functionality.