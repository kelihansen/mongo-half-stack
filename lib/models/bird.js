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
                .then(({ ops }) => ops[0]);
        });
    },

    update(bird) {
        const birdData = Object.assign({}, bird);
        delete birdData._id;
        return mongo.then(db => {
            return db.collection('birds')
                .update({ _id: ObjectId(bird._id) }, { $set: birdData })
                .then(({ result }) => result);
        });
    }
};