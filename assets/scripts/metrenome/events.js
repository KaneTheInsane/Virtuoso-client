window.AudioContext = window.AudioContext || window.webkitAudioContext

const audioContext = new AudioContext()
let nextNotetime = audioContext.currentTime
let timerID
let count = 0

function toggleMetrenome (check) {
  if ($('#metronome-switch')[0].checked) {
    count = 0
    scheduler()
  } else {
    count = 0
    stopAudio()
  }
}

function playSound (time) {
  const osc = audioContext.createOscillator()
  osc.connect(audioContext.destination)
  if (count < 3) {
    osc.frequency.value = 260
    count += 1
  } else {
    osc.frequency.value = 520
    count = 0
  }
  osc.start(time)
  osc.stop(time + 0.1)
}

function scheduler () {
  while (nextNotetime < audioContext.currentTime + 0.1) {
    nextNotetime += 60 / ($('#metronome-bpm').val())
    playSound(nextNotetime)
  }
  timerID = window.setTimeout(scheduler, 50.0)
}

function stopAudio () {
  clearTimeout(timerID)
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }
}

module.exports = {
  scheduler,
  stopAudio,
  playSound,
  toggleMetrenome
}
