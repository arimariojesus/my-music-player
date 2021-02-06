const sound = document.querySelector('#sound');
const playBtn = document.querySelector('.pause');
const disc = document.querySelector('.music-album-photo img');

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