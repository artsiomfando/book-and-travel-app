const express = require('express');
const {
  protect,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controllers/authController');
const { signUp, signIn } = require('../controllers/authController');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updatePassword', protect, updatePassword);

router.patch('/updateMe', protect, updateMe);
router.delete('/deleteMe', protect, deleteMe);

router.route('/').get(protect, getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
