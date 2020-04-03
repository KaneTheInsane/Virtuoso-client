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
  $('.box').text('')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  $('.secondary').addClass('hidden')
  $('.content').html('')
}

const signOutFailure = function () {
  $('#api-message').text('Error on sign out')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
}

const indexPracticesSuccess = function (data) {
  const indexPracticesHtml = indexPracticesTemplate({ practices: data.practices })
  $('.content').html(indexPracticesHtml)
  $('#crud-message').text('List of Practices')
  console.log(data)
  store.practices = data
}

const createPracticeSuccess = function (data) {
  $('#crud-message').text('Created New Practice!')
  console.log(data)
  store.practices = data
}

const updatePracticeSuccess = function (data) {
  $('#crud-message').text(`Updated Practice ${store.updateId}!`)
  console.log(data)
  store.practices = data
}

const deletePracticeSuccess = function (data) {
  $('#crud-message').text(`Deleted Practice ${store.deleteId}!`)
  console.log(data)
  store.practices = data
}

const indexPracticesFailure = function (data) {
  $('#crud-message').text('Failed to Find List')
  console.log(data)
  store.practices = data
}

const createPracticeFailure = function (data) {
  $('#crud-message').text('Error on Create')
  console.log(data)
  store.practices = data
}

const updatePracticeFailure = function (data) {
  $('#crud-message').text(`Error on Update`)
  console.log(data)
  store.practices = data
}

const deletePracticeFailure = function (data) {
  $('#crud-message').text(`Error on Delete`)
  console.log(data)
  store.practices = data
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
  deletePracticeFailure
}
