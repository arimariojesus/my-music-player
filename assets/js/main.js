const sound = document.querySelector('#sound');
const playBtn = document.querySelector('.pause');
const disc = document.querySelector('.music-album-photo img');
const timeline = document.querySelector('.timeline-bar input[type=range]');

window.onload = function() {
  timeline.min = 0;
  timeline.max = sound.duration;
  timeline.value = 0;
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

timeline.addEventListener('input', function(e) {
  sound.currentTime = e.target.value;
});

sound.ontimeupdate = () => {
  timeline.value = sound.currentTime;

  if(parseInt(timeline.value) >= parseInt(timeline.max)) {
    disc.classList.remove('disc-animation');
    playBtn.children[0].classList.replace('bx-pause', 'bx-play');
  }
}