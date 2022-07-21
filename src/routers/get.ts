import express from 'express';
import {Song} from '../models/Song';
import {Artist} from '../models/Artist';
import {Playlist} from '../models/Playlist';

/**
 * @const getRouter Costant that contains the getRouter
 * that is exported to the main file where express is loaded
 */
export const getRouter = express.Router();

/**
 * Get the song by name.
 */
getRouter.get('/song', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  try {
    const song = await Song.find(filter);
    if (song.length !== 0) {
      res.status(200).send(song);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});


/**
 * Get song by id.
 */
getRouter.get('/song/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).send();
    }
    return res.status(200).send(song);
  } catch (error) {
    return res.status(500).send();
  }
});


/**
 * Get the artist by name.
 */
getRouter.get('/artist', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  try {
    const artist = await Artist.find(filter);
    if (artist.length !== 0) {
      res.status(200).send(artist);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});


/**
 * Get artist by id.
 */
getRouter.get('/artist/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).send();
    }
    return res.status(200).send(artist);
  } catch (error) {
    return res.status(500).send();
  }
});

/**
 * Get the playlist by name.
 */
getRouter.get('/playlist', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  try {
    const playlist = await Playlist.find(filter);
    if (playlist.length !== 0) {
      res.status(200).send(playlist);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});


/**
 * Get playlist by id.
 */
getRouter.get('/playlist/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).send();
    }
    return res.status(200).send(playlist);
  } catch (error) {
    return res.status(500).send();
  }
});
