/*
 * Object.create polyfill by Mozilla
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
*/

if(typeof Object.create !== 'function') {
	Object.create = (function() {
		var Object = function() {};
		
		return function (prototype) {
			if(arguments.length > 1) {
				throw Error('Second argument not supported');
			}
			
			if(typeof prototype !== 'object') {
				throw TypeError('Argument must be an object');
			}
			
			Object.prototype = prototype;
			
			var result = new Object();
			Object.prototype = null;
			
			return result;
		};
	})();
}

var RCSS = {};
/**
 * A node that can contain blocks of CSS code
 * @class
 * @param {RCSS.BlockContainer} [parent] A parent block container
 */
RCSS.BlockContainer = function(parent) {
	this.blocks = [];
	this.parent = parent;
};

/**
 * Creating a new media query
 * @param   {String}     query A valid CSS media query
 * @returns {RCSS.Query} A RCSS.Query object
 */
RCSS.BlockContainer.prototype.createQuery = function(query) {
	var q = new RCSS.Query(query, this);
	this.blocks.push(q);
	
	return q;
};

/**
 * Adding a CSS block
 * @param   {String}              selector   A CSS selector
 * @param   {Object}              properties An object of CSS properties
 * @returns {RCSS.BlockContainer} The current instance
 */
RCSS.BlockContainer.prototype.add = function(selector, properties) {
	if(typeof selector !== 'string' || selector.length === 0) {
		console.error('Selector must be a non-empty string.');
		return this;
	}
	
	if(typeof properties !== 'object') {
		console.error('Properties must be an object.');
		return this;
	}
	
	this.blocks.push(new RCSS.Block(selector, properties));
	this.inject();
	
	return this;
};

/**
 * Inject parent
 */
RCSS.BlockContainer.prototype.inject = function() {
	if(this.parent) this.parent.inject();
};

/**
 * Converts the blocks to a string
 * @returns {String} CSS blocks
 */
RCSS.BlockContainer.prototype.toString = function() {
	var str = [];
	var i;
	
	for(i = 0; i < this.blocks.length; i++) {
		str.push(this.blocks[i].toString());
	}
	
	return str.join('');
};
/**
 * A CSS style object
 * @param {String} [media] A valid CSS media query
 */
RCSS.Style = function(media) {
	RCSS.BlockContainer.call(this);
	
	this.element = document.createElement('style');
	this.element.type = 'text/css';
	
	if(media) this.element.setAttribute('media', media);
};

RCSS.Style.prototype = Object.create(RCSS.BlockContainer.prototype);

/**
 * Injects the style element to DOM
 */
RCSS.Style.prototype.inject = function() {
	if(!this.element.parentNode) {
		document.body.appendChild(this.element);
	}
	
	this.element.innerHTML = this.toString();
};

/**
 * Enables the style element
 */
RCSS.Style.prototype.enable = function() {
	this.element.disabled = false;
};

/**
 * Disables the style element
 */
RCSS.Style.prototype.disable = function() {
	this.element.disabled = true;
};

/**
 * Removes the style element
 */
RCSS.Style.prototype.destroy = function() {
	if(this.element.parentNode) {
		document.body.removeChild(this.element);
	}
};
/**
 * An object containing a CSS media query
 * @param {String}              query    A valid media query
 * @param {RCSS.BlockContainer} [parent] An optional parent
 */
RCSS.Query = function(query, parent) {
	RCSS.BlockContainer.call(this, parent);
	this.query = query;
};

RCSS.Query.prototype = Object.create(RCSS.BlockContainer.prototype);

/**
 * Converts the media query (and contents) to a string
 * @returns {String} CSS code
 */
RCSS.Query.prototype.toString = function() {
	var content = RCSS.BlockContainer.prototype.toString.call(this);
	return '@media ' + this.query + '{' + content + '}';
};
/**
 * A CSS block
 * @class
 * @param {String} selector   A CSS selector
 * @param {Object} properties An object of properties and values
 */
RCSS.Block = function(selector, properties) {
	this.selector = selector;
	this.properties = properties;
};

/**
 * Convert the CSS block to a string
 * @returns {String} The CSS string
 */
RCSS.Block.prototype.toString = function() {
	var str = [];
	var k;
	
	for(k in this.properties) {
		if(!this.properties.hasOwnProperty(k)) continue;
		str.push(k + ':' + this.properties[k] + ';');
	}
	
	return this.selector + '{' + str.join('') + '}';
};

