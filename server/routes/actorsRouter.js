const { Router } = require('express');
const { validation } = require('../middleware');
const { actorsController } = require('../controllers');

const actorsRouter = Router();

actorsRouter.route('/').get(actorsController.getActors);

actorsRouter
  .route('/:id')
  .get(validation.validateId, actorsController.getActorById);

module.exports = actorsRouter;
