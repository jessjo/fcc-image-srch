'use strict';

module.exports = function (app) {
app.route('/app/latest/')
  .get(function (req, res) {
    console.log("latest request");
    res.sendFile(process.cwd() + '/public/index.html');
});

};
