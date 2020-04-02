'use strict'

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
  // console.log('signUpSuccess data is: ', data)
}

const signUpFailure = function () {
  $('#api-message').text('Error on sign up')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  // console.log('signUpFailure error is: ', error)
}

const signInSuccess = function (data) {
  // console.log(data)
  $('#api-message').text('You are signed as ' + data.user.email)
  $('#api-message').removeClass()
  $('#api-message').addClass('success')
  $('#change-password-btn').removeClass('hidden')
  $('#sign-out-btn').removeClass('hidden')
  $('#sign-in-btn').addClass('hidden')
  $('#sign-up-btn').addClass('hidden')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  // console.log('signInSuccess data is: ', data)
  store.user = data.user
}

const signInFailure = function () {
  $('#api-message').text('Error on sign in')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  // console.log('signInFailure error is: ', error)
}

const changePasswordSuccess = function (data) {
  $('#api-message').text('Password changed successfully')
  $('#api-message').removeClass()
  $('#api-message').addClass('success')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  // console.log('changePasswordSuccess data is: ', data)
}

const changePasswordFailure = function () {
  $('#api-message').text('Error on change password')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  // console.log('changePasswordFailure error is: ', error)
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
  $('.box').text('')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  // console.log('signOutSuccess data is: ', data)
}

const signOutFailure = function () {
  $('#api-message').text('Error on sign out')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
//   console.log('signOutFailure error is: ', error)
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
