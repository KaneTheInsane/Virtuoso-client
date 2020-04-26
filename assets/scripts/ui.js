'use strict'

const draopdownOptionTemplate = require('./templates/dropdown-option.handlebars')
const api = require('./practices/api')

const populateDropOptionsFailure = function (data) {
  $('#crud-message').text(`Failed to Find Instruments`)
}

const onPracticeStatsButton = function (event) {
  event.preventDefault()
  api.indexPractices()
    .then(populateDropOptionsSuccess)
    .catch(populateDropOptionsFailure)
  $('#session-state-message').addClass('hidden')
  $('#crud-message').text('Practice Statistics')
  $('.table').addClass('hidden')
  $('#log-prt-menu').addClass('hidden')
  $('#prt-stats-menu').removeClass('hidden')
  $('#warning-message').text('')
}

const populateDropOptionsSuccess = function (data) {
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
  const dropOptionsHtml = draopdownOptionTemplate({ instrument: unique })
  $('#inputGroupSelect').append(dropOptionsHtml)
}

const onLogPracticeButton = function (event) {
  event.preventDefault()
  $('#session-state-message').addClass('hidden')
  $('#crud-message').text('Log a New Practice')
  $('.table').addClass('hidden')
  $('#prt-stats-menu').addClass('hidden')
  $('#log-prt-menu').removeClass('hidden')
  $('#warning-message').text('')
  $('#inputGroupSelect').html('')
  $('#stat-message').text('')
  $('#session-count-span').text('')
  $('#time-count-span').text('')
}

module.exports = {
  onPracticeStatsButton,
  onLogPracticeButton
}
