import {Document, Schema, model} from 'mongoose';

/**
 * @interface ArtistInterface Implements an artist.
 * @extends Document
 */
export interface ArtistInterface extends Document {
  name: string,
  genres: string[],
  songs: string[],
  audience: number,
}

/**
 * @const ArtistSchema Artist's schema of type ArtistInterface
 */
const ArtistSchema = new Schema<ArtistInterface>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        // eslint-disable-next-line max-len
        throw new Error('Los nombres de los artistas deben empezar en mayúscula');
      }
    },
  },
  genres: {
    type: [String],
    required: true,
    trim: true,
    validate: (value: string[]) => {
      if (value.length === 0) {
        throw new Error('El artista debe tener al menos un género');
      } else {
        value.forEach((element) => {
          if (!element.match(/^[A-Z]/)) {
            // eslint-disable-next-line max-len
            throw new Error('Los géneros del artista deben empezar en mayúscula');
          }
        });
      }
    },
  },
  songs: {
    type: [String],
    required: true,
    trim: true,
    validate: (value: string[]) => {
      if (value.length === 0) {
        throw new Error('El artista debe tener al menos una cancion');
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
  audience: {
    type: Number,
    required: true,
    trim: true,
    validate: (value: number) => {
      if (value < 0) {
        throw new Error('Los oyentes mensuales no pueden ser negativos');
      }
    },
  },
});

/**
 * @const Artist model
 */
export const Artist = model<ArtistInterface>('Artist', ArtistSchema);
