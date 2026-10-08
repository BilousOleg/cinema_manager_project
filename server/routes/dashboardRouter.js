const { Router } = require('express');
const { validation } = require('../middleware');
const { dashboardController } = require('../controllers');

const dashboardRouter = Router();

dashboardRouter.get('/total-counts', dashboardController.getTotalCounts);
dashboardRouter.get(
  '/recent-movies',
  validation.validateLimit,
  dashboardController.getRecentMovies
);
dashboardRouter.get(
  '/popular-genres',
  validation.validateLimit,
  dashboardController.getPopularGenres
);

module.exports = dashboardRouter;
