'use strict'

const draopdownOptionTemplate = require('./templates/dropdown-option.handlebars')
const statDropdownOptionTemplate = require('./templates/stat-dropdown-template.handlebars')
const api = require('./practices/api')

const populateDropOptionsFailure = function (data) {
  $('#crud-message').text(`Failed to Find Instruments`)
}

const onPracticeStatsButton = function (event) {
  event.preventDefault()
  api.indexPractices()
    .then(uniqueInstruments)
    .then(options => populateStatDropDown(options))
    .catch(populateDropOptionsFailure)
  $('#session-state-message').addClass('hidden')
  $('#crud-message').text('Practice Statistics')
  $('.table').addClass('hidden')
  $('#log-prt-menu').addClass('hidden')
  $('#auto-log-practices').addClass('hidden')
  $('#prt-stats-menu').removeClass('hidden')
  $('#warning-message').text('')
}

const uniqueInstruments = function (data) {
  const arrayOfOb = Object.values(data.practices)
  const practiceArray = []
  for (let i = 0; i < arrayOfOb.length; i++) {
    practiceArray.push(Object.values(arrayOfOb[i]))
  }
  const instrumentArray = []
  for (let i = 0; i < practiceArray.length; i++) {
    instrumentArray.push(practiceArray[i][4])
  }
  const unique = instrumentArray.filter((item, i, ar) => ar.indexOf(item) === i)
  return unique
}

function populateStatDropDown (unique) {
  const statDropOptionsHtml = statDropdownOptionTemplate({ instrument: unique })
  $('#inputGroupSelect').append(statDropOptionsHtml)
}

function populateLogDropDown (unique) {
  const dropOptionsHtml = draopdownOptionTemplate({ instrument: unique })
  $('#instruments').html(dropOptionsHtml)
}

const onLogPracticeButton = function (event) {
  event.preventDefault()
  api.indexPractices()
    .then(uniqueInstruments)
    .then(options => populateLogDropDown(options))
    .catch(populateDropOptionsFailure)
  $('#session-state-message').addClass('hidden')
  $('#crud-message').text('Log a New Practice')
  $('.table').addClass('hidden')
  $('#prt-stats-menu').addClass('hidden')
  $('#auto-log-practices').removeClass('hidden')
  $('#log-prt-menu').addClass('hidden')
  $('#warning-message').text('')
  $('#inputGroupSelect').html('<option selected  value="Total" class="light">Total</option>')
  $('#stat-message').text('')
  $('#session-count-span').text('')
  $('#time-count-span').text('')
}

function manualLogPractice () {
  $('#log-prt-menu').removeClass('hidden')
  $('#auto-log-practices').addClass('hidden')
}

function autoLogPractice () {
  $('#auto-log-practices').removeClass('hidden')
  $('#log-prt-menu').addClass('hidden')
}

module.exports = {
  onPracticeStatsButton,
  onLogPracticeButton,
  manualLogPractice,
  autoLogPractice
}
