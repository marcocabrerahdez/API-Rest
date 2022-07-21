import 'mocha';
import chai from 'chai';
import {expect} from 'chai';
import chaiHttp from 'chai-http';
/**
 * It's mandatory to post test first post
 * request to be able to check the delete request
 */
require('./post.spec.ts');
chai.use(chaiHttp);
const url = 'https://musictronik360.herokuapp.com';

describe('Delete Request', () => {
  describe('Delete a song: ', () => {
    it('Should delete a song', (done) => {
      chai.request(url).del('/song?name=All of me').end((err, res) => {
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

  describe('Delete a playlist: ', () => {
    it('Should delete a playlist', (done) => {
      chai.request(url).del('/playlist?name=Veranito sin DSI').end((err, res) => {
        if (err) {
          throw new Error('An error has occur');
        }
        console.log(res.body);
        expect(res).to.have.status(200);
        chai.request(url).get('/song?name=Veranito sin DSI').end((err, res) => {
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


  describe('Delete a artist: ', () => {
    it('Should delete a artist', (done) => {
      chai.request(url).del('/artist?name=Jonh Legend').end((err, res) => {
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
