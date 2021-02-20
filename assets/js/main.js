import { MusicPlayer } from "./MusicPlayer.js";
import { musicsData, createMusicWrapper } from "./musicsData.js";

const playBtn = document.querySelector('.play-pause');
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

  /*=== v GIVE MAINTENANCE v ===*/
  if(elm.classList.contains('music-playqueue')) {
    const elmts = [
      document.querySelector('.recorder-music'),
      document.querySelector('.play-timeline'),
      document.querySelector('.music-options'),
      document.querySelector('.music-changer')
    ];
    const queue = document.querySelector('.queue');

    queue.addEventListener('click', function(event) {
      const target = event.target;
      const innerElement = target.querySelector('i');

      if(target.classList.contains('queue__music-play')) {
        const curr = innerElement.getAttribute('data-music');

        if(target.classList.contains('btn-playing')) {
          target.classList.remove('btn-playing');
          MusicPlayer.audio.pause();
          return;
        }
        
        MyPlayer.current = Number(curr);
        MyPlayer.setMusic();
        MyPlayer.handlePlayPause(playBtn);

        document.querySelectorAll('.queue__music').forEach((music, index) => {
          if(MyPlayer.current === index) {
            if(index === MyPlayer.current) {
              music.classList.add('playing');
              music.querySelector('.queue__music-play').classList.add('btn-playing');
            }
          }else {
            music.classList.remove('playing');
            music.querySelector('.queue__music-play').classList.remove('btn-playing');
            music.querySelector('.queue__music-play > i').classList = 'bx bx-play';
          }
        });
      }
    });

    if(!queue.classList.contains('queue-show')) {
      musicsData.forEach((music, index) => {
        const queueMusic = createMusicWrapper(music, index);

        if(index === MyPlayer.current) {
          queueMusic.classList.add('playing');

          if(MyPlayer.playing) {
            queueMusic.querySelector('.queue__music-play').classList.add('btn-playing');
          }
        }

        queue.appendChild(queueMusic);
      });
    }else {
      queue.innerHTML = '';
    }
    
    queue.classList.toggle('queue-show');

    for(e of elmts) {
      e.classList.toggle('display-hidden');
    }
  }
  /*=== ^ GIVE MAINTENANCE ^ ===*/

  if(classList.contains('play-pause')) MyPlayer.handlePlayPause(elm);
  if(elm.classList.contains('like-switch')) handleLike(elm);
  if(elm.classList.contains('volume-wrapper')) MyPlayer.handleVolume(elm);
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

  if(MusicPlayer.audio.ended) {
    MyPlayer.next();
  }
}

MusicPlayer.volume.addEventListener('input', function(e) {
  const volumeIcon = e.target.nextElementSibling;
  const volumeChange = e.target.value;
  MusicPlayer.audio.volume = volumeChange;

  MyPlayer.handleVolumeIcon(volumeChange, volumeIcon);
});