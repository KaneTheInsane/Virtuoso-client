'use strict'

const indexPracticesTemplate = require('../templates/practice-listing.handlebars')
const statMenuTemplate = require('../templates/stats-menu-template.handlebars')
const store = require('../store')
const api = require('./api')

const indexPracticesSuccess = function (data) {
  data.practices = data.practices.sort(function (a, b) {
    a = new Date(a.created_at)
    b = new Date(b.created_at)
    return a > b ? -1 : a < b ? 1 : 0
  })
  if (data.practices.length === 0) {
    $('#session-state-message').removeClass('hidden')
    $('#session-state-message').text('No Practices Logged')
  } else {
    $('#session-state-message').addClass('hidden')
  }
  $('#log-prt-menu').addClass('hidden')
  $('#prt-stats-menu').addClass('hidden')
  $('#auto-log-practices').addClass('hidden')
  $('.table').removeClass('hidden')
  const indexPracticesHtml = indexPracticesTemplate({ practices: data.practices })
  $('.content').html(indexPracticesHtml)
  $('#crud-message').text('List of Practices')
  $('#warning-message').text('')
  $('#inputGroupSelect').html('<option selected  value="Total" class="light">Total</option>')
  $('#stat-message').text('')
  $('#session-count-span').text('')
  $('#time-count-span').text('')
}

function parser (data) {
  const stats = {}
  for (let i = 0; i < data.length; i++) {
    stats[Math.floor(new Date(data[i].date).getTime() / 1000)] = data[i].duration
  }
  return stats
}

const getPracticeStatsSuccess = function (data) {
  console.log(data)
  const statData = {}
  if (store.instrumentStat === 'Total') {
    const totalTime = data.practices.reduce(function (prev, cur) {
      return prev + cur.duration
    }, 0)
    statData.jsonObj = JSON.stringify(parser(data.practices))
    statData.totalTime = totalTime / 60
    statData.totalSessions = data.practices.length
  } else {
    const singleInstrumentArray = data.practices.filter(x => x.instrument === store.instrumentStat)
    const totalTime = singleInstrumentArray.reduce(function (prev, cur) {
      return prev + cur.duration
    }, 0)
    statData.jsonObj = JSON.stringify(parser(singleInstrumentArray))
    statData.totalTime = totalTime / 60
    statData.totalSessions = singleInstrumentArray.length
  }
  statData.instrument = store.instrumentStat
  statData.lastYear = (new Date()).setMonth((new Date().getMonth() - 11))
  const statMenuHtml = statMenuTemplate({ practices: statData })
  $('#stat-content').html(statMenuHtml)
}

const createPracticeSuccess = function (data) {
  $('#crud-message').text('Created New Practice!')
  $('#warning-message').text('')
  // $('#create-prt')[0].reset('')
}

const updatePracticeSuccess = function (data) {
  $('#crud-message').text(`Updated Practice!`)
  $('form input[class="form-input"]').val('')
  api.indexPractices()
    .then(refreshListSuccess)
    .catch(refreshListFailure)
}

const deletePracticeSuccess = function (data) {
  $('#crud-message').text(`Deleted Practice!`)
  api.indexPractices()
    .then(refreshListSuccess)
    .catch(refreshListFailure)
}

const refreshListSuccess = function (data) {
  data.practices = data.practices.sort(function (a, b) {
    a = new Date(a.created_at)
    b = new Date(b.created_at)
    return a > b ? -1 : a < b ? 1 : 0
  })
  const indexPracticesHtml = indexPracticesTemplate({ practices: data.practices })
  $('.content').html(indexPracticesHtml)
}

// Failures Messages
const refreshListFailure = function (data) {
  $('#crud-message').text(`Failed to Update list`)
}

const indexPracticesFailure = function (data) {
  $('#crud-message').text('Failed to Find List')
}

const createPracticeFailure = function (data) {
  $('#crud-message').text('Error on Create')
}

const updatePracticeFailure = function (data) {
  $('#crud-message').text(`Error on Update`)
}

const deletePracticeFailure = function (data) {
  $('#crud-message').text(`Error on Delete`)
}

module.exports = {
  indexPracticesSuccess,
  createPracticeSuccess,
  updatePracticeSuccess,
  deletePracticeSuccess,
  indexPracticesFailure,
  createPracticeFailure,
  updatePracticeFailure,
  deletePracticeFailure,
  getPracticeStatsSuccess
}
