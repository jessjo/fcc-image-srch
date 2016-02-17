'use strict';

var Search = require('bing.search');


module.exports = function (app) {
app.route('/app/imgs/:query')
  .get(function (req, res) {
    var userSearch = req.params.query;
  
  //Get offset parameter. If there is no offset parameter, offset is 0.
    var offset = req.param("offset") 
    if (offset === undefined){
      offset = 0;
    }
    console.log(offset);
    console.log("search is " + userSearch);
    var search = new Search(process.env.API_KEY);
    var searchResults =[];
    search.images(userSearch,
      {top:10, skip:offset},
      function(err, results) {
        if (err) throw err;
        for(var i=0; i<results.length; i++){
          searchResults[i] ={
           snippet: results[i].title,
           thumbnail: results[i].url,
           url: results[i].sourceUrl
          };
          console.log(searchResults[i]);
        }
        // cycle through results for correct info 
        
    }
);
    res.sendFile(process.cwd() + '/public/index.html');
});

};