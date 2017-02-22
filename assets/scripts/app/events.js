'use strict';

// const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');

const onGetList = function (event) {
  event.preventDefault();
  $('#list').empty();
  api.getLists()
    .then(ui.readingDisplay)
    .catch(ui.onFailure);
};

const onGetBooks = function (event) {
  event.preventDefault();
  $('#list').empty();
  api.indexBooks()
    .then(ui.exploreBooks)
    .catch(ui.onFailure);
};

// const onCreateBook = function (event) {
//   event.preventDefault();
//   let data = getFormFields(event.target);
//   api.createBook(data)
//     .then(ui.onCreationSuccess)
//     .catch(ui.onFailure);
// };

const addHandlers = () => {
  $('#get-list').on('click', onGetList);
  $('#explore-books').on('click', onGetBooks);
};

module.exports = {
  addHandlers,
};
