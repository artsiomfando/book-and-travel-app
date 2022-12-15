const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopFiveCheapest,
  getTourStats,
  getMonthlyPlan,
  getTourWithin,
  getDistances,
} = require('../controllers/tourController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:tourId/review', reviewRouter);

router.route('/top-5-cheapest').get(aliasTopFiveCheapest, getAllTours);

router.route('/tour-stats').get(getTourStats);

router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getTourWithin);

router.route('/distances/:latlng/unit/:unit').get(getDistances);

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
