import 'mocha';
import chai from 'chai';
import {expect} from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const url = 'https://musictronik360.herokuapp.com';
// vv COMMENT THE LINE BELLOW TO ENABLE CONSOLE.LOGS FROM THE FUNCTIONS (DISABLED BECAUSE BLOATS THE TESTS REPORT ) vvvv
console.log = function() {};
// ^^ COMMENT THE LINE ABOVE TO ENABLE CONSOLE.LOGS FROM THE FUNCTIONS (DISABLED BECAUSE BLOATS THE TESTS REPORT ) ^^^^

describe('Get request test', () => {
  describe('Get all the elements', () => {
    it('Should get all songs', (done) => {
      chai.request(url).get('/song').end((err, res) => {
        if (err) {
          throw new Error('An error has occur');
        }
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
    });

    it('Should get all artists', (done) => {
      chai.request(url).get('/artist').end((err, res) => {
        if (err) {
          throw new Error('An error has occur');
        }
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
    });

    it('Should get all playlists', (done) => {
      chai.request(url).get('/playlist').end((err, res) => {
        if (err) {
          throw new Error('An error has occur');
        }
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  describe('Get a specific song', () => {
    it('Should get a specific song', (done) => {
      chai.request(url).get('/song?name=Song').end((err, res) => {
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

    it('Should get a specific artist', (done) => {
      chai.request(url).get('/artist?name=Pepe').end((err, res) => {
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

    it('Should get a specific playlist', (done) => {
      chai.request(url).get('/playlist?name=Playlist1').end((err, res) => {
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
});
