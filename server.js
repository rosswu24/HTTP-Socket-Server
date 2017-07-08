const net = require('net');
const server = net.createServer();
const fs = require ('fs');

var readHydrogen = fs.readFileSync('./hydrogen.html');
var readIndex = fs.readFileSync('./index.html');
var readHelium = fs.readFileSync('./helium.html');
var read404 = fs.readFileSync('./404.html');


//makes the template for header
function writeHeader(status, fileType, fileName) {
  return `HTTP/1.1 ${status}
Date: ${new Date()};
Content-Type: ${fileType}; charset=utf-8
Content-Length: ${fileName.length}
${fileName}`;
}

  
  //listener function
  server.listen(8080, '127.0.0.1', () => {
	console.log('server listening');
  });

  //encodes data from browser and makes it 'readable'
server.on('connection', (socket)=>{
  socket.setEncoding('utf8');

  // depending on link will perform different task
  socket.on('data',(data)=>{
	var path = data.split(' ');

	switch(path[1]){
	  case '/hydrogen.html':
	  socket.write(writeHeader('Ok', 'index/html', readHydrogen)); // calles writeHeader function and input paramenters
	  console.log('hydrogen');
	  // socket.end('end');    
	  break;

	  case "/index.html":
	  socket.write(writeHeader('OK', 'index/html', readIndex));
	  console.log('index');
	  // socket.end();
	  break;

	  case "/helium.html":
	  socket.write(writeHeader('OK','index/html',readHelium));
	  console.log('helium');
	  // socket.end();
	  break;

	  case "/404.html":
	  socket.write(writeHeader('OK', 'index/html', read404));
	  console.log('404');
	  // socket.end();
	  break;

	  case "/":
	  socket.write(writeHeader('OK', 'index/html', readIndex));
	  console.log('/index');
	  // socket.end();
	  break;

	  default: 
	  socket.write(writeHeader('Not found', 'index/html', read404));
	  console.log('404');
	  return "404 page could not be found";
	}
  });
  server.on('close',()=>{
	console.log('disconnected');
  });
});