import 'mocha';
import {expect} from 'chai';
import {Song} from '../src/models/Song';
import {Artist} from '../src//models/Artist';
import {Playlist} from '../src/models/Playlist';

describe('Models Test', () => {
  describe('Artist test', () => {
    it('A song should not be undefined', () => {
      expect(Song).to.not.be.a('undefined');
    });

    it('An artist should not be undefined', () => {
      expect(Artist).to.not.be.a('undefined');
    });

    it('A playlist should not be undefined', () => {
      expect(Playlist).to.not.be.a('undefined');
    });
  });
});
