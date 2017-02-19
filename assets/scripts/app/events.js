'use strict';

const api = require('./api');
const ui = require('./ui');

const onGetList = function (event) {
  event.preventDefault();
  api.getLists()
    .then(ui.onSuccess)
    .catch(ui.onFailure);
};

const addHandlers = () => {
  $('#get-list').on('click', onGetList);
};

module.exports = {
  addHandlers,
};
