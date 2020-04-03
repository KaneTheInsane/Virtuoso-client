'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth-events.js')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // Account actions
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out-btn').on('submit', authEvents.onSignOut)

  // User specific actions
  $('#index-prt-btn').on('submit', authEvents.onIndexPractices)
  $('#create-prt').on('submit', authEvents.onCreatePractice)
  $('#update-prt').on('submit', authEvents.onUpdatePractice)
  $('#delete-prt').on('submit', authEvents.onDeletePractice)

  // Dropdown menu closed after submitting
  $('#sign-in-drop').on('submit', function () {
    $('#sign-in-btn').dropdown('toggle')
  })
  $('#new-game-drop').on('submit', function () {
    $('#new-game-btn').dropdown('toggle')
  })
  $('#sign-up-drop').on('submit', function () {
    $('#sign-up-btn').dropdown('toggle')
  })
  $('#change-password-drop').on('submit', function () {
    $('#change-password-btn').dropdown('toggle')
  })
  $('#create-prt-drop').on('submit', function () {
    $('#create-prt-btn').dropdown('toggle')
  })
  $('#update-prt-drop').on('submit', function () {
    $('#update-prt-btn').dropdown('toggle')
  })
  $('#delete-prt-drop').on('submit', function () {
    $('#delete-prt-btn').dropdown('toggle')
  })
})
