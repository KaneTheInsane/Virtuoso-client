'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth-events.js')
const uiEvents = require('./ui')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // Account actions
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out-btn').on('submit', authEvents.onSignOut)

  // Pure UI actions
  $('#log-prt-btn').on('click', uiEvents.onLogPracticeButton)
  $('#prt-stats-btn').on('click', uiEvents.onPracticeStatsButton)

  // User actions
  $('#index-prt-btn').on('submit', authEvents.onIndexPractices)
  $('#get-prt-stats').on('submit', authEvents.onGetPracticeStats)
  $('#create-prt').on('submit', authEvents.onCreatePractice)

  // Delete actions
  $('.content').on('click', '.delete-button', authEvents.onDeletePractice)
  $('.content').on('click', '.cancel-delete', authEvents.cancelDelete)
  $('.content').on('click', '.delete-modal', authEvents.selectDelete)

  // Update actions
  $('.content').on('click', '.update-button', authEvents.onUpdatePractice)
  $('.content').on('click', '.cancel-update', authEvents.cancelUpdate)
  $('.content').on('click', '.update-modal', authEvents.selectUpdate)

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
