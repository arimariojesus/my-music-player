const sound = document.querySelector('#sound');
const playBtn = document.querySelector('.pause');
const disc = document.querySelector('.music-album-photo img');
const timeline = document.querySelector('.timeline-bar input[type=range]');
const currentTimeElm = document.querySelector('.time-current');
const durationTimeElm = document.querySelector('.time-duration');

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
  seconds = Math.floor(parseFloat(seconds));
  let min = Math.floor(seconds / 60);
  min = (min >= 10) ? min : '0'+min;
  let sec = (seconds % 60);
  sec = (sec >= 10) ? sec : '0'+sec;

  return `${min}:${sec}`;
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