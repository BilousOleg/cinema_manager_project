const { Router } = require('express');
const { studiosController } = require('../controllers');
const { validation, paginate } = require('../middleware');

const studiosRouter = Router();

studiosRouter
  .route('/')
  .post(validation.validateStudio, studiosController.createStudio)
  .get(
    validation.validatePagination,
    paginate.pagination,
    studiosController.getStudios
  );

studiosRouter.use('/:id', validation.validateId);

studiosRouter
  .route('/:id')
  .get(studiosController.getStudioById)
  .delete(studiosController.deleteStudioById)
  .patch(validation.validateStudio, studiosController.updateStudioById);

module.exports = studiosRouter;
