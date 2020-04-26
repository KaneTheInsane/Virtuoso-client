'use strict'

const config = require('../config')
const store = require('../store')

const indexPractices = function (data) {
  return $.ajax({
    url: config.apiUrl + '/practices',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const createPractice = function (data) {
  return $.ajax({
    url: config.apiUrl + '/practices',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const showPractice = function (data) {
  return $.ajax({
    url: config.apiUrl + '/practices/' + store.updateItemId,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const updatePractice = function (data, id) {
  return $.ajax({
    url: config.apiUrl + '/practices/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deletePractice = function (data) {
  return $.ajax({
    url: config.apiUrl + '/practices/' + data,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  indexPractices,
  createPractice,
  updatePractice,
  deletePractice,
  showPractice
}
