const { Router } = require('express');
const { validation, paginate } = require('../middleware');
const { actorsController } = require('../controllers');

const actorsRouter = Router();

actorsRouter
  .route('/')
  .post(validation.validatePerson, actorsController.createActor)
  .get(
    validation.validatePagination,
    paginate.pagination,
    actorsController.getActors
  );

actorsRouter.use('/:id', validation.validateId);

actorsRouter
  .route('/:id')
  .get(actorsController.getActorById)
  .delete(actorsController.deleteActorById)
  .patch(validation.validatePerson, actorsController.updateActorById);

module.exports = actorsRouter;
