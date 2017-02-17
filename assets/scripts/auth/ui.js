'use strict';

const utils = require('../utils');

const signInSuccess = () => {
  $('#signInModal').modal('hide');
  utils.clearModalInput('#sign-in');
  utils.mainDisplay();
};

const signUpSuccess = () => {
  $('#signUpModal').modal('hide');
  utils.clearModalInput('#sign-up');
};

const signOutSuccess = () => {
  $('#signOutModal').modal('hide');
  utils.clearModalInput('#sign-out');
  utils.openingDisplay();
};

const changePassSuccess = () => {
  $('#changePassModal').modal('hide');
  utils.clearModalInput('#change-password');
};

const signInFailure = (error) => {
  utils.addErrorMessage('#sign-in', error.status);
  // console.error(error.status);
};

const signUpFailure = (error) => {
  utils.addErrorMessage('#sign-up', error.status);
  // console.error(error.status);
};

const signOutFailure = (error) => {
  utils.addErrorMessage('#sign-out', error.status);
  // console.error(error.status);
};

const changePassFailure = (error) => {
  utils.addErrorMessage('#change-password', error.status);
  // console.error(error.status);
};

module.exports = {
  signInSuccess,
  signUpSuccess,
  signOutSuccess,
  changePassSuccess,
  signInFailure,
  signUpFailure,
  signOutFailure,
  changePassFailure,
};
