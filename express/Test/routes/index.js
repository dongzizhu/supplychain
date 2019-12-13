var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */

router.get('/', function(req, res, next) {

  var obj = {"contractName": "SupplyChainV1", "funcName": "institutionMap", "user": "0x0c77e5d02fc46272beaa53ff5e30581a0772909d", "useAes": false, "contractAddress":"0x9de1fc13eb8691171fe602d9a67ab03f9a572f28", "funcParam":["0x0c77e5d02fc46272beaa53ff5e30581a0772909d"], "groupId": 1};
  var data = JSON.stringify(obj);
  var options = {
	hostname: '127.0.0.1',
	port: 5002,
	path: '/WeBASE-Front/trans/handle',
	method: 'POST',
	headers:{"Content-type":"application/json"}
  };


console.log('here1');

var req = http.request(options, function (res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  //JSON.parse(chunk)
  });
});
req.on('error', function (e) {
  console.log('problem with request: ' + e.message);
});
// write data to request body
req.write(data);
req.end();


  res.render('index', { title: 'myExpress' , uname: 'myExpress'});
});


var userAddress = '0x0c77e5d02fc46272beaa53ff5e30581a0772909d';
var contractAddress = '0x5d3eb5f937824ff433d2202e2ceca03b9d67ff20';
var contractName = 'SupplyChainV3';
var uname = 'no one';
var property = 0;
	
// home
router.get('/home', function(req, res){
	res.render('home', {title: 'home of ' + uname + ', you have $' + property});
});
router.post('/home', function(req, res){
	var newAddress = req.body.address;
	userAddress = newAddress;
	
	var obj = {"contractName": contractName, "funcName": "institutionMap", "user": userAddress, "useAes": false, "contractAddress":contractAddress, "funcParam":[userAddress], "groupId": 1};
	  var data = JSON.stringify(obj);
	  var options = {
		hostname: '127.0.0.1',
		port: 5002,
		path: '/WeBASE-Front/trans/handle',
		method: 'POST',
		headers:{"Content-type":"application/json"}
	  };

	var req = http.request(options, function (r) {
	  //console.log('STATUS: ' + res.statusCode);
	  //console.log('HEADERS: ' + JSON.stringify(res.headers));
	  r.setEncoding('utf8');
	  r.on('data', function (chunk) {
	    console.log('BODY: ' + JSON.parse(chunk)[0]);
	    uname = JSON.parse(chunk)[0];
	    property = JSON.parse(chunk)[3];
	    //alert('already changed to ' + userAddress);
	    console.log(userAddress);
	    //res.render('home', {title: 'welcome home '+ name + ', you have $' + property});
	    res.render('home', {title: 'welcome home '+ uname + ', you have $' + property});
	  });
	});
	req.on('error', function (e) {
	  console.log('problem with request: ' + e.message);
	});
	// write data to request body
	req.write(data);
	req.end();
			
	
});


//newAccount
router.get('/newAccount', function(req, res){
	res.render('newAccount', {title: 'newAccount for ' + uname});
});
router.post('/newAccount', function(req, res){	
	var cname = req.body.cname,
    	property = req.body.property,
    	institutionType = req.body.institutionType;
	userAddress = req.body.address;

	var para = [];
	para.push(userAddress);
	para.push(cname);
	para.push(property);
	para.push(institutionType);
	
	var post_data = {
	   "useAes":false,
	   "user":userAddress,
	   "contractName":contractName,
	   "contractAddress":contractAddress,
	   "funcName":"institutionAddInChain",
	   "funcParam":para,
	   "groupId" :"1"
	};   
	console.log(post_data);
	 
	var content=JSON.stringify(post_data);

	var options = {
	   hostname: '127.0.0.1',
	   port: 5002,
	   path: '/WeBASE-Front/trans/handle',
	   method: 'POST',
	   headers:{"Content-type":"application/json"}
	};
	
	var req = http.request(options, function(res) {
	  console.log("STATUS: ", res.statusCode);
	  console.log("HEADERS: ", res.headers);
	 
	  var _data='';
	 
	  res.on('data', function(chunk){
	     _data += chunk;
	  });
	 
	  res.on('end', function(){
	      var results = JSON.parse(_data);
	      var returnValue = results.logs;
	      
	      if(returnValue[0] == undefined)
		console.log('fail!');
	      else
		console.log('success!');
	      //console.log("\n--->>\nRESULTS:",_data) 
	  });
	 });

	req.on('error', function (e) {
  	  console.log('problem with request: ' + e.message);
	});
	req.write(content);
	req.end();
	res.redirect('/newAccount');

});


// pay
router.get('/pay', function(req, res){
	res.render('pay', {title: 'pay for ' + uname});
});


router.post('/pay', function(req, res){
	var rid = req.body.receiptID,
    	rc = req.body.receiveCompany;

	var para = [];
	para.push(userAddress);
	para.push(rid);
	para.push(rc);
	
	var post_data = {
	   "useAes":false,
	   "user":userAddress,
	   "contractName":contractName,
	   "contractAddress":contractAddress,
	   "funcName":"payMoney",
	   "funcParam":para,
	   "groupId" :"1"
	};   
	console.log(post_data);
	 
	var content=JSON.stringify(post_data);

	var options = {
	   hostname: '127.0.0.1',
	   port: 5002,
	   path: '/WeBASE-Front/trans/handle',
	   method: 'POST',
	   headers:{"Content-type":"application/json"}
	};
	
	var req = http.request(options, function(res) {
	  console.log("STATUS: ", res.statusCode);
	  console.log("HEADERS: ", res.headers);
	 
	  var _data='';
	 
	  res.on('data', function(chunk){
	     _data += chunk;
	  });
	 
	  res.on('end', function(){
	      var results = JSON.parse(_data);
	      var returnValue = JSON.parse(results.logs);
	      
	      if(returnValue[0] == undefined)
		console.log('fail!');
	      else
		console.log('success!');
	      //console.log("\n--->>\nRESULTS:",_data) 
	  });
	 });

	req.on('error', function (e) {
  	  console.log('problem with request: ' + e.message);
	});
	req.write(content);
	req.end();

	res.render('pay', {title: 'pay for ' + uname});
});


