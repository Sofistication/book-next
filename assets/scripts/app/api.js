'use strict';

const config = require('../config');
const store = require('../store');

const indexBooks = function () {
  return $.ajax({
    url: config.apiOrigin + '/books',
    method: 'GET',
  });
};

const getLists = function () {
  return $.ajax({
    url: config.apiOrigin + '/lists',
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
  });
};

module.exports = {
  indexBooks,
  getLists
};
