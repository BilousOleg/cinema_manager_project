const { Router } = require('express');
const { validation } = require('../middleware');
const { moviesController } = require('../controllers');

const moviesRouter = Router();

moviesRouter.route('/').get(moviesController.getMovies);

moviesRouter
  .route('/:id')
  .get(validation.validateId, moviesController.getMovieById);

module.exports = moviesRouter;
