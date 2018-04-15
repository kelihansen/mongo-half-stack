const { createServer } = require('http');
const app = require('./lib/app');
require('./lib/mongodb');

const server = createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('server started on port', server.address().port); // eslint-disable-line
});