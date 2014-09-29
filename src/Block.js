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

