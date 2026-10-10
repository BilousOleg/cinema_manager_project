const { Router } = require('express');
const { validation, paginate } = require('../middleware');
const { directorsController } = require('../controllers');

const directorsRouter = Router();

directorsRouter
  .route('/')
  .get(
    validation.validatePagination,
    paginate.pagination,
    directorsController.getDirectors
  );

directorsRouter.use('/:id', validation.validateId);

directorsRouter
  .route('/:id')
  .get(directorsController.getDirectorById)
  .delete(directorsController.deleteDirectorById);

module.exports = directorsRouter;
