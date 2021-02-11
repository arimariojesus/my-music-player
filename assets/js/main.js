const sound = document.querySelector('#sound');
const playBtn = document.querySelector('.pause');
const disc = document.querySelector('.music-album-photo img');
const timeline = document.querySelector('.timeline-bar input[type=range]');
const currentTimeElm = document.querySelector('.time-current');
const durationTimeElm = document.querySelector('.time-duration');
const volume = document.querySelector('#volume');
const arm = document.querySelector('.arm-wrapper');

function setAttributesOfAudio() {
  timeline.setAttribute('min', '0');
  timeline.setAttribute('max', sound.duration);
  timeline.defaultValue = 0;
  durationTimeElm.innerHTML = convertSecondsToMinutes(sound.duration);
}
sound.ondurationchange = setAttributesOfAudio;
document.addEventListener('DOMContentLoaded', setAttributesOfAudio);

function handlePlayPause(elm) {
  if(arm.classList.contains('initialPosition')) arm.classList.remove('initialPosition');
  
  if(elm.classList.contains('bx-play')) {
    sound.play();
    elm.classList = 'bx bx-pause';
    elm.parentElement.classList.add('btn-active');
  }else {
    sound.pause();
    elm.classList = 'bx bx-play';
    elm.parentElement.classList.remove('btn-active');
  }
}

function handleLike(elm) {
  if(!elm.classList.contains('like-active'))
    elm.classList.add('like-active');
  else
    elm.classList.remove('like-active');
}

let lastVolume;
function handleVolume(elm) {
  if(!elm.classList.contains('bxs-volume-mute')) {
    lastVolume = sound.volume;
    sound.volume = 0;
    elm.classList = 'bx bxs-volume-mute';
  }else {
    sound.volume = lastVolume;
    handleIconVolume(lastVolume, elm);
  }
}

document.addEventListener('click', function(e) {
  const elm = e.target;
  const classList = elm.classList;

  if(classList.contains('bx-pause') || classList.contains('bx-play')) handlePlayPause(elm);
  if(elm.id === 'like-icon') handleLike(elm);
  if(elm.id === 'volume-icon') handleVolume(elm);
});

function convertSecondsToMinutes(seconds = 0) {
  const time = new Date(seconds * 1000);
  return time.toLocaleTimeString('pt-BR', {
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC'
  });
}

function timeManipulation(currentTime) {
  currentTimeElm.innerHTML = convertSecondsToMinutes(currentTime);
}

function rotateDisc(deg) {
  disc.style.transform = `rotate(${deg}deg)`;
}

timeline.addEventListener('input', function(e) {
  sound.currentTime = e.target.value;
});

let displacimentUnitOfArm = 0;
function armDisplaciment(time) {
  let rotationUnit = -10 + (displacimentUnitOfArm * parseFloat(time));
  
  arm.style.transform = `rotate(${rotationUnit}deg)`;
}

sound.ontimeupdate = () => {
  const currentTime = parseFloat(sound.currentTime);

  armDisplaciment(currentTime);
  timeManipulation(sound.currentTime);
  rotateDisc(currentTime * 10);
  timeline.value = currentTime;

  displacimentUnitOfArm = 26 / parseFloat(sound.duration);

  if(parseInt(timeline.value) >= parseInt(timeline.max)) {
    disc.classList.remove('disc-animation');
    playBtn.classList.remove('btn-active');
    playBtn.children[0].classList.replace('bx-pause', 'bx-play');
    sound.currentTime = 0;
    sound.pause();
    arm.classList.add('initialPosition');
  }
}

function handleVolumeIcon(volume, iconElm) {
  if(volume > 0.6) {
    iconElm.classList = 'bx bxs-volume-full';
  }else if(volume <= 0.6 && volume > 0.3) {
    iconElm.classList = 'bx bxs-volume-low';
  }else if(volume <= 0.3 && volume > 0) {
    iconElm.classList = 'bx bxs-volume';
  }else {
    iconElm.classList = 'bx bxs-volume-mute';
  }
}

volume.addEventListener('input', function(e) {
  const volumeIcon = e.target.nextElementSibling;
  const volumeChange = e.target.value;
  sound.volume = volumeChange;

  handleVolumeIcon(volumeChange, volumeIcon);
});