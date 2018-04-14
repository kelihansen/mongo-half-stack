require('dotenv').config({ path: './test/.env.test' });
const mongo = require('../lib/mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);
const { assert } = chai;

describe('birds API', () => {
    before(() => {
        return mongo.then(db => {
            db.collection('birds').remove();
        });
    });

    let hummingbird = {
        commonName: 'Anna\'s hummingbird',
        scientificName: 'Calypte anna',
        wingspan: '12 cm',
        diet: 'nectar',
        colors: ['green', 'gray', 'red']
    };

    it('saves a bird', () => {
        return chai.request(app)
            .post('/birds')
            .send(hummingbird)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.scientificName, hummingbird.scientificName);
                hummingbird = body;
            });
    });

    after(() => mongo.client.close());
});