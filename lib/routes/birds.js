const notFound = require('./not-found');
const bird = require('../models/bird');

const post = (request, response) => {
    bird.insert(request.body)
        .then(inserted => {
            response.end(JSON.stringify(inserted));
        });
};

const methods = { post };

module.exports = (request, response) => {
    const method = methods[request.method.toLowerCase() || notFound];
    method(request, response);
};