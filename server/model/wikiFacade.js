var mongoose = require("mongoose");
require("./db");
var wiki = mongoose.model("wiki");


function _getWiki(t,callback){
    wiki.find({title: t},function(err,allwiki){
        console.log("AAA:"+allwiki+ "  ,"+t);
        if(err){
            return callback(err);
        }
        if(allwiki.length === 0){
            return callback(null,null);
        }
        callback(null,allwiki);
    });
}

function _getCategories(t,callback){
    wiki.find({categories: t},function(err,allwiki){
      //  console.log("AAA:"+allwiki+ "  ,"+t);
        if(err){
            return callback(err);
        }
        if(allwiki.length === 0){
            return callback(null,null);
        }
        callback(null,allwiki);
    });
}



//function _getCategories(cat, callback) {
//    wiki.find(function (err, allWiki) {
//        if (err) {
//            return callback(err);
//        }
//        if (allWiki.length === 0) {
//            return callback(null, null);
//        }
//        var res = [];
//        for (index = 0; index < allWiki.length; index++) {
//            var wiki = allWiki[index];
//            if (wiki.categories.toLowerCase().indexOf(cat.toLowerCase()) >= 0) {
//                res.push({categories: wiki.categories});
//            }
//        }
//        callback(null, res);
//    });
//}




function _findWiki(searchString,callback){
    wiki.find(function(err,allWiki){
        if(err){
            return callback(err);
        }
        if(allWiki.length === 0){
            return callback(null,null);
        }
        var res = [];
        for (index = 0; index < allWiki.length; index++)
        {
            var wiki = allWiki[index];
          if(wiki.title.toLowerCase().indexOf(searchString.toLowerCase()) >= 0 ||
              wiki.abstract.toLowerCase().indexOf(searchString.toLowerCase()) >= 0)
          {
              //console.log(wiki.title + " " + wiki.abstract);
              res.push({title : wiki.title, abstract : wiki.abstract});
          }
        }
        callback(null,res);
    });
}

module.exports = {
    getWiki : _getWiki,
    findWiki : _findWiki,
    getCategories : _getCategories
}

