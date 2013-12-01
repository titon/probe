# Titon Probe v0.2.0 #

Extends the JS native prototypes with Lo-Dash (or Underscore) methods.

### Usage ###

Add Probe to your Bower dependencies. Be sure to include Lo-Dash or Underscore in Bower or include locally.

```
"dependencies": {
    "probe": "*",
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

Now the built-in natives like String, Array, Object can use Lo-Dash functionality.