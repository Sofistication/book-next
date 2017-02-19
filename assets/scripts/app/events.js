'use strict';

// const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');

const onGetList = function (event) {
  event.preventDefault();
  api.getLists()
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
};

module.exports = {
  addHandlers,
  // onCreateBook,
};
