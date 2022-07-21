import 'mocha';
import chai from 'chai';
import {expect} from 'chai';
import chaiHttp from 'chai-http';
require('./getByID.spec.ts');
chai.use(chaiHttp);
const url = 'https://musictronik360.herokuapp.com';

describe('Update request ', () => {
  describe('Update a song: ', () => {
    it('Should update a song', (done) => {
      chai.request(url).patch('/song?name=Song').send({
        genres: ['Genero1'],
        name: 'Song',
        author: 'Pepe',
        length: 150,
        single: true,
        plays: 100,
      }).end((err, res) => {
        if (err) {
          throw new Error('An error has occur');
        }
        console.log(res.body);
        expect(res.body.single).to.be.true;
        expect(res).to.have.status(200);
        chai.request(url).patch('/song?name=Song').send({
          genres: ['Genero1'],
          name: 'Song',
          author: 'Pepe',
          length: 150,
          single: false,
          plays: 100,
        });
        done();
      });
    });
  });


  describe('Update a artist: ', () => {
    it('Should update a artist', (done) => {
      chai.request(url).patch('/artist?name=Pepe').send({
        name: 'Pepe',
        genres: ['Genero1', 'Genero2', 'Genero3'],
        songs: ['Song'],
        audience: 150,
      }).end((err, res) => {
        if (err) {
          throw new Error('An error has occur');
        }
        console.log(res.body);
        expect(res.body.songs.length).to.be.eq(1);
        expect(res).to.have.status(200);
        chai.request(url).patch('/artist?name=Pepe').send({
          name: 'Pepe',
          genres: ['Genero1', 'Genero2', 'Genero3'],
          songs: ['Song', 'Song2', 'Song3'],
          audience: 150,
        });
        done();
      });
    });
  });


  describe('Update a playlist: ', () => {
    it('Should update a playlist', (done) => {
      chai.request(url).patch('/playlist?name=Playlist1').send({
        name: 'Playlist1',
        songs: ['Song', 'Song2', 'Song3'],
        length: 150,
        genres: ['Genero1'],
      }).end((err, res) => {
        if (err) {
          throw new Error('An error has occur');
        }
        console.log(res.body);
        expect(res.body.genres.length).to.be.eq(1);
        expect(res).to.have.status(200);
        chai.request(url).patch('/playlist?name=Playlist1').send({
          name: 'Playlist1',
          songs: ['Song', 'Song2', 'Song3'],
          length: 150,
          genres: ['Genero1', 'Genero2', 'Genero3'],
        });
        done();
      });
    });
  });
});
