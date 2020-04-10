'use strict'

const indexPracticesTemplate = require('./templates/practice-listing.handlebars')
const draopdownOptionTemplate = require('./templates/dropdown-option.handlebars')
const api = require('./api')
const store = require('./store')

const signUpSuccess = function (data) {
  $('#api-message').text('Signed up successfully')
  $('#api-message').removeClass()
  $('#api-message').addClass('success')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  store.user = data.user
  // future auto sign in
  // setTimeout((signInSuccess(data)), 2000)
}

const signUpFailure = function () {
  $('#api-message').text('Error on sign up')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
}

const signInSuccess = function (data) {
  $('#api-message').text('You are signed as ' + data.user.email)
  $('#api-message').removeClass()
  $('#api-message').addClass('success')
  $('#change-password-btn').removeClass('hidden')
  $('#sign-out-btn').removeClass('hidden')
  $('#sign-in-btn').addClass('hidden')
  $('#sign-up-btn').addClass('hidden')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  $('.secondary').removeClass('hidden')
  $('#entry-menu').addClass('hidden')
  $('#sticky-footer').removeClass('hidden')
  store.user = data.user
}

const signInFailure = function () {
  $('#api-message').text('Error on sign in')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
}

const changePasswordSuccess = function (data) {
  $('#crud-message').text('Password changed successfully')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
}

const changePasswordFailure = function () {
  $('#crud-message').text('Error on change password')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
}

const signOutSuccess = function (data) {
  $('#api-message').text('Signed out successfully')
  $('#api-message').removeClass()
  $('#api-message').addClass('success')
  $('#sign-in-btn').removeClass('hidden')
  $('#sign-up-btn').removeClass('hidden')
  $('#change-password-btn').addClass('hidden')
  $('#stats-btn').addClass('hidden')
  $('#sign-out-btn').addClass('hidden')
  $('.table').addClass('hidden')
  $('#log-prt-menu').addClass('hidden')
  $('#prt-stats-menu').addClass('hidden')
  $('#session-state-message').addClass('hidden')
  $('.box').text('')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  $('form input[class="form-input"]').val('')
  $('.secondary').addClass('hidden')
  $('.content').html('')
  $('#warning-message').text('')
  $('#inputGroupSelect').html('')
  $('#entry-menu').removeClass('hidden')
  $('#sticky-footer').addClass('hidden')
  $('#stat-message').text('')
  $('#session-count-span').text('')
  $('#time-count-span').text('')
}

const signOutFailure = function () {
  $('#api-message').text('Error on sign out')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
}

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

const populateDropOptionsFailure = function (data) {
  $('#crud-message').text(`Failed to Find Instruments`)
}

const onPracticeStatsButton = function (event) {
  event.preventDefault()
  api.indexPractices()
    .then(populateDropOptionsSuccess)
    .catch(populateDropOptionsFailure)
  $('#session-state-message').addClass('hidden')
  $('#crud-message').text('Practice Statistics')
  $('.table').addClass('hidden')
  $('#log-prt-menu').addClass('hidden')
  $('#prt-stats-menu').removeClass('hidden')
  $('#warning-message').text('')
}

const populateDropOptionsSuccess = function (data) {
  const arrayOfOb = Object.values(data.practices)
  const practiceArray = []
  for (let i = 0; i < arrayOfOb.length; i++) {
    practiceArray.push(Object.values(arrayOfOb[i]))
  }
  const instrumentArray = []
  for (let i = 0; i < practiceArray.length; i++) {
    instrumentArray.push(practiceArray[i][4])
  }
  const unique = instrumentArray.filter((item, i, ar) => ar.indexOf(item) === i)
  const dropOptionsHtml = draopdownOptionTemplate({ instrument: unique })
  $('#inputGroupSelect').append(dropOptionsHtml)
}

const onLogPracticeButton = function (event) {
  event.preventDefault()
  $('#session-state-message').addClass('hidden')
  $('#crud-message').text('Log a New Practice')
  $('.table').addClass('hidden')
  $('#prt-stats-menu').addClass('hidden')
  $('#log-prt-menu').removeClass('hidden')
  $('#warning-message').text('')
  $('#inputGroupSelect').html('')
  $('#stat-message').text('')
  $('#session-count-span').text('')
  $('#time-count-span').text('')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  indexPracticesSuccess,
  createPracticeSuccess,
  updatePracticeSuccess,
  deletePracticeSuccess,
  indexPracticesFailure,
  createPracticeFailure,
  updatePracticeFailure,
  deletePracticeFailure,
  onPracticeStatsButton,
  onLogPracticeButton,
  getPracticeStatsSuccess
}
