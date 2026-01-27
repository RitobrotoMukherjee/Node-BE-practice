const Server = require('./server');
const PORT = 8081;

Server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})