const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    find() {
        return mongo.then(db => {
            return db.collection('birds')
                .find().sort({ scientificName: 1 })
                .toArray();
        });
    },

    findOne(id) {
        return mongo.then(db => {
            return db.collection('birds')
                .find({ _id: ObjectId(id) })
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