process.env.NODE_ENV = 'test';

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");


const should = chai.should();


chai.use(chaiHttp);


describe('Server', () => {

    describe('/GET', () => {
        it('Server Get Route is working correctly', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/POST', () => {
        it('Server Post Route is working correctly', (done) => {
            chai.request(server)
                .post('/')
                .type('form')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    address1: "1669 Thomas Avenue",
                    address2: "",
                    city: "San Diego",
                    state: "CA"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/POST', () => {
        it('Server Post Route is working correctly', (done) => {
            chai.request(server)
                .post('/')
                .type('form')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    address1: "3863 Ingraham Street",
                    address2: "",
                    city: "San Diego",
                    state: "CA"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});


