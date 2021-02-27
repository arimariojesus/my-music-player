import { musicsData, createMusicWrapper } from "./musicsData.js";
import MusicPlayer from '../MusicPlayer.js';

export default function musicQueue(MyPlayer) {
  const elmtsToHidden = [
    document.querySelector('.recorder-music'),
    document.querySelector('.play-timeline'),
    document.querySelector('.music-options'),
    document.querySelector('.music-changer')
  ];
  const queueField = document.querySelector('.queue');

  if(!queueField.classList.contains('queue-show')) {
    queueField.classList.add('queue-show');

    if(!queueField.innerHTML) {
      musicsData.forEach((music, index) => {
        const queueMusic = createMusicWrapper(music, index);  
        queueField.appendChild(queueMusic);
      });
    }

    checkCurrent(MyPlayer.current, MyPlayer.playing);

    queueField.addEventListener('click', function(event) {
      const target = event.target;
  
      if(target.classList.contains('queue__music-play')) {
        if(target.classList.contains('btn-playing')) {
          target.classList.remove('btn-playing');
          MusicPlayer.audio.pause();
          return;
        }
  
        const curr = target.querySelector('i').getAttribute('data-music');
        
        MyPlayer.current = Number(curr);
        MyPlayer.setMusic();
        MyPlayer.handlePlayPause();
  
        checkCurrent(MyPlayer.current, true);
      }
    });
  }else {
    queueField.classList.remove('queue-show');
  }

  for(let currentElm of elmtsToHidden) {
    currentElm.classList.toggle('display-hidden');
  }
}

function checkCurrent(currMusic, playing) {
  const musicListElmts = document.querySelectorAll('.queue__music');

  musicListElmts.forEach((currField, index) => {
    if(index === currMusic) {
      currField.classList.add('playing');

      if(playing) {
        currField.querySelector('.queue__music-play').classList.add('btn-playing');
      }else {
        currField.querySelector('.queue__music-play').classList.remove('btn-playing');
      }
    }else {
      currField.classList.remove('playing');
      currField.querySelector('.queue__music-play').classList.remove('btn-playing');
    }
  });
}