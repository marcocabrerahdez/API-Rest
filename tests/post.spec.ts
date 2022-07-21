import 'mocha';
import chai from 'chai';
import {expect} from 'chai';
import chaiHttp from 'chai-http';


chai.use(chaiHttp);
const url = 'https://musictronik360.herokuapp.com';

describe('Post request test: ', () => {
  it('Should insert a song', (done) => {
    chai.request(url).post('/song').send({
      name: 'All of me',
      author: 'Jonh Legend',
      length: 120,
      genres: [
        'Pop',
      ],
      single: true,
      plays: 1000,
    }).end((err, res) => {
      if (err) {
        throw new Error('An error has occur');
      }
      console.log(res.body);
      expect(res).to.have.status(201);
      done();
    });
  });
  it('Should insert a artist', (done) => {
    chai.request(url).post('/artist').send({
      name: 'Jonh Legend',
      genres: [
        'Pop',
      ],
      songs: [
        'All of me',
      ],
      audience: 1250,
    }).end((err, res) => {
      if (err) {
        throw new Error('An error has occur');
      }
      console.log(res.body);
      expect(res).to.have.status(201);
      done();
    });
  });
  it('Should insert a playlist', (done) => {
    chai.request(url).post('/playlist').send({
      name: 'Veranito sin DSI',
      songs: [
        'All of me',
      ],
      length: 120,
      genres: [
        'Pop',
      ],
    }).end((err, res) => {
      if (err) {
        throw new Error('An error has occur');
      }
      console.log(res.body);
      expect(res).to.have.status(201);
      done();
    });
  });
});
