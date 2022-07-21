import {Document, Schema, model} from 'mongoose';

/**
 * @interface PlaylistInterface Implements a playlist.
 * @extends Document
 */
export interface PlaylistInterface extends Document {
  name: string,
  songs: string[],
  length: number,
  genres: string[],
}

/**
 * @const PlaylistSchema Playlist's schema of type PlaylistInterface
 */
const PlaylistSchema = new Schema<PlaylistInterface>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        // eslint-disable-next-line max-len
        throw new Error('El nombre de la playlist debe empezar en mayúscula');
      }
    },
  },
  songs: {
    type: [String],
    required: true,
    trim: true,
    validate: (value: string[]) => {
      if (value.length === 0) {
        throw new Error('La playlist debe tener al menos una cancion');
      } else {
        value.forEach((element) => {
          if (!element.match(/^[A-Z]/)) {
            // eslint-disable-next-line max-len
            throw new Error('Las canciones deben empezar en mayúscula');
          }
        });
      }
    },
  },
  length: {
    type: Number,
    required: true,
    trim: true,
    validate: (value: number) => {
      if (value < 0) {
        throw new Error('La duración no puede ser negativa');
      }
    },
  },
  genres: {
    type: [String],
    required: true,
    trim: true,
    validate: (value: string[]) => {
      if (value.length === 0) {
        throw new Error('La playlist debe tener al menos un genero');
      } else {
        value.forEach((element) => {
          if (!element.match(/^[A-Z]/)) {
            // eslint-disable-next-line max-len
            throw new Error('Los géneros de la canción deben empezar en mayúscula');
          }
        });
      }
    },
  },
});

/**
 * @const Playlist model
 */
export const Playlist = model<PlaylistInterface>('Playlist', PlaylistSchema);
