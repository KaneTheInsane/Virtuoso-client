'use strict'

const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./store')

// Auth Events

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

// Get events

const onIndexPractices = function (event) {
  event.preventDefault()
  api.indexPractices()
    .then(ui.indexPracticesSuccess)
    .catch(ui.indexPracticesFailure)
}

const onGetPracticeStats = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  store.instrumentStat = data.instrument
  api.indexPractices()
    .then(ui.getPracticeStatsSuccess)
    .catch(ui.getPracticeStatsFailure)
}

// Create event

const onCreatePractice = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  const practiceValueArray = Object.values(data.practice)
  if (practiceValueArray.some(x => x === '') === true) {
    $('#warning-message').text('Please fill out all forms')
  } else {
    api.createPractice(data)
      .then(ui.createPracticeSuccess)
      .catch(ui.createPracticeFailure)
  }
}

// Update Events

const onUpdatePractice = function (event) {
  event.preventDefault()
  console.log($('.update-prt')[0])
  store.updateData = getFormFields($('.update-prt')[0])
  api.showPractice()
    .then(showPracticeSuccess)
    .catch(ui.updatePracticeFailure)
}
const showPracticeSuccess = function (data) {
  const currentValueArray = Object.values(data.practice).slice(1, 5)
  const updateValueArray = Object.values(store.updateData.practice)
  const instrument = currentValueArray.pop()
  currentValueArray.unshift(instrument)
  for (let i = 0; i <= updateValueArray.length; i++) {
    if (updateValueArray[i] === '') {
      updateValueArray[i] = currentValueArray[i]
    }
  }
  const practiceData = { practice: {
    date: updateValueArray[1],
    start_time: updateValueArray[2],
    duration: updateValueArray[3],
    instrument: updateValueArray[0]
  }}
  api.updatePractice(practiceData, store.updateItemId)
    .then(ui.updatePracticeSuccess)
    .catch(ui.updatePracticeFailure)
}

const cancelUpdate = function (event) {
  event.preventDefault()
  store.updateItemId = undefined
}

const selectUpdate = function (event) {
  event.preventDefault()
  store.updateItemId = $(event.target).data('id')
  console.log(store.updateItemId)
}

// Delete events

const onDeletePractice = function (event) {
  event.preventDefault()
  // store.itemId = $(event.target).data('id')
  api.deletePractice(store.itemId)
    .then(ui.deletePracticeSuccess)
    .catch(ui.deletePracticeFailure)
}

const cancelDelete = function (event) {
  event.preventDefault()
  store.itemId = undefined
}

const selectDelete = function (event) {
  event.preventDefault()
  store.itemId = $(event.target).data('id')
  console.log(store.itemId)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onIndexPractices,
  onCreatePractice,
  onUpdatePractice,
  onDeletePractice,
  onGetPracticeStats,
  cancelDelete,
  selectDelete,
  cancelUpdate,
  selectUpdate
}
