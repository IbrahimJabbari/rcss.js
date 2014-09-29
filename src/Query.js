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