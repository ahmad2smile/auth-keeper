const {createServer} =  require("http")

console.log("==================================");
console.log(`Server started on 3001 for App1`);
console.log("==================================");

createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>App 1</h1>');
    res.end();
}).listen(3001);


console.log("==================================");
console.log(`Server started on 3002 for App2`);
console.log("==================================");

createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>App 2</h1>');
    res.end();
}).listen(3002);