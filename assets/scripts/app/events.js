'use strict';

// const getFormFields = require('../../../lib/get-form-fields');

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
  api.indexBooks()
    .then(ui.exploreBooks)
    .catch(ui.onFailure);
};

const onExploreBooks = function (event) {
  event.preventDefault();
  $('#list').empty();
  $('#list').append(exploreBooksLanding());
};

const addHandlers = () => {
  $('#get-list').on('click', onGetList);
  $('#explore-books').on('click', onExploreBooks);
};

module.exports = {
  addHandlers,
};
