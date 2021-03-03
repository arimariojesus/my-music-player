import MusicPlayer from "./MusicPlayer.js";
import handleMusicQueue from "./utils/musicQueue.js";
import { musicsData } from "./utils/musicsData.js";

const timeline = document.querySelector('.timeline-bar input[type=range]'),
      currentTimeElm = document.querySelector('.time-current'),
      durationTimeElm = document.querySelector('.time-duration'),
      queueWrapper = document.querySelector('.queue');

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

  if(classList.contains('repeat')) {
    const repeatValue = !elm.firstElementChild.checked;
    MyPlayer.repeat = repeatValue;
  }
  if(classList.contains('shuffle')) {
    const shuffleValue = !elm.firstElementChild.checked;
    MyPlayer.shuffle = shuffleValue;
  }
  if(classList.contains('music-playqueue')) handleMusicQueue(MyPlayer);
  if(classList.contains('play-pause')) MyPlayer.handlePlayPause(elm);
  if(classList.contains('like-switch')) handleLike(elm);
  if(classList.contains('volume-wrapper')) MyPlayer.handleVolume(elm);
  if(classList.contains('next')) MyPlayer.next();
  if(classList.contains('prev')) MyPlayer.prev();
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

timeline.addEventListener('input', function(e) {
  MusicPlayer.audio.currentTime = e.target.value;
});

MusicPlayer.audio.ontimeupdate = () => {
  const currentTime = parseFloat(MusicPlayer.audio.currentTime);

  timeline.value = currentTime;
  timeManipulation(currentTime);
  MyPlayer.armDisplacement(currentTime);
  MyPlayer.rotateDisc(currentTime * 10);

  if(MusicPlayer.audio.ended) {
    MyPlayer.next();
    handleMusicQueue(MyPlayer, true);
  }
}

MusicPlayer.volume.addEventListener('input', function(e) {
  const volumeIcon = e.target.nextElementSibling;
  const volumeChange = e.target.value;
  MusicPlayer.audio.volume = volumeChange;

  MyPlayer.handleVolumeIcon(volumeChange, volumeIcon);
});

let pos = {};

const mouseDownHandlerInQueue = (e) => {
  queueWrapper.style.userSelect = 'none';

  pos = {
    top: queueWrapper.scrollTop,
    y: e.clientY
  }

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = (e) => {
  const dy = e.clientY - pos.y;

  queueWrapper.scrollTop = pos.top - dy;
};

const mouseUpHandler = (e) => {
  queueWrapper.style.removeProperty('user-select');

  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);
}

queueWrapper.addEventListener('mousedown', mouseDownHandlerInQueue);