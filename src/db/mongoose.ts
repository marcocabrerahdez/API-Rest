import {connect} from 'mongoose';

/**
 * @const mongodbUrl Costant thats used to store the mongodb connection url
 * where if exists an enviroment variable named MONGODB_URL
 * it's loaded on to the variable (heroku) if doesnt exist then
 * a localhost url its loaded for dev purposes.
 */
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/MusicTronik360';

/**
 * Connection to MongoDB through the mongoose module, where we use 4 options.
 * `useNewUrlParser`: if not set to true it will use the deprecated string parser, useful if there are bugs or we are using an older project
 * `useUnifiedTopology`: used to avoid issues with disconnects by using the new connection manager
 * `useCreateIndex`: even though this function is deprecated, we are using this function approach
 * `useFindAndModify`: this function is deprecated so we use findOneAndUpdate
 */
connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(() => {
  console.log('Unnable to connect to MongoDB server');
});
