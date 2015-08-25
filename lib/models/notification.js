

var Notifications = function(data){
    this.id 		= data.id || "";
    this.userId 	= data.userId || "";
    this.objectId 	= data.objectId || "";
    this.text     	= data.text || "";
    this.title     	= (data.title)? data.title : (data.subject)? data.subject : "";
    this.createdAt	= data.createdAt || "";
    this.fromId 	= data.fromId || "";
    this.toId 		= data.toId || "";
	this.type 		= data.type || "";
	this.subtype    = data.subtype || "";
	this.unread		= (typeof data.unread == "undefined")? false : data.unread;
	this.link		= data.link || "";
	this.users = [];

    return this;
};

module.exports = Notifications;