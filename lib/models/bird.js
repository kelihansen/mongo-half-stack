const mongo = require('../mongodb');

module.exports = {
    find() {
        return mongo.then(db => {
            return db.collection('birds')
                .find().sort({ scientificName: 1 })
                .toArray();
        });
    },

    insert(bird) {
        return mongo.then(db => {
            return db.collection('birds')
                .insert(bird)
                .then(result => result.ops[0]);
        });
    }
};