'use strict';

const config = require('../config');

const indexBooks = function () {
  return $.ajax({
    url: config.apiOrigin + '/books',
    method: 'GET',
  });
};

module.exports = {
  indexBooks,
};
