'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  $('#api-message').text('Signed up successfully')
  $('#api-message').removeClass()
  $('#api-message').addClass('success')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  store.user = data.user
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

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
