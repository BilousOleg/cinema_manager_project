const { Router } = require('express');
const { studiosController } = require('../controllers');
const { validation, paginate } = require('../middleware');

const studiosRouter = Router();

studiosRouter
  .route('/')
  .get(
    validation.validatePagination,
    paginate.pagination,
    studiosController.getStudios
  );

studiosRouter.use('/:id', validation.validateId);

studiosRouter
  .route('/:id')
  .get(studiosController.getStudioById)
  .delete(studiosController.deleteStudioById);

module.exports = studiosRouter;
