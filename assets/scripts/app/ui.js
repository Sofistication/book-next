'use strict';
const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const utils = require('../utils');
const store = require('../store');

const displayList = require('../templates/display-list.handlebars');
const listEntry = require('../templates/list-entry.handlebars');

const onCreationSuccess = function (data) {
  // hide modal and clear input
  $('#newBookModal').modal('hide');
  utils.clearModalInput('#newBookForm');
  // create new entry on list from successfully created book
  let newBookHtml = listEntry({ book: data.book });
  // add new entry to list
  $('#bookList').append(newBookHtml);
};

const onFailure = function (error) {
  console.error(error);
};

const onSuccess = function (data) {
  // clear out any previous list that might be present
  $('#list').html('');
  // set appropriate page title
  if (store.activeScreen === 'list') {
    $('#list').append('<h2>Your Reading List</h2>');
  } else if (store.activeScreen === 'explore') {
    $('#list').append('<h2>Explore Books!</h2>');
  }

  // construct html for list to display based on response from server
  let bookListHtml = displayList({ books: data.books, });
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
