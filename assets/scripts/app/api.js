'use strict';

const config = require('../config');
const store = require('../store');

const indexBooks = function () {
  return $.ajax({
    url: config.apiOrigin + '/books',
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    }
  });
};

const searchBooks = function (data) {
  let endpoint = '/books?';
  if (!data.title) {
    endpoint += 'author=' + data.author;
  } else if (!data.author) {
    endpoint += 'title=' + data.title;
  } else {
    endpoint += 'title=' + data.title + '&author=' + data.author;
  }
  return $.ajax({
    url: config.apiOrigin + endpoint,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
  });
};

const showBook = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/books/' + id,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
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

const showReading = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/readings/' + id,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
  });
};

const createReading = function (book) {
  let data = {
    reading: {
      book_id: book,
      list: 'default',
      status: 'unread'
    }
  };

  return $.ajax({
    url: config.apiOrigin + '/readings',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
    data,
  });
};

const updateReading = function (data, id) {
  return $.ajax({
    url: config.apiOrigin + '/readings/' + id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
    data,
  });
};

const deleteReading = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/readings/' + id,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
  });
};

module.exports = {
  indexBooks,
  searchBooks,
  showBook,
  getLists,
  createBook,
  updateBook,
  showReading,
  createReading,
  updateReading,
  deleteReading,
};
