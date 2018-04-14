const { createServer } = require('http');

const server = createServer((request, response) => {
    console.log('request received');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('server started on port', server.address().port);
});