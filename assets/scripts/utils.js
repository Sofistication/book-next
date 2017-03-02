'use strict';

const clearInput = function (element) {
  $(element + ' > div > input').val('');
};

const clearModalInput = function (element) {
  $(element + ' > fieldset > label > input').val('');
};

const addErrorMessage = function (element, status) {
  let html = '<p class="modal-error">';
  switch (status) {
    case 401:
      html += 'Wrong Username or Password!';
      break;
    default:
      html += 'Unexpected Error!';
  }
  html += '</p>';
  $(element).append(html);
};

const clearErrorMessage = function (element) {
  $(element + '> .modal-error').remove();
};

const mainDisplay = function () {
  $('.second-bar').removeClass('hidden');
  $('.second-bar').show();
  $('.initial-bar').hide();
};

const openingDisplay = function () {
  $('.second-bar').hide();
  $('.initial-bar').show();
  $('#list').html('');
};

module.exports = {
  clearInput,
  clearModalInput,
  addErrorMessage,
  clearErrorMessage,
  mainDisplay,
  openingDisplay
};
