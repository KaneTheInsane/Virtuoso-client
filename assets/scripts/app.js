'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events.js')
const practiceEvents = require('./practices/events')
const uiEvents = require('./ui')
const metrenomeEvents = require('./metrenome/events')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // Account actions
  $('.sign-up-button').on('click', authEvents.onSignUp)
  $('.sign-in-button').on('click', authEvents.onSignIn)
  $('.change-password-button').on('click', authEvents.onChangePassword)
  $('#sign-out-btn').on('submit', authEvents.onSignOut)
  $('#Demo').on('click', authEvents.onDemoSignIn)

  // Pure UI actions
  $('#log-prt-btn').on('click', uiEvents.onLogPracticeButton)
  $('#prt-stats-btn').on('click', uiEvents.onPracticeStatsButton)
  $('.manual-log').on('click', uiEvents.manualLogPractice)
  $('.auto-log').on('click', uiEvents.autoLogPractice)

  // User actions
  $('#index-prt-btn').on('submit', practiceEvents.onIndexPractices)
  // $('#get-prt-stats').on('submit', practiceEvents.onGetPracticeStats)
  $('#prt-stats-menu').on('submit', practiceEvents.onGetPracticeStats)
  $('#create-prt').on('submit', practiceEvents.onCreatePractice)
  $('.str-auto-log').on('click', practiceEvents.onStartAutoLog)
  $('.stp-auto-log').on('click', practiceEvents.onStopAutoLog)

  // Delete actions
  $('.delete-button').on('click', practiceEvents.onDeletePractice)
  $('.cancel-delete').on('click', practiceEvents.cancelDelete)
  $('.content').on('click', '.delete-modal', practiceEvents.selectDelete)

  // Update actions
  $('.content').on('click', '.update-button', practiceEvents.onUpdatePractice)
  $('.content').on('click', '.cancel-update', practiceEvents.cancelUpdate)
  $('.content').on('click', '.update-modal', practiceEvents.selectUpdate)

  // Metronome actions
  $('#metronome-switch').on('change', metrenomeEvents.toggleMetrenome)
  $('#audio-test').on('click', metrenomeEvents.playSound)

  // Enter key confirms sign in/up
  $('#SUEnter').keypress(function (event) {
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
