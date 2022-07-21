import express from 'express';
import {Song} from '../models/Song';
import {Artist} from '../models/Artist';
import {Playlist} from '../models/Playlist';

/**
 * @const deleteRouter Costant that contains the deleteRouter
 * that is exported to the main file where express is loaded
 */
export const deleteRouter = express.Router();

/**
 * Delete a specific song.
 */
deleteRouter.delete('/song', async (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  }
  try {
    // eslint-disable-next-line max-len
    const song = await Song.findOneAndDelete(req.query.name?{name: req.query.name.toString()}:{});
    if (!song) {
      return res.status(404).send();
    }
    return res.send(song);
  } catch (error) {
    return res.status(400).send();
  }
});

/**
 * Delete a song by id.
 */
deleteRouter.delete('/song/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) {
      return res.status(404).send();
    }
    return res.send(song);
  } catch (error) {
    return res.status(400).send();
  }
});


/**
 * Delete a specific artist.
 */
deleteRouter.delete('/artist', async (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  }
  try {
    // eslint-disable-next-line max-len
    const artist = await Artist.findOneAndDelete(req.query.name?{name: req.query.name.toString()}:{});
    if (!artist) {
      return res.status(404).send();
    }
    return res.send(artist);
  } catch (error) {
    return res.status(400).send();
  }
});

/**
 * Delete a song by id.
 */
deleteRouter.delete('/artist/:id', async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) {
      return res.status(404).send();
    }
    return res.send(artist);
  } catch (error) {
    return res.status(400).send();
  }
});


/**
 * Delete a specific playlist.
 */
deleteRouter.delete('/playlist', async (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  }
  try {
    // eslint-disable-next-line max-len
    const playlist = await Playlist.findOneAndDelete(req.query.name?{name: req.query.name.toString()}:{});
    if (!playlist) {
      return res.status(404).send();
    }
    return res.send(playlist);
  } catch (error) {
    return res.status(400).send();
  }
});

/**
 * Delete a playlist by id.
 */
deleteRouter.delete('/playlist/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndDelete(req.params.id);
    if (!playlist) {
      return res.status(404).send();
    }
    return res.send(playlist);
  } catch (error) {
    return res.status(400).send();
  }
});
