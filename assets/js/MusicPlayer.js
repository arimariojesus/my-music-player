export default class MusicPlayer {
  constructor(musicList = [{}]) {
    this.musics = musicList;
    this.current = 0;
    this.playing = false;
    this.playPromise = undefined;
  }

  handlePlayPause() {
    const icon = MusicPlayer.playButton.children[0];

    if(MusicPlayer.arm.classList.contains('initialPosition'))
      MusicPlayer.arm.classList.remove('initialPosition');

    if(!this.playing) {
      this.handlePlay();

      icon.classList = 'bx bx-pause';
      icon.parentElement.classList.add('btn-active');
    }else {
      this.playing = false;
      MusicPlayer.audio.pause();
      
      icon.classList = 'bx bx-play';
      icon.parentElement.classList.remove('btn-active');
    }
  }

  handlePlay() {
    if(this.playPromise) this.playPromise = undefined;

    this.playPromise = MusicPlayer.audio.play();

    if(this.playPromise !== undefined) {
      this.playPromise.then(_ => {
        this.playing = true;
      });
    }
  }

  handleVolume(elm) {
    const icon = elm.querySelector('i');
    const lastVolume = MusicPlayer.audio.lastVolume;
    
    if(!icon.classList.contains('bxs-volume-mute')) {
      MusicPlayer.audio.lastVolume = MusicPlayer.audio.volume;
      MusicPlayer.audio.volume = 0;
      icon.classList = 'bx bxs-volume-mute';
    }else {
      
      MusicPlayer.audio.volume = lastVolume;
      this.handleVolumeIcon(lastVolume, icon);
    }
  }

  handleVolumeIcon(volume, elm) {
    if(volume > 0.6) {
      elm.classList = 'bx bxs-volume-full';
    }else if(volume <= 0.6 && volume > 0.3) {
      elm.classList = 'bx bxs-volume-low';
    }else if(volume <= 0.3 && volume > 0) {
      elm.classList = 'bx bxs-volume';
    }else {
      elm.classList = 'bx bxs-volume-mute';
    }
  }

  rotateDisc(deg) {
    const discElement = MusicPlayer.disc;
    discElement.style.transform = `rotate(${deg}deg)`;
  }

  armDisplacement(time) {
    const armElement = MusicPlayer.arm;
    const distanceOfDisplacement = 26;
    const displacement = distanceOfDisplacement / MusicPlayer.audio.duration;
    const startPositionOnTheDisc = -10;
    const rotationUnit = startPositionOnTheDisc + (displacement * parseFloat(time));
    
    armElement.style.transform = `rotate(${rotationUnit}deg)`;
  }

  setMusic() {
    const srcMusic = MusicPlayer.srcMusic + this.musics[this.current].musicFile;
    const srcAlbum = MusicPlayer.srcAlbum + this.musics[this.current].albumFile;
    const musicNameElm = document.querySelector('.music-name');
    const musicPerformerElm = document.querySelector('.music-performer');
    
    MusicPlayer.audio.setAttribute('src', srcMusic);
    MusicPlayer.disc.setAttribute('src', srcAlbum);
    musicNameElm.innerHTML = this.musics[this.current].name;
    musicPerformerElm.innerHTML = this.musics[this.current].performer;
  }

  next() {
    const listLength = this.musics.length - 1;
    this.current = this.current >= listLength ? 0 : this.current + 1;
    
    this.setMusic();
    if(this.playing) this.handlePlay();
  }

  prev() {
    const listLength = this.musics.length - 1;
    this.current = this.current <= 0 ? listLength : this.current - 1;
    
    this.setMusic();
    if(this.playing) this.handlePlay();
  }

  static audio = document.getElementById('sound');

  static disc = document.querySelector('.music-album-photo > img');

  static arm = document.querySelector('.arm-wrapper');

  static volume = document.getElementById('volume');

  static timeline = document.querySelector('.timeline-bar > input');

  static srcMusic = "./assets/sounds/";

  static srcAlbum = "./assets/images/";

  static playButton = document.querySelector('.play-pause');
  static nextButton = document.querySelector('.next.btn');
  static prevButton = document.querySelector('.prev.btn');
}

MusicPlayer.audio.lastVolume = 0;