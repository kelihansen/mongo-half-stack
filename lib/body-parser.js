module.exports = request => {
    return new Promise(resolve => {
        let body = '';
        request.on('data', chunk => {
            body += chunk;
        });

        request.on('end', () => {
            if(!body) return resolve({});

            const parsed = JSON.parse(body);
            resolve(parsed);
        });
    });
};