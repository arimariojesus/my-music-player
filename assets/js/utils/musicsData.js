const musicsData = [
  {
    musicFile: "David_Davis-Ocean.mp3",
    albumFile: "ocean.jpg",
    name: "Ocean",
    performer: "David Davis",
  },
  {
    musicFile: "LAWRENCE_BEAMEN_-_Looking_For_Me.mp3",
    albumFile: "looking-for-me.jpg",
    name: "Looking For Me",
    performer: "Lawrence Beamen",
  },
  {
    musicFile: "Alfonso_Lugo_-_Chocolate.mp3",
    albumFile: "chocolate.jpg",
    name: "Chocolate",
    performer: "Alfonso Lugo",
  },
  {
    musicFile: "Pokki_DJ_-_Hold_Me.mp3",
    albumFile: "hold-me.jpg",
    name: "Hold Me",
    performer: "Pokki DJ",
  },
  {
    musicFile: "Matt_DeHarp_-_Sunshine_Blues.mp3",
    albumFile: "sunshine-blues.jpg",
    name: "Sunshine Blues",
    performer: "Matt DeHarp",
  },
  {
    musicFile: "Smoking_With_Poets_-_Pain_t__On_Me.mp3",
    albumFile: "paint-on-me.jpg",
    name: "Pain(t) On Me",
    performer: "Smoking With Poets",
  },
  {
    musicFile: "Square_a_Saw_-_Lover.mp3",
    albumFile: "lover.jpg",
    name: "Lover",
    performer: "Square a Saw",
  },
  {
    musicFile: "The_Tangerine_Club_-_Flowers_Of_September.mp3",
    albumFile: "flowers-of-september.jpg",
    name: "Flowers of September",
    performer: "The Tangerine Club",
  },
];

function createMusicWrapper(music, curr) {
  const queueMusic = document.createElement('div');
  const innerContent = `
    <div class="queue__music-album">
      <img src="./assets/images/${music.albumFile}" alt="">
    </div>
    <div class="queue__music-details">
      <h2 class="music-details__name">${music.name}</h2>
      <p class="music-details__performer">${music.performer}</p>
    </div>
    <div class="queue__music-like">
      <i class='bx bxs-heart' id="like-icon"></i>
    </div>
    <div class="queue__music-play">
      <i class='bx bx-play' data-music="${curr}"></i>
    </div>
  `;

  queueMusic.setAttribute('class', 'queue__music');
  queueMusic.innerHTML = innerContent;

  return queueMusic
}

export { musicsData, createMusicWrapper };