'use strict';
const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const utils = require('../utils');
const store = require('../store');

const displayList = require('../templates/display-list.handlebars');
const readingList = require('../templates/display-reading-list.handlebars');
const listEntry = require('../templates/list-entry.handlebars');
const readingListEntry = require('../templates/reading-list-entry.handlebars');

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

// const onUpdateSuccess = function(data) {
//   let updatedBookHtml = listEntry({ book: data.book });
//   $("div[data-id='" + data.book.id +"']").replaceWith(updatedBookHtml);
// };
//
// const onUpdateReadingSuccess = function(data) {
//   console.log(data);
//   let updatedBookHtml = readingListEntry({ reading: data.reading });
//   $("div[data-id='" + data.reading.id +"']").replaceWith(updatedBookHtml);
// };

const exploreBooks = function (data) {
  if (data.books.length === 0) {
    $('#bookResults').append('<p class="searchError">No results!</p>');
  }

  // construct html for list to display based on response from server
  let bookListHtml = displayList({ books: data.books, });
  // inject new html into list container
  $('#bookResults').append(bookListHtml);

  // add event handlers for adding books to list
  $('.addReading').on('click', function (event) {
    event.preventDefault();
    api.createReading(event.target.dataset.book)
      .then()
      .catch(onFailure);
  });

  // add event handler to create book
  $('#newBookForm').on('submit', function (event) {
    event.preventDefault();
    let data = getFormFields(event.target);
    api.createBook(data)
      .then(onCreationSuccess)
      .catch(onFailure);
  });

  // // add event handlers to update books
  // $('.updateBookForm').on('submit', function (event) {
  //   event.preventDefault();
  //   let data = getFormFields(event.target);
  //   let bookId = event.target.dataset.book;
  //   // $('#updateBookModal-' + bookId).modal('hide');
  //   api.updateBook(data, bookId)
  //     .then(function () {
  //       $('#updateBookModal-' + bookId).modal('hide');
  //     })
  //     .then(function () {
  //       // $('.updateModal').modal('hide');
  //       api.showBook(bookId)
  //         .then(onUpdateSuccess)
  //         .catch(onFailure);
  //     })
  //     .catch(onFailure);
  // });
};

const readingDisplay = function (data) {
  // construct html for list to display based on response from server
  let bookListHtml = readingList({ readings: data.readings, });
  // inject new html into list container
  $('#list').append(bookListHtml);

  // add event handlers for adding books to list
  $('.removeReading').on('click', function (event) {
    event.preventDefault();
    let id = event.target.dataset.id;
    api.deleteReading(id)
      .then(function () {
        $("div[data-id='" + id +"']").remove();
        $("button[data-id='" + id +"']").remove();
        $("button[data-book='" + event.target.dataset.book +"']").remove();
      })
      .catch(onFailure);
  });

  $('.status-option').on('click', function (event) {
    event.preventDefault();
    let id = event.target.dataset.id;
    let stat = event.target.dataset.status;

    let data = {
      reading: {
        status: stat,
      }
    };

    api.updateReading(data, id)
      .then(function () {
        $('a[data-id="status-' + id + '"]').text(stat);
      })
      .catch(onFailure);
  });

  // // add event handlers to update books
  // $('.updateBookForm').on('submit', function (event) {
  //   event.preventDefault();
  //   let data = getFormFields(event.target);
  //   let bookId = event.target.dataset.book;
  //   let id = event.target.dataset.id;
  //   api.updateBook(data, bookId)
  //     .then(function () {
  //       $('#updateBookModal-' + bookId).modal('hide');
  //     })
  //     .then(function () {
  //       api.showReading(id)
  //         .then(onUpdateReadingSuccess)
  //         .catch(onFailure);
  //     })
  //     .catch(onFailure);
  // });
};

module.exports = {
  exploreBooks,
  readingDisplay,
  onCreationSuccess,
  onFailure,
};
