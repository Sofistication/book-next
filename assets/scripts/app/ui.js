'use strict';

const onSuccess = function (data) {
  console.log(data);
};

const onFailure = function (error) {
  console.error(error);
};

module.exports = {
  onSuccess,
  onFailure,
};
