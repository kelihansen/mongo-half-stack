const mongo = require('../mongodb');

module.exports = {
    insert(bird) {
        return mongo.then(db => {
            return db.collection('birds')
                .insert(bird)
                .then(result => result.ops[0]);
        });
    }
};