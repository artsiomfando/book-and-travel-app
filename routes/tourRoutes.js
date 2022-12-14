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
} = require('../controllers/tourController');

const router = express.Router();

router.route('/top-5-cheapest').get(aliasTopFiveCheapest, getAllTours);

router.route('/tour-stats').get(getTourStats);

router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(protect, getAllTours).post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
