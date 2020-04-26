'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events.js')
const practiceEvents = require('./practices/events')
const uiEvents = require('./ui')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // Account actions
  $('.sign-up-button').on('click', authEvents.onSignUp)
  $('.sign-in-button').on('click', authEvents.onSignIn)
  $('.change-password-button').on('click', authEvents.onChangePassword)
  $('#sign-out-btn').on('submit', authEvents.onSignOut)

  // Pure UI actions
  $('#log-prt-btn').on('click', uiEvents.onLogPracticeButton)
  $('#prt-stats-btn').on('click', uiEvents.onPracticeStatsButton)

  // User actions
  $('#index-prt-btn').on('submit', practiceEvents.onIndexPractices)
  // $('#get-prt-stats').on('submit', practiceEvents.onGetPracticeStats)
  $('#prt-stats-menu').on('submit', practiceEvents.onGetPracticeStats)
  $('#create-prt').on('submit', practiceEvents.onCreatePractice)

  // Delete actions
  $('.delete-button').on('click', practiceEvents.onDeletePractice)
  $('.cancel-delete').on('click', practiceEvents.cancelDelete)
  $('.content').on('click', '.delete-modal', practiceEvents.selectDelete)

  // Update actions
  $('.update-button').on('click', practiceEvents.onUpdatePractice)
  $('.cancel-update').on('click', practiceEvents.cancelUpdate)
  $('.content').on('click', '.update-modal', practiceEvents.selectUpdate)

  $('#SUEnter').keypress(function (event) {
    console.log(event.keyCode)
    if (event.keyCode === 13) {
      $('.sign-up-button').click()
    }
  })
  $('#SIEnter').keypress(function (event) {
    if (event.keyCode === 13) {
      $('.sign-in-button').click()
    }
  })
  $('#CPnter').keypress(function (event) {
    if (event.keyCode === 13) {
      $('.change-password-button').click()
    }
  })
})

// <option value="{{inc @index}}">{{this}}</option>
