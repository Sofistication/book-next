'use strict';

const config = require('../config');
const store = require('../store');

const indexBooks = function () {
  return $.ajax({
    url: config.apiOrigin + '/books',
    method: 'GET',
  });
};

const showBook = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/books/' + id,
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

const createBook = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/books',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
    data,
  });
};

const updateBook = function (data, id) {
  return $.ajax({
    url: config.apiOrigin + '/books/' + id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
    data,
  });
};

module.exports = {
  indexBooks,
  showBook,
  getLists,
  createBook,
  updateBook,
};
