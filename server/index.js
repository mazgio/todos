const server = require('./api/server');

const HOST = 'localhost';
const PORT = 7777;



server.listen(PORT, () => console.log(`Server running at ${HOST}:${PORT}`));