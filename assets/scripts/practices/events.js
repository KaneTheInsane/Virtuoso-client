'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const updateTableTemplate = require('../templates/update-table.handlebars')

// Get events

const onIndexPractices = function (event) {
  event.preventDefault()
  api.indexPractices()
    .then(ui.indexPracticesSuccess)
    .catch(ui.indexPracticesFailure)
}

const onGetPracticeStats = function (event) {
  event.preventDefault()
  store.instrumentStat = $('#inputGroupSelect').val()
  if (store.instrumentStat === null || store.instrumentStat === 'Choose...') {
    $('#stat-message').text('No Instrument Selected')
    $('#session-count-span').text('')
    $('#time-count-span').text('')
  } else {
    $('#stat-message').text('')
    api.indexPractices()
      .then(ui.getPracticeStatsSuccess)
      .catch(ui.getPracticeStatsFailure)
  }
}

// Create event

const onCreatePractice = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  const instrument = data.practice.instrument
  const practiceValueArray = Object.values(data.practice)
  if (practiceValueArray.some(x => x === '') === true) {
    $('#warning-message').text('Please fill out all forms')
  } else {
    data.practice.instrument = instrument.charAt(0).toUpperCase() + instrument.slice(1)
    api.createPractice(data)
      .then(ui.createPracticeSuccess)
      .catch(ui.createPracticeFailure)
  }
}

// Update Events

const onUpdatePractice = function (event) {
  event.preventDefault()
  store.updateData = getFormFields($('.update-prt')[0])
  api.showPractice()
    .then(checkPracticeForEmpty)
    .catch(ui.updatePracticeFailure)
}
const checkPracticeForEmpty = function (data) {
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
  console.log($(`section[data-id=${store.updateItemId}]`)[0])
  api.showPractice(store.updateItemId)
    .then(updateTable)
    .catch(ui.updatePracticeFailure)
}

const updateTable = function (data) {
  console.log(data)
  const updateTableHtml = updateTableTemplate({practice: data.practice})
  console.log(updateTableHtml)
  $((`section[data-id=${store.updateItemId}]`)[0]).replaceWith(updateTableHtml)
  $('#content').append(updateTableHtml)
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
}

module.exports = {
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
