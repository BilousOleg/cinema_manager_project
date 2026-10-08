const { Router } = require('express');
const { studiosController } = require('../controllers');
const { validation } = require('../middleware');

const studiosRouter = Router();

studiosRouter.route('/').get(studiosController.getStudios);

studiosRouter
  .route('/:id')
  .get(validation.validateId, studiosController.getStudioById);

module.exports = studiosRouter;
