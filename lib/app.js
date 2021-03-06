const { parse } = require('url');
const birds = require('./routes/birds');
const notFound = require('./routes/not-found');
const bodyParser = require('./body-parser');

const routes = { __proto__: null, birds };

module.exports = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    
    request.paths = parse(request.url).pathname.slice(1).split('/');
    const key = request.paths[0];
    const route = routes[key] || notFound;

    bodyParser(request)
        .then(body => {
            request.body = body;
            route(request, response);
        });
};