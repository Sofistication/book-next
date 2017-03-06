'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');

const exploreBooksLanding = require('../templates/explore-books.handlebars');

const onGetList = function (event) {
  event.preventDefault();
  $('#list').empty();
  api.getLists()
    .then(ui.readingDisplay)
    .catch(ui.onFailure);
};

const onGetBooks = function (event) {
  event.preventDefault();
  $('#bookResults').empty();
  let data = getFormFields(event.target);
  if (data.title || data.author) {
    api.searchBooks(data)
      .then(ui.exploreBooks)
      .catch(ui.onFailure);
  } else {
    api.indexBooks()
      .then(ui.exploreBooks)
      .catch(ui.onFailure);
  }

};

const onExploreBooks = function (event) {
  event.preventDefault();
  $('#list').empty();
  $('#list').append(exploreBooksLanding());
  $('#bookSearch').on('submit', onGetBooks);
  // add event handler to create book
  $('#newBookForm').on('submit', function (event) {
    event.preventDefault();
    let data = getFormFields(event.target);
    api.createBook(data)
      .then(ui.onCreationSuccess)
      .catch(ui.onFailure);
  });
};

const addHandlers = () => {
  $('#get-list').on('click', onGetList);
  $('#explore-books').on('click', onExploreBooks);
};

module.exports = {
  addHandlers,
};
