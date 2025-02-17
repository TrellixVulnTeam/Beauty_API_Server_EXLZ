const message = require('../message');
var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
    user : 'root',
    password : '159753', 
    database : 'BeautyProject', 
    host : 'localhost'
});

router.get('/', function(req, res, next) {
	connection.query('select * from category;', function (error, cursor) {
		if (error) res.status(message.code(11)).json(message.json(11));
		
		if (cursor.length > 0) {
			var results = [];
			var before_main = null;
			var object;
			cursor.forEach(function (item){
				if(before_main != item.main_category){
					if(before_main != null) results.push(object);
					object = {
						'main_category': item.main_category,
						'sub_category': []
					};
				}
				object.sub_category.push(item.sub_category);
				before_main = item.main_category;
			});
			results.push(object);
			res.status(message.code(0)).json(results);
		} else res.status(message.code(9)).json(message.json(9));
    });
});

module.exports = router;
