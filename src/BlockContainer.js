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