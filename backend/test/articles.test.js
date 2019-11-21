const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;
const should = require('chai').should;

const knex = require('../db/knex');

describe('CRUD Articles', () => {
  before(done => {
    // Run migrations
    knex.migrate
      .latest()
      .then(() => {
        // Run seeds
        return knex.seed.run();
      })
      .then(() => done());
  });
  it('Lists all articles', done => {
    request(app)
      .get('/api/v1/articles')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.a('array');
        done();
      });
  });
  it('Show one article by id', done => {
    request(app)
      .get('/api/v1/articles/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.a('object');
        done();
      });
  });
  it('Should create an article', done => {
    request(app)
      .post('/api/v1/articles/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.a('object');
      });
    done();
  });
  it('Should update an article', done => {
    request(app)
      .put('/api/v1/articles/10')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.a('object');
      });
    done();
  });
  it('Should delete an article', done => {
    request(app)
      .delete('/api/v1/articles/10')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal({
          deleted: true
        });
      });
    done();
  });
});
