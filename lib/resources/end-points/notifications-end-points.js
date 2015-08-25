/**
 *
 * @type {{all: string, detail: string}}
 */

var config = require('../../config/core-config');

exports.notifications = {
	getNotifications: { method:'get', path: config.api.basePath + "/getNotifications" },
	replyFriendRequest: { method:'get', path: config.api.basePath + "/replyFriendRequest" },
	deleteItem: { method:'get', path: config.api.basePath + "/deleteItem" },
	moveItem: { method:'get', path: config.api.basePath + "/moveItem" }
}


