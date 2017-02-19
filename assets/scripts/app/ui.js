'use strict';
const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const displayList = require('../templates/display-list.handlebars');

const onCreationSuccess = function (data) {
  console.log(data);
};

const onFailure = function (error) {
  console.error(error);
};

const onSuccess = function (data) {
  console.log(data);
  // clear out any previous list that might be present
  $('#list').html('');
  // construct html for list to display based on response from server
  let bookListHtml = displayList({ books: data.books });
  // inject new html into list container
  $('#list').append(bookListHtml);

  // add event handler to create book
  $('#newBookForm').on('submit', function (event) {
    event.preventDefault();
    let data = getFormFields(event.target);
    api.createBook(data)
      .then(onCreationSuccess)
      .catch(onFailure);
  });
};

module.exports = {
  onSuccess,
  onCreationSuccess,
  onFailure,
};
