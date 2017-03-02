// var data = require("../contact.json");
var fs = require('fs');
exports.contact = function(req, res) {
  res.render('contact');
}


exports.submit = function(req, res) { 
  var newContact = {};
  // console.log(req);
  console.log(req.query);
  // console.log(req.body);
  newContact.email = req.query.email;
  newContact.topic = req.query.topic;
  newContact.detail = req.query.detail;
  // var array = {};
  fs.readFile('./contact.json', 'utf-8',function(err, data){
    if (err) throw err
    var array = JSON.parse(data);
    console.log(array);
    console.log(newContact);
    console.log(array.contacts);
    array.contacts.push(newContact);
    array.contacts.push(newContact);
    console.log(JSON.stringify(array) + "*********************" + array.contacts);
    fs.writeFile('./contact.json', JSON.stringify(array),'utf8', function(err) {
      if (err) throw err;
      console.log('done!');
    })
  });


  console.log(newContact);
  // data.contacts.push(newContact);
  res.redirect('/contact');
  // res.redirect(newContact);
	// Your code goes here
 }
