const { Router } = require('express');
const { validation, paginate } = require('../middleware');
const { moviesController } = require('../controllers');

const moviesRouter = Router();

moviesRouter
  .route('/')
  .post(validation.validateMovie, moviesController.createMovie)
  .get(
    validation.validatePagination,
    paginate.pagination,
    moviesController.getMovies
  );

moviesRouter.use('/:id', validation.validateId);

moviesRouter
  .route('/:id')
  .get(moviesController.getMovieById)
  .delete(moviesController.deleteMovieById)
  .patch(validation.validateMovie, moviesController.updateMovieById);

module.exports = moviesRouter;
