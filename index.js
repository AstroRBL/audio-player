document.addEventListener("DOMContentLoaded", function () {
  const addMusic = document.querySelector(".add-music");
  const closeAddMusic = document.getElementById("closeAdd");
  const openAddMusic = document.getElementById("openAdd");
  const musicInfo = document.querySelector(".music-info");
  const closeSongInfo = document.getElementById("closeMusicInfo");
  const mInput = document.getElementById("musicInput");
  const aInput = document.getElementById("artistTitle");
  const addM = document.getElementById("addSong");
  const fileUpload = document.getElementById("file-upload");
  const musicPlayer = document.getElementById("musicPlayer");
  const audioPlayer = document.getElementById("audio-player");
  const playButton = document.getElementById("playButton");
  const toggleBigPlayerBtn = document.getElementById("bigplayerClose");
  const bigPlayer = document.querySelector(".bigplayer");
  const musicImage = document.getElementById("musicPlaceHolder");
  const mediaButtons = document.querySelectorAll(".mediaPlayers");
  const playButtonMain = document.getElementById("playButton");
  const playButtonBig = document.querySelector(".mediaPlayers #playButton");
  const bigPlayerMusicName = document.getElementById("music2");
  const bigPlayerArtistName = document.getElementById("artist2");
  const musicSlider = document.getElementById("musicSlider");
  const musicPlayersContainer = document.querySelector(
    ".music-players-container"
  );
  const musicData = [];
  function createMusicPlayer(musicTitle, artistName) {
    const musicPlayerDiv = document.createElement("div");
    musicPlayerDiv.classList.add("music");
    musicPlayerDiv.innerHTML = `
      <div class="music-img">
        <img src="images/play-button-arrowhead.png" class="play-button">
      </div>
      <div class="music-title">
        <h1 class="music-title-text">${musicTitle}</h1>
        <h4 class="artist-name">${artistName}</h4>
      </div>
    `;
    musicPlayersContainer.appendChild(musicPlayerDiv);
    const playButton = musicPlayerDiv.querySelector(".play-button");
    const musicTitleText = musicPlayerDiv.querySelector(".music-title-text");
    const artistNameText = musicPlayerDiv.querySelector(".artist-name");
    playButton.addEventListener("click", function () {
      if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.src = "images/pause.png";
        playButtonBig.src = "images/pause.png";
      } else {
        audioPlayer.pause();
        playButton.src = "images/play-button-arrowhead.png";
        playButtonBig.src = "images/play-button-arrowhead.png";
      }
      bigPlayerMusicName.textContent = musicTitleText.textContent;
      bigPlayerArtistName.textContent = artistNameText.textContent;
    });
    musicData.push({ musicTitle, artistName });
  }
  openAddMusic.addEventListener("click", function () {
    addMusic.style.display = "flex";
  });
  closeAddMusic.addEventListener("click", function () {
    addMusic.style.display = "none";
  });
  closeSongInfo.addEventListener("click", function () {
    musicInfo.style.display = "none";
  });
  fileUpload.addEventListener("change", function () {
    if (this.files.length > 0) {
      musicInfo.style.display = "block";
    }
  });
  addM.addEventListener("click", function () {
    const musicTitle = mInput.value;
    const artistName = aInput.value;
    createMusicPlayer(musicTitle, artistName);
    mInput.value = "";
    aInput.value = "";
    musicPlayer.style.display = "none";
    musicInfo.style.display = "none";
    addMusic.style.display = "none";
    playButtonMain.src = "images/pause.png";
    playButtonBig.src = "images/pause.png";
    bigPlayerMusicName.textContent = musicTitle;
    bigPlayerArtistName.textContent = artistName;
  });
  fileUpload.addEventListener("change", function () {
    if (this.files.length > 0) {
      const audioFile = URL.createObjectURL(this.files[0]);
      audioPlayer.querySelector("source").setAttribute("src", audioFile);
      audioPlayer.load();
      audioPlayer.pause();
      audioPlayer.style.display = "none";
      musicPlayer.style.display = "none";
      addMusic.style.display = "none";
      musicInfo.style.display = "block";
    }
  });
  function toggleAudioPlayer() {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playButton.src = "images/pause.png";
      playButtonBig.src = "images/pause.png";
    } else {
      audioPlayer.pause();
      playButton.src = "images/play-button-arrowhead.png";
      playButtonBig.src = "images/play-button-arrowhead.png";
    }
  }
  playButton.addEventListener("click", function () {
    toggleAudioPlayer();
  });
  playButtonBig.addEventListener("click", function () {
    toggleAudioPlayer();
  });
  toggleBigPlayerBtn.addEventListener("click", function () {
    if (bigPlayer.style.height === "100%") {
      bigPlayer.style.height = "10%";
      musicImage.style.display = "none";
      toggleBigPlayerBtn.style.rotate = "-180deg";
      mediaButtons.forEach((image) => {
        image.style.left = "-30%";
        image.style.bottom = "-20px";
      });
      bigPlayerMusicName.style.top = "20%";
      bigPlayerMusicName.style.left = "21.3%";
      bigPlayerArtistName.style.top = "55%";
    } else {
      bigPlayer.style.height = "100%";
      musicImage.style.display = "block";
      mediaButtons.forEach((image) => {
        image.style.left = "0";
      });
      bigPlayerMusicName.style.top = originalBigPlayerMusicNameTop;
      bigPlayerMusicName.style.left = originalBigPlayerMusicNameLeft;
      bigPlayerArtistName.style.top = originalBigPlayerArtistNameTop;
    }
  });
  let originalBigPlayerMusicNameTop;
  let originalBigPlayerMusicNameLeft;
  let originalBigPlayerArtistNameTop;
  window.addEventListener("load", function () {
    originalBigPlayerMusicNameTop = bigPlayerMusicName.style.top;
    originalBigPlayerMusicNameLeft = bigPlayerMusicName.style.left;
    originalBigPlayerArtistNameTop = bigPlayerArtistName.style.top;
  });
  const musicProgressDiv = document.querySelector(".music-progress");
  const musicProgress = document.createElement("span");
  musicProgress.id = "musicProgress";
  const musicTotalLength = document.createElement("span");
  musicTotalLength.id = "musicTotalLength";
  const musicTimeInfo = document.createElement("div");
  musicTimeInfo.classList.add("music-time-info");
  musicTimeInfo.appendChild(musicProgress);
  musicTimeInfo.appendChild(musicTotalLength);
  musicProgressDiv.appendChild(musicTimeInfo);
  function updateMusicProgress() {
    const currentTime = audioPlayer.currentTime;
    const totalTime = audioPlayer.duration;
    const progressPercentage = (currentTime / totalTime) * 100;
    musicSlider.value = progressPercentage;
    musicProgress.textContent = formatTime(currentTime);
    musicTotalLength.textContent = formatTime(totalTime);
  }
  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }
  audioPlayer.addEventListener("timeupdate", updateMusicProgress);
  function seekMusic() {
    const seekToTime = (musicSlider.value * audioPlayer.duration) / 100;
    audioPlayer.currentTime = seekToTime;
  }
  musicSlider.addEventListener("input", seekMusic);
});
