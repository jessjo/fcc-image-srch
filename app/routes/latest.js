'use strict';



module.exports = function (app, db) {
app.route('/app/latest/')
  .get(function (req, res) {
   // var pageArr = [];
    getArr(app,db, res);

 // res.send("success");
});

};


function getArr (app, db, res){
  var searchDB = db.collection('imgs');
   var i =0;
   searchDB.find({$query: {}, $orderby: {$natural : -1}},function(err, items) {
  
                 if(err) throw err;
  
                 items.toArray(function(err, items) {
                   if (err) throw err;
                   
                   res.send(items.slice(0,5));
                   });
             });

}
