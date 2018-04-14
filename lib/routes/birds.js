const notFound = require('./not-found');
const bird = require('../models/bird');

const get = (request, response) => {
    const id = request.paths[1];
    id ? getOne(id, request, response) : getAll(request, response);
};

const getOne = (id, request, response) => {
    bird.findOne(id)
        .then(theOne => {
            response.end(JSON.stringify(theOne[0]));
        });
};

const getAll = (request, response) => {
    bird.find()
        .then(allBirds => {
            response.end(JSON.stringify(allBirds));
        });
};

const post = (request, response) => {
    bird.insert(request.body)
        .then(inserted => {
            response.end(JSON.stringify(inserted));
        });
};

const methods = { get, post };

module.exports = (request, response) => {
    const method = methods[request.method.toLowerCase() || notFound];
    method(request, response);
};