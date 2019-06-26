var http = require('http');
var fs = require("fs");
var qs = require('querystring');
const MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://ecom_admin:admin@ecom-member-vcel9.mongodb.net/test?retryWrites=true&w=majority";
var dbUrl = "mongodb+srv://ecom_admin:admin@ecom-member-vcel9.mongodb.net/test?retryWrites=true&w=majority";
var dbname = "ecom";
var isLogin = false;

http.createServer(function(request, response) {

    if (request.url === "/") {
        console.log("Request index page success");
        sendFileContent(response, "index.html", "text/html");
    } else if (request.url === "/register") {
        console.log("Request" + request.url + " success");
        sendFileContent(response, "register.html", "text/html");
    } else if (request.url === "/api/signup") {
        if (request.method === "POST") {
            console.log("Registing account");
            formData = '';
            msg = '';
            return request.on('data', function(data) {

                //Get the register info
                formData += data;
                regit = formData.split("&");

                return request.on('end', function() {
                    var user;
                    user = qs.parse(formData);
					msg = JSON.stringify(user);
					
					var collection = "member";

					// checkExist(dbname, collection, "email", regit[2]);

					console.log(checkExist(dbname, collection, "Name", regit[0]));
				
					// if (valueExist == false) {
					// 	var myobj = { Name: regit[0], password: regit[1], email: regit[2] };

					// 	insertData(dbname, collection, myobj);
					// }
	
                    // MongoClient.connect(dbUrl, function(err, db) {
						
					// 	if (err) throw err;

					// 	var dbo = db.db(dbname);

                    //     // dbo.collection("member").find( {"Name": regit[0]} ).toArray(function(err, result) {
					// 	// 	if (result && result.length) {
					// 	// 		console.log("Name is already existed");
					// 	// 		response.end("Reg Failed");
					// 	// 	} else {
								
					// 	// 	}

					// 	// 	dbo.collection("member").insertOne(myobj, function(err, res) {
					// 	// 		if (err) {
									
					// 	// 		} else {
					// 	// 			console.log("1 member regist success");
					// 	// 			isLogin = true;
					// 	// 		}
					// 	// 	});
                    //     db.close();
                    //     // });
                    // });
                });
            });
        } else {
            //form = publicPath + "ajaxSignupForm.html";
            sendFileContent(response, "index.html", "text/html");
        }

    } else if (request.url === "/api/signin") {
        if (request.method === "POST") {
            console.log("Login action");
            formData = '';
            msg = '';
            return request.on('data', function(data) {
                formData += data;

                info = formData.split("&");
                console.log("name : " + info[0] + "pw : " + info[1]);

                return request.on('end', function() {
                    var user;
                    user = qs.parse(formData);
                    msg = JSON.stringify(user);

                    MongoClient.connect(dburl, function(err, db) {
						if (err) throw err;

						var dbo = db.db(dbname);
						
                        var query = { login: info[0], password: info[1] };
                        dbo.collection("member").find(query).toArray(function(err, result) {

                            if (!err) {
                                response.end("success");
                                console.log("login success, account: " + info[0]);
                                isLogin = true;

                                var array = [];

                                for (i = 0; i < result.length; i++) {
                                    array.push(result[i].login);
                                }

                                console.log(array.toString());

                            } else {
                                response.end("failed");
                                isLogin = false;

                                throw err;
                            }

                            console.log(isLogin);
                            db.close();

                        });
                    });
                });
            });
        } else {
            sendFileContent(response, "index.html", "text/html");
        }
    } else if (/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.js$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "text/javascript");
    } else if (/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.css$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "text/css");
    } else if (/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.jpg$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "text/jpg");
    } else if (/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.png$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "text/png");
    } else if (/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.min.js$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "text/javascript");
    } else if (/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.min.css$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "text/css");
    } else if (/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.tff$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "text/css");
    } else if (/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.*$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "text/css");
    } else {
        console.log("Requested URL is: " + request.url);
        response.end();
    }
}).listen(9000)

function sendFileContent(response, fileName, contentType) {
    fs.readFile(fileName, function(err, data) {
        if (err) {
            response.writeHead(404);
            response.write("Not Found!");
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.write(data);
        }
        response.end();
    });
}

function checkExist(dbname, collection, field, value)  {
	MongoClient.connect(dbUrl, function(err, db) {
						
		if (err) throw err;

		var dbo = db.db(dbname);

		var count = dbo.collection(collection).find( { [field] : value} ).count();

		console.log("count: " + count);

		var result; 
		dbo.collection(collection).find( { [field] : value} ).count().then((val)=>result=val);

		// var result = new Promise( (exist, notexist) => {
		// 	exist(true);
		// 	notexist(false);
		// });

		// result.then( (val) => {
		// 	if ( count > 0) {
		// 		val = true;
		// 	} else {
		// 		val = false;
		// 	}
		// 	console.log("val: " + val);
		// 	return val;
		// });
		

		// dbo.collection(collection).find( { [field] : value} ).count();

		console.log("result: " + result);

		db.close();

	});
}

function insertData(dbname, collection, data) {
	MongoClient.connect(dbUrl, function (err, db) {

		if (err) throw err;

		var dbo = db.db(dbname);

		dbo.collection("member").insertOne(data, function (err, res) {

			if (err) throw err;
			
			console.log("member regist success");
			isLogin = true;
			
		});

		db.close();

	});
}