import express from 'express';
import {Song} from '../models/Song';
import {Artist} from '../models/Artist';
import {Playlist} from '../models/Playlist';

/**
 * @const postRouter Costant that contains the postRouter
 * that is exported to the main file where express is loaded
 */
export const postRouter = express.Router();

/**
 * Saves the song from the request on to the MongoDB server.
 */
postRouter.post('/song', async (req, res) => {
  const song = new Song(req.body);

  try {
    await song.save();
    res.status(201).send(song);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * Saves the artist from the request on to the MongoDB server.
 */
postRouter.post('/artist', async (req, res) => {
  const artist = new Artist(req.body);

  try {
    await artist.save();
    res.status(201).send(artist);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * Saves the playlist from the request on to the MongoDB server.
 */
postRouter.post('/playlist', async (req, res) => {
  const playlist = new Playlist(req.body);

  try {
    await playlist.save();
    res.status(201).send(playlist);
  } catch (error) {
    res.status(400).send(error);
  }
});
