const sound = document.querySelector('#sound');
const playBtn = document.querySelector('.pause');
const disc = document.querySelector('.music-album-photo img');
const timeline = document.querySelector('.timeline-bar input[type=range]');
const currentTimeElm = document.querySelector('.time-current');
const durationTimeElm = document.querySelector('.time-duration');
const volume = document.querySelector('#volume');

window.onload = function() {
  timeline.min = 0;
  timeline.max = sound.duration;
  timeline.defaultValue = 0;
  timeManipulation();
  durationTimeElm.innerHTML = convertSecondsToMinutes(sound.duration);
}

playBtn.addEventListener('click', function(e) {
  if(e.target.classList.contains('bx-play')) {
    sound.play();
    disc.classList.add('disc-animation');
    e.target.classList.replace('bx-play', 'bx-pause');
  }else {
    sound.pause();
    disc.classList.remove('disc-animation');
    e.target.classList.replace('bx-pause', 'bx-play');
  }
});

function convertSecondsToMinutes(seconds = 0) {
  const time = new Date(seconds * 1000);
  return time.toLocaleTimeString('pt-BR', {
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC'
  });
}

function timeManipulation() {
  currentTimeElm.innerHTML = convertSecondsToMinutes(sound.currentTime);
}

timeline.addEventListener('input', function(e) {
  sound.currentTime = e.target.value;
});

sound.ontimeupdate = () => {
  timeManipulation();
  timeline.value = sound.currentTime;

  if(parseInt(timeline.value) >= parseInt(timeline.max)) {
    disc.classList.remove('disc-animation');
    playBtn.children[0].classList.replace('bx-pause', 'bx-play');
    sound.currentTime = 0;
    sound.pause();
  }
}

volume.addEventListener('input', function(e) {
  const volumeIcon = e.target.nextElementSibling;
  const volumeChange = e.target.value;
  sound.volume = volumeChange;

  if(parseFloat(volumeChange) > 0.6) {
    volumeIcon.classList = 'bx bxs-volume-full';
  }else if(parseFloat(volumeChange) <= 0.6 && parseFloat(volumeChange) > 0.3) {
    volumeIcon.classList = 'bx bxs-volume-low';
  }else if(parseFloat(volumeChange) <= 0.3 && parseFloat(volumeChange) > 0) {
    volumeIcon.classList = 'bx bxs-volume';
  }else {
    volumeIcon.classList = 'bx bxs-volume-mute';
  }
});