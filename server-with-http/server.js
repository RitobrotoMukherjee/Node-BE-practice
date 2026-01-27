const http = require('node:http');
const fs = require('node:fs');
const LoggerMiddleware = require('./loggerMiddleware.js');
const RouterMiddleware = require('./route.js');
const DATA = require('./data.json');

module.exports = http.createServer((req, res) => {
    const log = LoggerMiddleware(req, res);
    const route = RouterMiddleware(req, res);

    // console.log(`log: ${log}, route: ${route}`);
    if(!log || !route) {
        return;
    }

    const { url, method } = req;

    res.setHeader('Content-Type', 'application/json');

    if(url === '/data' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(DATA));
        return;
    }

    if(url === '/data' && method === 'POST') {
        const dataInJson = JSON.parse(JSON.stringify(DATA));
        
        let body = '';
        
        // Listen to 'data' event to receive chunks of the request body
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        
        // Listen to 'end' event when all data is received
        req.on('end', () => {
            try {
                const jsonData = JSON.parse(body);
                const LAST_ID = dataInJson.reduce((acc, current) => current.id > acc ? current.id : acc, 0);
                jsonData['id'] = LAST_ID + 1
                dataInJson.push(jsonData);

                // console.log('Received data:', dataInJson);
                fs.writeFileSync('./data.json', JSON.stringify(dataInJson));
                res.writeHead(200).end(JSON.stringify({ message: 'Data received', data: jsonData }));
            } catch (error) {
                res.writeHead(400).end(JSON.stringify({ message: 'Invalid JSON' }));
            }
        });
        
        return;
    }

    return res.writeHead(404).end(JSON.stringify({ message: 'Not Found' }));
});
