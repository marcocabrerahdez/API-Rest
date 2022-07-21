import 'mocha';
import chai from 'chai';
import {expect} from 'chai';
import chaiHttp from 'chai-http';
/**
 * It's mandatory to post test first post
 * request to be able to check the delete request
 */
require('./delete.spec.ts');
chai.use(chaiHttp);
const url = 'https://musictronik360.herokuapp.com';

describe('Delete by ID Request', () => {
  describe('Delete a song: ', () => {
    it('Should delete a song by id', (done) => {
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
        chai.request(url).get('/song?name=All of me').end((err, res) => {
          if (err) {
            throw new Error('An error has occur');
          }
          console.log(`${res.body[0]}`);
          chai.request(url).del(`/song/${res.body[0]._id}`).end((err, res) => {
            if (err) {
              throw new Error('An error has occur');
            }
            console.log(res.body);
            expect(res).to.have.status(200);
            chai.request(url).get('/song?name=All of me').end((err, res) => {
              if (err) {
                throw new Error('An error has occur');
              }
              console.log(res.body);
              expect(res).to.have.status(404);
              done();
            });
          });
        });
      });
    });
  });

  describe('Delete an artist: ', () => {
    it('Should delete an artist by id', (done) => {
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
        chai.request(url).get('/artist?name=Jonh Legend').end((err, res) => {
          if (err) {
            throw new Error('An error has occur');
          }
          console.log(`${res.body[0]}`);
          chai.request(url).del(`/artist/${res.body[0]._id}`).end((err, res) => {
            if (err) {
              throw new Error('An error has occur');
            }
            console.log(res.body);
            expect(res).to.have.status(200);
            chai.request(url).get('/artist?name=Jonh Legend').end((err, res) => {
              if (err) {
                throw new Error('An error has occur');
              }
              console.log(res.body);
              expect(res).to.have.status(404);
              done();
            });
          });
        });
      });
    });
  });

  describe('Delete a playlist: ', () => {
    it('Should delete a playlist by id', (done) => {
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
        // eslint-disable-next-line max-len
        chai.request(url).get('/playlist?name=Veranito sin DSI').end((err, res) => {
          if (err) {
            throw new Error('An error has occur');
          }
          console.log(`${res.body[0]}`);
          // eslint-disable-next-line max-len
          chai.request(url).del(`/playlist/${res.body[0]._id}`).end((err, res) => {
            if (err) {
              throw new Error('An error has occur');
            }
            console.log(res.body);
            expect(res).to.have.status(200);
            // eslint-disable-next-line max-len
            chai.request(url).get('/playlist?name=Veranito sin DSI').end((err, res) => {
              if (err) {
                throw new Error('An error has occur');
              }
              console.log(res.body);
              expect(res).to.have.status(404);
              done();
            });
          });
        });
      });
    });
  });
});
