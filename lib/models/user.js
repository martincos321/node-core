var User = function (data) {
  	this.about 			= data.about || undefined;
	this.avatar			= data.avatar || undefined;
	this.avatarUrl		= (data.avatar)? config.statics.cdnImagesPath + "/avatares/"+data.avatar.substring(0,1)+"/"+data.avatar.substring(0,2)+"/"+data.avatar+"-140x140.jpg" : config.statics.cdnAssetsPath + "/img/av_default.png";
	this.birthDate		= data.birthDate || undefined;
	this.canShowCity	= data.canShowCity || undefined;
	this.createdAt		= data.createdAt || undefined;
	this.fullName		= data.fullName || undefined;
	this.gender			= data.gender || undefined;
	this.id				= data.id || undefined;
	this.lastActivity	= data.lastActivity || undefined;
	this.link			= data.link || undefined;
	this.location		= data.location || undefined;
	this.quote			= data.quote || undefined;
	this.signature		= data.signature || undefined;
	this.status			= data.status || undefined;
	this.title			= data.title || undefined;
	this.updatedAt		= data.updatedAt || undefined;
	this.username		= data.username || undefined;
	this.verified		= data.verified || undefined;
	this.isAdmin        = (!data.role)? false : (data.role.name == "User")? false : true;

  return this;
};

module.exports = User;