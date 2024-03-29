const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const users = require('./users.json')

// /users
// /
// GET, POST, PUT, PATCH, DELETE

const server = http.createServer(async (req, res) => {
    if (req.url == '/' && req.method == 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        var obj = {
            name: 'Zaheer',
            department: 'Software Engineering'
        }
        res.end(JSON.stringify(obj));
    } else if (req.url == '/users' && req.method == 'GET') {
        res.writeHead(200, {'Content-type' : 'application/json'} )
        res.end(JSON.stringify(users));
    } else if (req.url.match(/\/users\/([0-9])/) && req.method == 'GET') {
        res.writeHead(200, { 'Content-type': 'application/json' })
        let id = req.url.split('/')[2]
        let user = users.find(u => u.id == id)
        if (user) res.end(JSON.stringify(user));
        else res.end(`user with id ${id} not found!`);
    } else if (req.url == '/users' && req.method == 'POST') {
        const getData = () => new Promise((resolve, reject) => {
            try {
                let body = "";
                // listen to data sent by client
                req.on("data", (chunk) => {
                    // append the string version to the body
                    body += chunk.toString();
                });
                // listen till the end
                req.on("end", () => {
                    // send back the data
                    resolve(body);
                });
            } catch (error) {
                reject(error);
            }
        });

        let userObj = await getData();
        console.log(JSON.parse(userObj))
        res.writeHead(201, { 'Content-Type': 'application/json'})
        res.end(userObj)
    }
    else {
        res.end(`Request ${req.url} with ${req.method} method does not exist!`)
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
