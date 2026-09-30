// A restrained cinematic loop: four-bar harmonic arc, steady pulse and rising motif.
const CHORDS = [
  [110, 164.81, 220, 261.63, 329.63],
  [87.31, 130.81, 174.61, 220, 261.63],
  [130.81, 196, 261.63, 329.63, 392],
  [98, 146.83, 196, 246.94, 293.66],
];
const ARPEGGIO = [1, 2, 3, 4, 2, 3, 4, 3];
const STEP = .3; // 100 BPM, eighth-note pulse.

export function setupMusic(button) {
  let audio;
  let master;
  let musicBus;
  let delayInput;
  let timer;
  let suspendTimer;
  let nextStep = 0;
  let step = 0;
  let playing = false;

  function createAudioGraph() {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return false;
    audio = new Context();
    master = audio.createGain();
    master.gain.value = 0;
    master.connect(audio.destination);

    musicBus = audio.createBiquadFilter();
    musicBus.type = 'lowpass';
    musicBus.frequency.value = 3800;
    musicBus.connect(master);

    const delay = audio.createDelay(1);
    delay.delayTime.value = .45;
    const echo = audio.createGain();
    echo.gain.value = .13;
    delayInput = audio.createGain();
    delayInput.gain.value = .65;
    delayInput.connect(delay);
    delay.connect(echo);
    echo.connect(master);
    return true;
  }

  function tone(frequency, at, duration, volume, shape = 'sine', attack = .015, echo = false) {
    const oscillator = audio.createOscillator();
    const envelope = audio.createGain();
    oscillator.type = shape;
    oscillator.frequency.setValueAtTime(frequency, at);
    envelope.gain.setValueAtTime(.0001, at);
    envelope.gain.exponentialRampToValueAtTime(volume, at + attack);
    envelope.gain.exponentialRampToValueAtTime(.0001, at + duration);
    oscillator.connect(envelope);
    envelope.connect(musicBus);
    if (echo) envelope.connect(delayInput);
    oscillator.start(at);
    oscillator.stop(at + duration + .02);
  }

  function pulse(at, strong) {
    const oscillator = audio.createOscillator();
    const envelope = audio.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(strong ? 100 : 72, at);
    oscillator.frequency.exponentialRampToValueAtTime(44, at + .16);
    envelope.gain.setValueAtTime(.0001, at);
    envelope.gain.exponentialRampToValueAtTime(strong ? .18 : .1, at + .008);
    envelope.gain.exponentialRampToValueAtTime(.0001, at + .24);
    oscillator.connect(envelope);
    envelope.connect(master);
    oscillator.start(at);
    oscillator.stop(at + .25);
  }

  function scheduleNotes() {
    while (nextStep < audio.currentTime + .3) {
      const chord = CHORDS[Math.floor(step / 16) % CHORDS.length];
      const position = step % 16;
      if (position === 0) {
        chord.slice(1, 4).forEach((frequency, index) =>
          tone(frequency, nextStep, 4.7, .025 - index * .003, 'triangle', .55));
      }
      if (step % 2 === 0) {
        pulse(nextStep, position === 0 || position === 8);
        tone(chord[0], nextStep, .42, .045, 'triangle', .012);
      }
      tone(chord[ARPEGGIO[step % 8]] * 2, nextStep, .38, .038,
        'triangle', .012, true);
      if (position === 6 || position === 14) {
        tone(chord[4] * 2, nextStep, .9, .055, 'sine', .025, true);
      }
      step++;
      nextStep += STEP;
    }
  }

  function updateButton() {
    button.setAttribute('aria-pressed', String(playing));
    const labels = {
      en: ['Turn music on', 'Turn music off'],
      uk: ['Увімкнути музику', 'Вимкнути музику'],
      pl: ['Włącz muzykę', 'Wyłącz muzykę']
    };
    button.setAttribute('aria-label', labels[document.documentElement.lang]?.[playing ? 1 : 0] || labels.en[0]);
  }

  async function startMusic() {
    if (!audio && !createAudioGraph()) {
      button.disabled = true;
      button.setAttribute('aria-label', 'Музика недоступна');
      return;
    }
    clearTimeout(suspendTimer);
    await audio.resume();
    playing = true;
    nextStep = audio.currentTime + .08;
    master.gain.cancelScheduledValues(audio.currentTime);
    master.gain.setTargetAtTime(.24, audio.currentTime, .35);
    scheduleNotes();
    timer = setInterval(scheduleNotes, 100);
    updateButton();
  }

  async function stopMusic() {
    playing = false;
    clearInterval(timer);
    master.gain.cancelScheduledValues(audio.currentTime);
    master.gain.setTargetAtTime(0, audio.currentTime, .18);
    updateButton();
    suspendTimer = setTimeout(async () => {
      if (!playing) await audio.suspend();
    }, 6000);
  }

  button.addEventListener('click', async () => {
    button.disabled = true;
    try {
      if (playing) await stopMusic();
      else await startMusic();
    } finally {
      if (audio) button.disabled = false;
    }
  });
  document.addEventListener('languagechange', updateButton);
}
