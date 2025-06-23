const songs = [
  { name: "raabta.mp3", title: "Raabta", artist: "Arijit Singh" },
  { name: "saibo.mp3", title: "Saibo", artist: "Shreya Ghoshal & Tochi Raina" },
  { name: "ishq_hai.mp3", title: "Ishq Hai", artist: "Anurag Saikia" },
  { name: "tum_hi_ho.mp3", title: "Tum Hi Ho", artist: "Arijit Singh" },
  { name: "kesariya.mp3", title: "Kesariya", artist: "Arijit Singh" },
  { name: "teri_galliyan.mp3", title: "Galliyan", artist: "Ankit Tiwari" },
  { name: "shayad.mp3", title: "Shayad", artist: "Arijit Singh" }
];

let songIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const playlist = document.getElementById("playlist");
const muteBtn = document.getElementById("muteBtn");

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `songs/${song.name}`;
}

function togglePlay() {
  isPlaying ? audio.pause() : audio.play();
}

audio.onplay = () => isPlaying = true;
audio.onpause = () => isPlaying = false;

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
}

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;
    current.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
  }
});

function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function setVolume(value) {
  audio.volume = value;
}

function toggleMute() {
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? "🔇" : "🔊";
}

audio.addEventListener("ended", () => {
  nextSong();
});

songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.onclick = () => {
    songIndex = index;
    loadSong(song);
    audio.play();
  };
  playlist.appendChild(li);
});

loadSong(songs[songIndex]);
