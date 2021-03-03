import { musicsData, createMusicWrapper } from "./musicsData.js";

const playqueueButtonIcon = document.querySelector('.music-playqueue   i');
const queueField = document.querySelector('.queue');
const elmtsToHidden = [
  document.querySelector('.recorder-music'),
  document.querySelector('.play-timeline'),
  document.querySelector('.music-options'),
  document.querySelector('.music-changer')
];

let Player = null;

export default function musicQueue(MyPlayer, display = false) {
  Player = MyPlayer;
  queueField.removeEventListener('click', handleClick, false);

  if(display) {
    checkCurrent(MyPlayer.current, MyPlayer.playing);
    return;
  }

  if(!queueField.classList.contains('queue-show')) {
    playqueueButtonIcon.classList.replace('bxs-playlist', 'bxs-chevron-down');

    for(let currentElm of elmtsToHidden) {
      currentElm.classList.add('display-hidden');
    }

    queueField.classList.add('queue-show');

    if(!queueField.innerHTML) {
      musicsData.forEach((music, index) => {
        const queueMusic = createMusicWrapper(music, index);  
        queueField.appendChild(queueMusic);
      });
    }

    checkCurrent(MyPlayer.current, MyPlayer.playing);

    queueField.addEventListener('click', handleClick, false);
    
  }else {
    playqueueButtonIcon.classList.replace('bxs-chevron-down', 'bxs-playlist');
    hideQueue(queueField);
  }
}

function handleClick(event) {
  const target = event.target;

  if(target.classList.contains('queue__music-play')) {
    if(target.classList.contains('btn-playing')) {
      target.classList.remove('btn-playing');
      Player.handlePlayPause();
    }else {
      if(target.parentElement.classList.contains('current')) {
        Player.handlePlayPause();
        target.classList.add('btn-playing');
        return;
      }

      if(Player.playing) Player.playing = false;

      const curr = target.querySelector('i').getAttribute('data-music');
      
      Player.current = Number(curr);
      Player.setMusic();
      Player.handlePlayPause();

      checkCurrent(Player.current, true);
    }
  }
}

function hideQueue(queueElm) {
  for(let currentElm of elmtsToHidden) {
    currentElm.classList.remove('display-hidden');
  }

  queueElm.classList.remove('queue-show');
}

function checkCurrent(currMusic, playing) {
  const musicListElmts = document.querySelectorAll('.queue__music');

  musicListElmts.forEach((currField, index) => {
    if(index === currMusic) {
      currField.classList.add('current');

      if(playing) {
        currField.querySelector('.queue__music-play').classList.add('btn-playing');
      }else {
        currField.querySelector('.queue__music-play').classList.remove('btn-playing');
      }
    }else {
      currField.classList.remove('current');
      currField.querySelector('.queue__music-play').classList.remove('btn-playing');
    }
  });
}
