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

    let crow = {
        commonName: 'American crow',
        scientificName: 'Corvus brachyrhynchos',
        wingspan: '85–100 cm',
        diet: 'omnivorous',
        colors: ['black']
    };

    before(() => {
        return chai.request(app)
            .post('/birds')
            .send(hummingbird)
            .then(({ body }) => {
                hummingbird = body;
            });
    });

    it('saves a bird (POST)', () => {
        assert.ok(hummingbird._id);        
    });

    it('gets all birds (GET)', () => {
        return chai.request(app)
            .post('/birds')
            .send(crow)
            .then(({ body }) => {
                crow = body;
                return chai.request(app)
                    .get('/birds');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [hummingbird, crow]);
            });
    });

    after(() => mongo.client.close());
});