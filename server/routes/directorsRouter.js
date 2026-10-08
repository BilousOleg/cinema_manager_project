const { Router } = require('express');
const { validation } = require('../middleware');
const { directorsController } = require('../controllers');

const directorsRouter = Router();

directorsRouter.route('/').get(directorsController.getDirectors);

directorsRouter
  .route('/:id')
  .get(validation.validateId, directorsController.getDirectorById);

module.exports = directorsRouter;
