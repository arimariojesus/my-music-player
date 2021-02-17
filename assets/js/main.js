import { MusicPlayer } from "./MusicPlayer.js";
import musicsData from "./musicsData.js";

const playBtn = document.querySelector('.pause');
const timeline = document.querySelector('.timeline-bar input[type=range]');
const currentTimeElm = document.querySelector('.time-current');
const durationTimeElm = document.querySelector('.time-duration');
const arm = document.querySelector('.arm-wrapper');

const MyPlayer = new MusicPlayer(musicsData);

function setAttributesOfAudio() {
  const duration = MusicPlayer.audio.duration;
  timeline.min = 0;
  timeline.max = duration;
  timeline.defaultValue = 0;
  timeManipulation();
  durationTimeElm.innerHTML = convertSecondsToMinutes(duration);
}
MusicPlayer.audio.ondurationchange = setAttributesOfAudio;
document.addEventListener('DOMContentLoaded', setAttributesOfAudio);

function handleLike(elm) {
  if(!elm.classList.contains('like-active'))
    elm.classList.add('like-active');
  else
    elm.classList.remove('like-active');
}

document.addEventListener('click', function(e) {
  const elm = e.target;
  const classList = elm.classList;
  const stateBtnPlay = playBtn.classList.contains('btn-active');

  if(classList.contains('bx-pause') || classList.contains('bx-play')) MyPlayer.handlePlayPause(elm);
  if(elm.id === 'like-icon') handleLike(elm);
  if(elm.id === 'volume-icon') MyPlayer.handleVolume(elm);
  if(classList.contains('bx-skip-next')) MyPlayer.next(stateBtnPlay);
  if(classList.contains('bx-skip-previous')) MyPlayer.prev(stateBtnPlay);
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

function finished() {
  playBtn.classList.remove('btn-active');
  playBtn.children[0].classList.replace('bx-pause', 'bx-play');
  MusicPlayer.audio.currentTime = 0;
  MusicPlayer.audio.pause();
  arm.classList.add('initialPosition');
}

timeline.addEventListener('input', function(e) {
  MusicPlayer.audio.currentTime = e.target.value;
});

MusicPlayer.audio.ontimeupdate = () => {
  const currentTime = parseFloat(MusicPlayer.audio.currentTime);

  timeline.value = currentTime;
  timeManipulation(currentTime);
  MyPlayer.armDisplacement(currentTime);
  MyPlayer.rotateDisc(currentTime * 10);

  if(parseInt(timeline.value) >= parseInt(timeline.max)) {
    MyPlayer.next(playBtn.classList.contains('btn-active'));
  }
}

MusicPlayer.volume.addEventListener('input', function(e) {
  const volumeIcon = e.target.nextElementSibling;
  const volumeChange = e.target.value;
  MusicPlayer.audio.volume = volumeChange;

  MyPlayer.handleVolumeIcon(volumeChange, volumeIcon);
});