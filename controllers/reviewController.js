const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

exports.setTourAndUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAllDocs(Review);
exports.getReview = factory.getDoc(Review);
exports.createReview = factory.createDoc(Review);
exports.updateReview = factory.updateDoc(Review);
exports.deleteReview = factory.deleteDoc(Review);
