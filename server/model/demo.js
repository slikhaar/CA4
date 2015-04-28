var facade = require("./wikiFacade");

//
facade.getWiki("Bush Alaska",function(err,data){
    console.log(data);
})
//
//facade.findWiki("Alaska",function(err,data){
//    console.log(data);
//})

//facade.getCategories("2001 albums",function(err,data){
//    console.log(data);
//})
