rcss.js
====

Sometimes you want to apply styles with JavaScript. This can conflict with your responsive styles.

For example:

```JavaScript
var list_items = document.querySelectorAll('.list__item');
var height = 0;
var i;

for(i = 0; i < list_items.length; i++) {
	height = Math.max(list_items[i].clientHeight, height);
}

for(i = 0; i < list_items.length; i++) {
	list_items[i].style.height = height + 'px';
}
```

This script would run fine — until you decide to change your device’s orientation.

![Problem](http://i.imgur.com/vEPKCuj.gif)

**rcss.js** is a little library that generates responsive stylesheets at run-time, saving you a headache.

```JavaScript
var list_items = document.querySelectorAll('.list__item');
var height = 0;
var i;

for(i = 0; i < list_items.length; i++) {
	height = Math.max(list_items[i].clientHeight, height);
}

var style = new RCSS.Style();

style.createQuery('(min-width: 60em)')
	.add('.list__item', { height: height });
```
Problem solved!

For more examples, look at the [examples folder](https://github.com/timseverien/rcss.js/tree/master/examples).

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