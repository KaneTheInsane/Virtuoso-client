'use strict'

const indexPracticesTemplate = require('./templates/practice-listing.handlebars')

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
  $('#api-message').text('Password changed successfully')
  $('#api-message').removeClass()
  $('#api-message').addClass('success')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
}

const changePasswordFailure = function () {
  $('#api-message').text('Error on change password')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
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
  $('.box').text('')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  $('form input[class="form-input"]').val('')
  $('.secondary').addClass('hidden')
  $('.content').html('')
  $('#warning-message').text('')
}

const signOutFailure = function () {
  $('#api-message').text('Error on sign out')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
}

const indexPracticesSuccess = function (data) {
  $('#log-prt-menu').addClass('hidden')
  $('#prt-stats-menu').addClass('hidden')
  $('.table').removeClass('hidden')
  const indexPracticesHtml = indexPracticesTemplate({ practices: data.practices })
  $('.content').html(indexPracticesHtml)
  $('#crud-message').text('List of Practices')
  $('#warning-message').text('')
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
  $('form input[class="form-input"]').val('')
  store.practices = data
}

const updatePracticeSuccess = function (data) {
  $('#crud-message').text(`Updated Practice!`)
  $('form input[class="form-input"]').val('')
  store.practices = data
}

const deletePracticeSuccess = function (data) {
  // const indexPracticesHtml = indexPracticesTemplate({ practices: data.practices })
  // $('.content').html(indexPracticesHtml)
  $('#crud-message').text(`Deleted Practice!`)
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

const onPracticeStatsButton = function (event) {
  event.preventDefault()
  $('#crud-message').text('Practice Statistics')
  $('.table').addClass('hidden')
  $('#log-prt-menu').addClass('hidden')
  $('#prt-stats-menu').removeClass('hidden')
  $('#warning-message').text('')
}

const onLogPracticeButton = function (event) {
  event.preventDefault()
  $('#crud-message').text('Log a New Practice')
  $('.table').addClass('hidden')
  $('#prt-stats-menu').addClass('hidden')
  $('#log-prt-menu').removeClass('hidden')
  $('#warning-message').text('')
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
