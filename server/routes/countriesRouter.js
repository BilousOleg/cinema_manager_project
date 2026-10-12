const { Router } = require('express');
const { countriesController } = require('../controllers');

const countriesRouter = Router();

countriesRouter.route('/').get(countriesController.getCountries);

module.exports = countriesRouter;
