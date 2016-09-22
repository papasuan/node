var http = require('http');
var items = [];

var server = http.createServer(function(req , res){
         if('/' == req.url){
         	switch (req.method){
         		case 'GET':
         		 show(res);
         		 break;

         		 case 'POST':
         		 add(req , res);
         		 break;

         		 default:
         		 badRequest(res);
         	}
         }else{
         	notFound(res);
         }
});

server.listen(3000);


function show(res) {
	  var html = '<html><head><title>asdasd</title></head><body>'
	           + '<h1>todo list</h1>'
	           + '<ul>'
	           + items.map(function(item){
	           	    return '<li>' +item+ '</li>'
	           }).join('')
	           + '</ul>'
	           + '<form method = "POST" action = "/">'
	           + '<p><input type = "text" name = "item" /></p>'
	           + '<p><input type = "submit" value = "ADD"/></p>'
	           + '</form></body></html>';

	           res.setHeader('Content-Type' , 'text/html');
	           res.setHeader('Content-Type' , Buffer.byteLength(html));
	           res.end(html);
}


var qs = require('querystring');

function add(req , res){
	  var body = '';
	  req.setEncoding('utf-8');
	  req.on('data' , function(chunk){body += chunk});
	  req.on('end' , function(){
	  	  var obj = qs.parse(body);
	  	  items.push(obj.item);
	  	  show(res);
	  });
}
