const { Router } = require('express');
const countriesRouter = require('./countriesRouter');
const genresRouter = require('./genresRouter');
const moviesRouter = require('./moviesRouter');
const actorsRouter = require('./actorsRouter');
const directorsRouter = require('./directorsRouter');
const studiosRouter = require('./studiosRouter');
const dashboardRouter = require('./dashboardRouter');

const router = Router();

router.use('/countries', countriesRouter);
router.use('/genres', genresRouter);
router.use('/movies', moviesRouter);
router.use('/actors', actorsRouter);
router.use('/directors', directorsRouter);
router.use('/studios', studiosRouter);
router.use('/dashboard', dashboardRouter);

module.exports = router;
