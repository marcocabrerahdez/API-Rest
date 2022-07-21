import express from 'express';
import {Song} from '../models/Song';
import {Artist} from '../models/Artist';
import {Playlist} from '../models/Playlist';
/**
 * @const patchRouter Costant that contains the patchRouter
 * that is exported to the main file where express is loaded
 */
export const patchRouter = express.Router();

/**
 * Update a song.
 */
patchRouter.patch('/song', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'A name must be provided',
    });
  }
  // eslint-disable-next-line max-len
  const allowedUpdates = ['name', 'author', 'length', 'genres', 'single', 'plays'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    // eslint-disable-next-line max-len
    const song = await Song.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!song) {
      return res.status(404).send();
    }

    return res.send(song);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * Update a song by ID.
 */
patchRouter.patch('/song/:id', async (req, res) => {
  // eslint-disable-next-line max-len
  const allowedUpdates = ['name', 'author', 'length', 'genres', 'single', 'plays'];
  const actualUpdates = Object.keys(req.body);
  // eslint-disable-next-line max-len
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    // eslint-disable-next-line max-len
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!song) {
      return res.status(404).send();
    }
    return res.send(song);
  } catch (error) {
    return res.status(400).send(error);
  }
});


/**
 * Update an artist.
 */
patchRouter.patch('/artist', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'A name must be provided',
    });
  }
  // eslint-disable-next-line max-len
  const allowedUpdates = ['name', 'genres', 'songs', 'audience'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    // eslint-disable-next-line max-len
    const artist = await Artist.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!artist) {
      return res.status(404).send();
    }

    return res.send(artist);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * Update an artist by ID.
 */
patchRouter.patch('/artist/:id', async (req, res) => {
  // eslint-disable-next-line max-len
  const allowedUpdates = ['name', 'genres', 'songs', 'audience'];
  const actualUpdates = Object.keys(req.body);
  // eslint-disable-next-line max-len
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    // eslint-disable-next-line max-len
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!artist) {
      return res.status(404).send();
    }
    return res.send(artist);
  } catch (error) {
    return res.status(400).send(error);
  }
});


/**
 * Update a playlist.
 */
patchRouter.patch('/playlist', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'A name must be provided',
    });
  }
  // eslint-disable-next-line max-len
  const allowedUpdates = ['name', 'songs', 'length', 'genres'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    // eslint-disable-next-line max-len
    const playlist = await Playlist.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!playlist) {
      return res.status(404).send();
    }

    return res.send(playlist);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * Update a playlist by ID.
 */
patchRouter.patch('/playlist/:id', async (req, res) => {
  // eslint-disable-next-line max-len
  const allowedUpdates = ['name', 'songs', 'length', 'genres'];
  const actualUpdates = Object.keys(req.body);
  // eslint-disable-next-line max-len
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    // eslint-disable-next-line max-len
    const playlist = await Playlist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!playlist) {
      return res.status(404).send();
    }
    return res.send(playlist);
  } catch (error) {
    return res.status(400).send(error);
  }
});
