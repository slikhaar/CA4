var mongoose = require("mongoose");
require("./db");
var wiki = mongoose.model("wiki");


function _getWiki(t,callback){
    wiki.find({title: t},function(err,allwiki){
        if(err){
            return callback(err);
        }
        callback(null,allwiki);
    });
}


function _findWiki(searchString,callback){
    wiki.findOne({title:searchString},function(err,wiki){
        if(err){
            return callback(err);
        }
        callback(null,wiki);
    });
}

function _getCategories(callback){
    wiki.distinct("categories",function(err,allwiki){
        if(err){
            return callback(err);
        }

        callback(null,allwiki);
    });
}


function _getWikisWithCategory(cat, callback) {
    wiki.find({categories:cat},function (err, allWiki) {
        if (err) {
            return callback(err);
        }
        callback(null, allWiki);
    });
}



module.exports = {
    getWiki : _getWiki,
    findWiki : _findWiki,
    getCategories : _getCategories,
    getWikisWithCategory : _getWikisWithCategory
}




//if(wiki.length === 0){
//    return callback(null,null);
//}
//var res = [];
//for (index = 0; index < allWiki.length; index++)
//{
//    var wiki = allWiki[index];
//  if(wiki.title.toLowerCase().indexOf(searchString.toLowerCase()) >= 0 ||
//      wiki.abstract.toLowerCase().indexOf(searchString.toLowerCase()) >= 0)
//  {
//      //console.log(wiki.title + " " + wiki.abstract);
//      res.push({title : wiki.title, abstract : wiki.abstract});
//  }
//}