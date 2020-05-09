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
    console.log(data)
    api.createPractice(data)
      .then(ui.createPracticeSuccess)
      .catch(ui.createPracticeFailure)
  }
}

// Update Events

const onUpdatePractice = function (event) {
  event.preventDefault()
  const practiceData = { practice: {
    date: $($('#update-input-date')[0]).val(),
    start_time: $($('#update-input-time')[0]).val(),
    duration: $($('#update-input-duration')[0]).val(),
    instrument: $($('#update-input-instrument')[0]).val()
  }}
  $('.update-modal').attr('disabled', false)
  $('.delete-modal').attr('disabled', false)
  api.updatePractice(practiceData, store.updateItemId)
    .then(ui.updatePracticeSuccess)
    .catch(ui.updatePracticeFailure)
}

const cancelUpdate = function (event) {
  event.preventDefault()
  store.updateItemId = undefined
  $('.update-modal').attr('disabled', false)
  $('.delete-modal').attr('disabled', false)
  api.indexPractices()
    .then(ui.indexPracticesSuccess)
    .catch(ui.indexPracticesFailure)
}

const selectUpdate = function (event) {
  event.preventDefault()
  store.updateItemId = $(event.target).data('id')
  $('.update-modal').attr('disabled', true)
  $('.delete-modal').attr('disabled', true)
  api.showPractice(store.updateItemId)
    .then(updateTable)
    .catch(ui.updatePracticeFailure)
}

const updateTable = function (data) {
  const updateTableHtml = updateTableTemplate({practice: data.practice})
  $($(`tr[data-id=${store.updateItemId}]`)[0]).html(updateTableHtml)
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

// Auto log

function onStartAutoLog () {
  if ($('.log-drop').val() !== '') {
    $('.stp-auto-log').removeClass('hidden')
    $('.str-auto-log').addClass('hidden')
    store.logStart = new Date()
  } else {
    $('#warning-message').text('Cannot leave instrument field blank')
  }
}

function onStopAutoLog () {
  $('.str-auto-log').removeClass('hidden')
  $('.stp-auto-log').addClass('hidden')
  const stopLog = new Date()
  const instrument = $('.log-drop').val()
  const instrumentCapitilized = instrument.charAt(0).toUpperCase() + instrument.slice(1)
  const duration = ((stopLog.getTime()) - (store.logStart.getTime())) / 1000 / 60
  const durationMinutes = Math.round(duration)
  if (durationMinutes > 1) {
    const practiceData = { practice: {
      date: store.logStart.toLocaleDateString(),
      start_time: store.logStart.toLocaleTimeString(),
      duration: durationMinutes, // in minutes
      instrument: instrumentCapitilized
    }}
    api.createPractice(practiceData)
      .then(ui.createPracticeSuccess)
      .catch(ui.createPracticeFailure)
  } else {
    $('#warning-message').text('Cannot record session under 1 minute')
  }
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
  selectUpdate,
  onStartAutoLog,
  onStopAutoLog
}
