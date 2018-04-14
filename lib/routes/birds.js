const notFound = require('./not-found');
const bird = require('../models/bird');

const get = (request, response) => {
    const id = request.paths[1];
    id ? getOne(id, request, response) : getAll(request, response);
};

const getOne = (id, request, response) => {
    bird.findOne(id)
        .then(theOne => {
            response.end(JSON.stringify(theOne));
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

const put = (request, response) => {
    bird.update(request.body)
        .then(report => {
            response.end(JSON.stringify(report));
        });
};

const del = (request, response) => {
    bird.remove(request.paths[1])
        .then(({ n, ok }) => {
            const removed = n && ok ? true : false;
            response.end(JSON.stringify({ removed }));
        });
};

const methods = { get, post, put, delete: del };

module.exports = (request, response) => {
    const method = methods[request.method.toLowerCase() || notFound];
    method(request, response);
};