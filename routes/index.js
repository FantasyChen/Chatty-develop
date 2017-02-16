var data = require('../data.json');

exports.view = function(req, res) {
  console.log(data);
  res.render('index',data);
};
