export class MusicPlayer {
  constructor(musicList = [{}]) {
    this.musics = musicList;
    this.current = 0;
  }

  handlePlayPause(btn) {
    if(MusicPlayer.arm.contains('initialPosition'))
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
      lastVolume = MusicPlayer.audio.volume;
      MusicPlayer.audio.volume = 0;
      elm.classList = 'bx bxs-volume-mute';
    }else {
      
      MusicPlayer.audio.volume = lastVolume;
      this.handleVolumeIcon(lastVolume, elm);
    }
  }

  handleVolumeIcon(elm) {
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
    const displacement = MusicPlayer.arm.displacementUnitOfArm;
    const startPositionOnTheDisc = -10;
    const rotationUnit = startPositionOnTheDisc + (displacement * parseFloat(time));

    armElement.style.transform = `rotate(${rotationUnit}deg)`;
  }

  next() {
    const listLength = this.musics.length - 1;
    this.current = this.current >= listLength ? 0 : this.current + 1;
    const src = MusicPlayer.src + this.musics[this.current].src;

    MusicPlayer.audio.setAttribute('src', src);
  }

  prev() {
    const listLength = this.musics.length - 1;
    this.current = this.current <= 0 ? listLength : this.current - 1;
    const src = MusicPlayer.src + this.musics[this.current].src;

    MusicPlayer.audio.setAttribute('src', src);
  }

  static get audio() {
    return document.getElementById('sound');
  }

  static get disc() {
    return document.querySelector('.music-album-photo > img');
  }

  static get arm() {
    return document.querySelector('.arm-wrapper');
  }

  static get volume() {
    return document.getElementById('volume');
  }

  static get timeline() {
    return document.querySelector('.timeline-bar > input');
  }

  static get src() {
    return "../sounds/";
  }
}

const distanceOfDisplacement = 26;

MusicPlayer.audio.lastVolume = 0;
MusicPlayer.arm.displacementUnitOfArm = distanceOfDisplacement / parseFloat(MusicPlayer.audio.duration);