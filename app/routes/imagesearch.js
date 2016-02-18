'use strict';

var Search = require('bing.search');
var moment = require('moment');


module.exports = function (app,db) {
app.route('/app/imgs/:query')
  .get(function (req, res) {
    var userSearch = req.params.query;
  
  //Get offset parameter. If there is no offset parameter, offset is 0.
    var offset = req.param("offset") 
    if (offset === undefined){
      offset = 0;
    }
    var search = new Search(process.env.API_KEY);
    var searchResults =[];
   
   //log that search was made
     db.collection('imgs').insert({term: userSearch, when:moment().format('MMMM Do YYYY, h:mm:ss a')   }, function (err, res1) {
            if (err) {
                throw err;
            }
        });
   
   
   //search
   
    search.images(userSearch,
      {top:5, skip:offset},
      function(err, results) {
        if (err) throw err;
        //filter through results for relevant data (Url, title, image url)
        for(var i=0; i<results.length; i++){
          searchResults[i] ={
           snippet: results[i].title,
           thumbnail: results[i].url,
           url: results[i].sourceUrl
          };
  
        }
         res.send(searchResults);
        // cycle through results for correct info        
    }
);
   
});

};