// transfer
router.get('/transfer', function(req, res){
	res.render('transfer', {title: 'transfer for ' + uname});
});

router.post('/transfer', function(req, res){
	var rid = req.body.receiptID,
    	rc = req.body.receiveCompany,
	amount = req.body.amount;

	var para = [];
	para.push(userAddress);
	para.push(rid);
	para.push(rc);
	para.push(amount);
	
	var post_data = {
	   "useAes":false,
	   "user":userAddress,
	   "contractName":contractName,
	   "contractAddress":contractAddress,
	   "funcName":"receiptTransfer",
	   "funcParam":para,
	   "groupId" :"1"
	};   
	console.log(post_data);
	 
	var content=JSON.stringify(post_data);

	var options = {
	   hostname: '127.0.0.1',
	   port: 5002,
	   path: '/WeBASE-Front/trans/handle',
	   method: 'POST',
	   headers:{"Content-type":"application/json"}
	};
	
	var req = http.request(options, function(res) {
	  console.log("STATUS: ", res.statusCode);
	  console.log("HEADERS: ", res.headers);
	 
	  var _data='';
	 
	  res.on('data', function(chunk){
	     _data += chunk;
	  });
	 
	  res.on('end', function(){
	      var results = JSON.parse(_data);
	      var returnValue = JSON.parse(results.logs);
	      
	      if(returnValue[0] == undefined)
		console.log('fail!');
	      else
		console.log('success!');
	      //console.log("\n--->>\nRESULTS:",_data) 
	  });
	 });

	req.on('error', function (e) {
  	  console.log('problem with request: ' + e.message);
	});
	req.write(content);
	req.end();



	res.render('transfer', {title: 'transfer for ' + uname});
});


// puchase
router.get('/purchase', function(req, res){
	res.render('purchase', {title: 'purchase for ' + uname});
});
router.post('/purchase', function(req, res){	
	var amount = req.body.amount,
    	producer = req.body.producer,
    	sellDate = req.body.sellDate,
	expireDate = req.body.expireDate,
	id = req.body.RID;
	var para = [];
	para.push(id);
	para.push(userAddress);
	para.push(producer);
	para.push(sellDate);
	para.push(expireDate);
	para.push(amount);
	
	var post_data = {
	   "useAes":false,
	   "user":userAddress,
	   "contractName":contractName,
	   "contractAddress":contractAddress,
	   "funcName":"purchase",
	   "funcParam":para,
	   "groupId" :"1"
	};   
	console.log(post_data);
	 
	var content=JSON.stringify(post_data);

	var options = {
	   hostname: '127.0.0.1',
	   port: 5002,
	   path: '/WeBASE-Front/trans/handle',
	   method: 'POST',
	   headers:{"Content-type":"application/json"}
	};
	
	var req = http.request(options, function(res) {
	  console.log("STATUS:: ", res.statusCode);
	  console.log("HEADERS: ", res.headers);
	 
	  var _data='';
	 
	  res.on('data', function(chunk){
	     _data += chunk;
	  });
	 
	  res.on('end', function(){
	      //console.log("\n--->>\nRESULTS:",_data) ;
	      var results = JSON.parse(_data);
	      var returnValue = results.logs;
	      
	      if(returnValue[0] == undefined)
		console.log('fail!');
	      else
		console.log('success!');
	      
	  });
	 });

	req.on('error', function (e) {
  	  console.log('problem with request: ' + e.message);
	});
	req.write(content);
	req.end();
	res.redirect('/purchase');

});


// financing
router.get('/finance', function(req, res){ 
	res.render('finance', {title: 'finance for ' + uname});
});

router.post('/finance', function(req, res){
	var rc = req.body.receiveCompany,
	amount = req.body.amount;

	var para = [];
	para.push(userAddress);
	para.push(rc);
	para.push(amount);
	
	var post_data = {
	   "useAes":false,
	   "user":userAddress,
	   "contractName":contractName,
	   "contractAddress":contractAddress,
	   "funcName":"getFinancing",
	   "funcParam":para,
	   "groupId" :"1"
	};   
	console.log(post_data);
	 
	var content=JSON.stringify(post_data);

	var options = {
	   hostname: '127.0.0.1',
	   port: 5002,
	   path: '/WeBASE-Front/trans/handle',
	   method: 'POST',
	   headers:{"Content-type":"application/json"}
	};
	
	var req = http.request(options, function(res) {
	  console.log("STATUS: ", res.statusCode);
	  console.log("HEADERS: ", res.headers);
	 
	  var _data='';
	 
	  res.on('data', function(chunk){
	     _data += chunk;
	  });
	
	  res.on('end', function(){
	      var results = JSON.parse(_data);
	      var returnValue = JSON.parse(results.logs);
	       
	      if(returnValue[0] == undefined)
		console.log('fail!');
	      else
		console.log('success!');
	      //console.log("\n--->>\nRESULTS:",_data) 
	  });
	 });

	req.on('error', function (e) {
  	  console.log('problem with request: ' + e.message);
	});
	req.write(content);
	req.end();

	res.render('finance', {title: 'finance for ' + uname});
});



module.exports = router;
