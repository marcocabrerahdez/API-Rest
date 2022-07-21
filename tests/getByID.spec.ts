import 'mocha';
import chai from 'chai';
import {expect} from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
require('./get.spec.ts');
const url = 'https://musictronik360.herokuapp.com';

describe('Get request by id test', () => {
  it('Should get a specific song by id', (done) => {
    // eslint-disable-next-line max-len
    chai.request(url).get('/song?id=6287d451bb7f4c001642be25').end((err, res) => {
      if (err) {
        throw new Error('An error has occur');
      }
      console.log(res.body);
      // eslint-disable-next-line max-len
      expect(res.body[0]).to.have.property('name').to.be.equal('Song');
      expect(res).to.have.status(200);
      done();
    });
  });

  it('Should get a specific artist by id', (done) => {
    // eslint-disable-next-line max-len
    chai.request(url).get('/artist?id=6280e8cb56770a00164af59d').end((err, res) => {
      if (err) {
        throw new Error('An error has occur');
      }
      console.log(res.body);
      // eslint-disable-next-line max-len
      expect(res.body[0]).to.have.property('name').to.be.equal('Pepe');
      expect(res).to.have.status(200);
      done();
    });
  });

  it('Should get a specific playlist by id', (done) => {
  // eslint-disable-next-line max-len
    chai.request(url).get('/playlist?id=6280e9f2d7b695001608d2ea').end((err, res) => {
      if (err) {
        throw new Error('An error has occur');
      }
      console.log(res.body);
      // eslint-disable-next-line max-len
      expect(res.body[0]).to.have.property('name').to.be.equal('Playlist1');
      expect(res).to.have.status(200);
      done();
    });
  });
});
