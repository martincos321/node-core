var Search = function(data){
    data                = data || {};
    this.page           = data.page || data.offset / data.limit || 1;
    this.categoryId     = data.categoryId || "";
    this.id             = data.id || "";
    this.fromId         = data.fromId || "";
    this.limit          = (typeof data.limit !== "undefined")? data.limit.toString() : "5";
    this.offset         = (typeof data.offset !== "undefined")? data.offset.toString() : "0";
    this.total          = data.total || "0";
    this.years          = data.years || undefined;
    this.months         = data.months || undefined;
    this.lang           = data.lang || undefined;
    this.created_at_read= data.created_at_read || undefined;
	// userID
    return this;
};

module.exports = Search;