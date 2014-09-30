# rcss.js

Sometimes you want to apply styles with JavaScript. Sometimes you need them to be responsive.

At this point you’ll realise JavaScript won’t be much of a help.

**rcss.js** is a little library that does exactly that; it generates responsive stylesheets at run-time.

# Usage

Create new style element, with media query:

```JavaScript
var style new RCSS.Style('not print');
```

Add a new CSS block:

```
style.add('.my-selector', {
	display: 'none'
});
```

Create media query block:

```JavaScript
var mq = style.createQuery('(min-width: 36rem)')
```

Adding a CSS block to that media query:

```JavaScript
mq.add('.my-selector', {
	display: 'block'
});
```

If you’re into chaining:

```JavaScript
style.createQuery('(min-width: 36rem)')
	.add('.my-selector', {
    	display: 'block'
	})

    .add('.another-selector', {
    	width: (window.innerWidth / 2) + 'px'
    });
```

That’s all for now!
