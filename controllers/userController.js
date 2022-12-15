const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const filterData = (data, ...allowedFields) => {
  Object.keys(data).forEach((el) => {
    const adjustedData = {};
    if (allowedFields.includes(el)) adjustedData[el] = data[el];

    return adjustedData;
  });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.passord || req.body.passordConfirm) {
    return next(
      new AppError(
        'This route is not correct to change password. Please use /updatePassword',
        400
      )
    );
  }

  const filteredBody = filterData(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { actve: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  });
};

exports.getAllUsers = factory.getAllDocs(User);
exports.getUser = factory.getDoc(User);
exports.updateUser = factory.updateDoc(User);
exports.deleteUser = factory.deleteDoc(User);
