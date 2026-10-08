const { Router } = require('express');
const moviesRouter = require('./moviesRouter');
const actorsRouter = require('./actorsRouter');
const directorsRouter = require('./directorsRouter');
const studiosRouter = require('./studiosRouter');
const dashboardRouter = require('./dashboardRouter');

const router = Router();

router.use('/movies', moviesRouter);
router.use('/actors', actorsRouter);
router.use('/directors', directorsRouter);
router.use('/studios', studiosRouter);
router.use('/dashboard', dashboardRouter);

module.exports = router;
