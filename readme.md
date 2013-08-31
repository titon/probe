# Titon Probe v0.1.0 #

Extends the JS prototype with Lo-Dash (or Underscore) methods.

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
<script src="bower_components/probe/build/probe.min.js" type="text/javascript"></script>
```