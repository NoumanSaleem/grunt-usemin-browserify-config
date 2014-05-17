Testing dynamic browserify config using grunt-usemin.

Checks for a comment block `<!-- alias:...` inside the usemin block to declare certain modules as externally availble.

```javascript
<!-- build:js scripts/vendor.js -->
<!-- alias:moment,jquery,jquery.cookie -->
<script src="bower_components/moment/moment.js"></script>
<script src="bower_components/jquery/dist/jquery.js"></script>
<!-- endbuild -->
```
