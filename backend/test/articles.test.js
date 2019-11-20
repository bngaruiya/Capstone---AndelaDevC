const knex = require('../db/knex');
const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;
const should = require('chai').should;

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
});
