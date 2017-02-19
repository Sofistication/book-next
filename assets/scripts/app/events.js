'use strict';

// const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');
const store = require('../store');

const onGetList = function (event) {
  event.preventDefault();
  store.activeScreen = 'list';
  api.getLists()
    .then(ui.onSuccess)
    .catch(ui.onFailure);
};

const onGetBooks = function (event) {
  event.preventDefault();
  store.activeScreen = 'explore';
  api.indexBooks()
    .then(ui.onSuccess)
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
