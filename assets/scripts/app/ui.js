'use strict';

const displayList = require('../templates/display-list.handlebars');

const onSuccess = function (data) {
  console.log(data);
  // clear out any previous list that might be present
  $('#list').html('');
  // construct html for list to display based on response from server
  let bookListHtml = displayList({ books: data.books });
  // inject new html into list container
  $('#list').append(bookListHtml);
};

const onFailure = function (error) {
  console.error(error);
};

module.exports = {
  onSuccess,
  onFailure,
};
