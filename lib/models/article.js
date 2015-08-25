

var Articles = function(data){
    this.id = data.id;
    this.title = data.title;
    this.lead = data.crest;
    this.body = data.body;
    this.coverpictureurl = data.coverpictureurl;
    this.categoryId = data.categoryId;
    this.comments = data.comments || 0;
    this.previewImages = [];

    return this;
};

module.exports = Articles;