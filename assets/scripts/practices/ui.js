'use strict'

const indexPracticesTemplate = require('../templates/practice-listing.handlebars')
const store = require('../store')
const api = require('./api')

const indexPracticesSuccess = function (data) {
  if (data.practices.length === 0) {
    $('#session-state-message').removeClass('hidden')
    $('#session-state-message').text('No Practices Logged')
  } else {
    $('#session-state-message').addClass('hidden')
  }
  $('#log-prt-menu').addClass('hidden')
  $('#prt-stats-menu').addClass('hidden')
  $('.table').removeClass('hidden')
  const indexPracticesHtml = indexPracticesTemplate({ practices: data.practices })
  $('.content').html(indexPracticesHtml)
  $('#crud-message').text('List of Practices')
  $('#warning-message').text('')
  $('#inputGroupSelect').html('')
  $('#stat-message').text('')
  $('#session-count-span').text('')
  $('#time-count-span').text('')
}

const getPracticeStatsSuccess = function (data) {
  const singleInstrumentArray = data.practices.filter(x => x.instrument === store.instrumentStat)
  const totalTime = singleInstrumentArray.reduce(function (prev, cur) {
    return prev + cur.duration
  }, 0)
  $('#session-count-span').text(singleInstrumentArray.length)
  $('#time-count-span').text(Math.round(totalTime * 10) / 10)
}

const createPracticeSuccess = function (data) {
  $('#crud-message').text('Created New Practice!')
  $('#warning-message').text('')
  $('#create-prt')[0].reset('')
}

const updatePracticeSuccess = function (data) {
  $('#crud-message').text(`Updated Practice!`)
  $('form input[class="form-input"]').val('')
  api.indexPractices()
    .then(refreshListSuccess)
    .catch(refreshListFailure)
}

const deletePracticeSuccess = function (data) {
  $('#crud-message').text(`Deleted Practice!`)
  api.indexPractices()
    .then(refreshListSuccess)
    .catch(refreshListFailure)
}

const refreshListSuccess = function (data) {
  const indexPracticesHtml = indexPracticesTemplate({ practices: data.practices })
  $('.content').html(indexPracticesHtml)
}

// Failures Messages
const refreshListFailure = function (data) {
  $('#crud-message').text(`Failed to Update list`)
}

const indexPracticesFailure = function (data) {
  $('#crud-message').text('Failed to Find List')
}

const createPracticeFailure = function (data) {
  $('#crud-message').text('Error on Create')
}

const updatePracticeFailure = function (data) {
  $('#crud-message').text(`Error on Update`)
}

const deletePracticeFailure = function (data) {
  $('#crud-message').text(`Error on Delete`)
}

module.exports = {
  indexPracticesSuccess,
  createPracticeSuccess,
  updatePracticeSuccess,
  deletePracticeSuccess,
  indexPracticesFailure,
  createPracticeFailure,
  updatePracticeFailure,
  deletePracticeFailure,
  getPracticeStatsSuccess
}
