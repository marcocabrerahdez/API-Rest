import express from 'express';
import './db/mongoose';
import {postRouter} from './routers/post';
import {getRouter} from './routers/get';
import {deleteRouter} from './routers/delete';
import {patchRouter} from './routers/patch';
import {defaultRouter} from './routers/default';
import {join} from 'path';

const app = express();
/**
 * All request and petitions will be treated as a json
 */
app.use(express.json());
app.use(express.static(join(__dirname, '../public')));

/**
 * Routers imported that contains all petitions
 */
app.use(postRouter);
app.use(getRouter);
app.use(deleteRouter);
app.use(patchRouter);
app.use(defaultRouter);

/**
 * Constat with the port 3000 or if exists, the env port (heroku)
 */
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
