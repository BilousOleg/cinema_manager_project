const { Router } = require('express');
const { genresController } = require('../controllers');

const genresRouter = Router();

genresRouter.route('/').get(genresController.getGenres);

module.exports = genresRouter;
