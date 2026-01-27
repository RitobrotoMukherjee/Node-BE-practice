module.exports = (req, res) => {
    const { method, headers } = req;

    if( typeof headers['x-user-type'] === 'undefined' || headers['x-user-type'] !== 'localhost' ) {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(403);
        res.end(JSON.stringify({ message: 'Forbidden' }));
        return false;
    }

    // console.log(`Requested Method: ${method}`);
    switch(method) {
        case 'GET':
        case 'POST':
            // console.log(`url: ${req.url}`);
            break;
        default:
            // console.log(`default method: ${method}`);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(405);
            res.end(JSON.stringify({ message: 'Method Not Allowed' }));
            return false;
    }

    return true;
}