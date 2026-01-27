const fs = require('node:fs');

module.exports = (req, res) => {
    const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.mkdirSync('logs', { recursive: true });

    fs.appendFileSync('logs/access.log', logEntry, (err) => {
        if(err) {
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(500);
            res.end('Internal Server Error');
            return false;
        }
    });

    return true;
}