export class MusicPlayer {
  constructor(musicList = [{}]) {
    this.musics = musicList;
    this.current = 0;
  }

  handlePlayPause(btn) {
    if(MusicPlayer.arm.classList.contains('initialPosition'))
      MusicPlayer.arm.classList.remove('initialPosition');

    if(btn.classList.contains('bx-play')) {
      MusicPlayer.audio.play();
      btn.classList = 'bx bx-pause';
      btn.parentElement.classList.add('btn-active');
    }else {
      MusicPlayer.audio.pause();
      btn.classList = 'bx bx-play';
      btn.parentElement.classList.remove('btn-active');
    }
  }

  handleVolume(elm) {
    const lastVolume = MusicPlayer.audio.lastVolume;
    if(!elm.classList.contains('bxs-volume-mute')) {
      MusicPlayer.audio.lastVolume = MusicPlayer.audio.volume;
      MusicPlayer.audio.volume = 0;
      elm.classList = 'bx bxs-volume-mute';
    }else {
      
      MusicPlayer.audio.volume = lastVolume;
      this.handleVolumeIcon(lastVolume, elm);
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

  next(audioState) {
    const listLength = this.musics.length - 1;
    this.current = this.current >= listLength ? 0 : this.current + 1;
    const srcMusic = MusicPlayer.srcMusic + this.musics[this.current].musicFile;
    const srcAlbum = MusicPlayer.srcAlbum + this.musics[this.current].albumFile;
    
    MusicPlayer.audio.setAttribute('src', srcMusic);
    MusicPlayer.disc.setAttribute('src', srcAlbum);
    if(audioState) MusicPlayer.audio.play();
  }

  prev(audioState) {
    const listLength = this.musics.length - 1;
    this.current = this.current <= 0 ? listLength : this.current - 1;
    const srcMusic = MusicPlayer.srcMusic + this.musics[this.current].musicFile;
    const srcAlbum = MusicPlayer.srcAlbum + this.musics[this.current].albumFile;
    
    MusicPlayer.audio.setAttribute('src', srcMusic);
    MusicPlayer.disc.setAttribute('src', srcAlbum);
    if(audioState) MusicPlayer.audio.play();
  }

  static audio = document.getElementById('sound');

  static disc = document.querySelector('.music-album-photo > img');

  static arm = document.querySelector('.arm-wrapper');

  static volume = document.getElementById('volume');

  static timeline = document.querySelector('.timeline-bar > input');

  static srcMusic = "./assets/sounds/";

  static srcAlbum = "./assets/images/";
}

MusicPlayer.audio.lastVolume = 0;