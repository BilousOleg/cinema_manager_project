const { Router } = require('express');
const { validation, paginate } = require('../middleware');
const { directorsController } = require('../controllers');

const directorsRouter = Router();

directorsRouter
  .route('/')
  .post(validation.validatePerson, directorsController.createDirector)
  .get(
    validation.validatePagination,
    paginate.pagination,
    directorsController.getDirectors
  );

directorsRouter.use('/:id', validation.validateId);

directorsRouter
  .route('/:id')
  .get(directorsController.getDirectorById)
  .delete(directorsController.deleteDirectorById)
  .patch(validation.validatePerson, directorsController.updateDirectorById);

module.exports = directorsRouter;
