const http = require('http');

const server = http.createServer((req,res)=>{
    res.writeHeader(200,{'Content-Type':'text/html'});
    res.end('<h1>hello world</h1>');
});


server.listen(3000,'127.0.0.1',()=>{
    console.log('Server is Runing!!');
});