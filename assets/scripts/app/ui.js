'use strict';

const displayList = require('../templates/display-list.handlebars');

const onSuccess = function (data) {
  console.log(data);
  let bookListHtml = displayList({ books: data.books });
  $('#list').append(bookListHtml);
};

const onFailure = function (error) {
  console.error(error);
};

module.exports = {
  onSuccess,
  onFailure,
};
