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