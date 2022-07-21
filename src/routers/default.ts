import * as express from 'express';

/**
 * @const defaultRouter Costant that contains the defaultRouter
 * that is exported to the main file where express is loaded
 */
export const defaultRouter = express.Router();

/**
 * Default entry point that sends a 501 code message to
 * alert that the request its not implemented
 */
defaultRouter.all('*', (_, res) => {
  res.status(501).send();
});
