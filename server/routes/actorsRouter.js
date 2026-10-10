const { Router } = require('express');
const { validation, paginate } = require('../middleware');
const { actorsController } = require('../controllers');

const actorsRouter = Router();

actorsRouter
  .route('/')
  .get(
    validation.validatePagination,
    paginate.pagination,
    actorsController.getActors
  );

actorsRouter.use('/:id', validation.validateId);

actorsRouter
  .route('/:id')
  .get(actorsController.getActorById)
  .delete(actorsController.deleteActorById);

module.exports = actorsRouter;
