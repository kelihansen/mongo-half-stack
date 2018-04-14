require('dotenv').config({ path: './test/.env' });
const mongo = require('../lib/mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { assert } = chai;

describe('birds API', () => {
    before(() => {
        return mongo.then(db => {
            db.collection('birds').remove();
        });
    });

    it('has no birds', () => {
        assert(true);
    });

    after(() => mongo.client.close());
});