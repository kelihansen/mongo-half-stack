module.exports = (request, response) => {
    response.statusCode = 404;
    response.end(JSON.stringify({
        error: true,
        message: `CANNOT ${request.method} ${request.url}`
    }));
};