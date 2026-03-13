const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlistUI = document.getElementById("playlist");
const songTitle = document.getElementById("song-title");
const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");

const songs = [
{title:"Song 1",file:"songs/song1.mp3"},
{title:"Song 2",file:"songs/song2.mp3"},
{title:"Song 3",file:"songs/song3.mp3"}
];

let songIndex = 0;

function loadSong(index){
audio.src = songs[index].file;
songTitle.textContent = songs[index].title;
}

function playSong(){
audio.play();
playBtn.textContent="⏸";
}

function pauseSong(){
audio.pause();
playBtn.textContent="▶";
}

playBtn.addEventListener("click",()=>{
if(audio.paused){
playSong();
}else{
pauseSong();
}
});

nextBtn.addEventListener("click",()=>{
songIndex++;
if(songIndex>=songs.length){
songIndex=0;
}
loadSong(songIndex);
playSong();
});

prevBtn.addEventListener("click",()=>{
songIndex--;
if(songIndex<0){
songIndex=songs.length-1;
}
loadSong(songIndex);
playSong();
});

audio.addEventListener("timeupdate",()=>{

let progressPercent=(audio.currentTime/audio.duration)*100;
progress.value=progressPercent;

let currentMin=Math.floor(audio.currentTime/60);
let currentSec=Math.floor(audio.currentTime%60);

if(currentSec<10){
currentSec="0"+currentSec;
}

currentTimeEl.textContent=currentMin+":"+currentSec;

let durationMin=Math.floor(audio.duration/60);
let durationSec=Math.floor(audio.duration%60);

if(durationSec<10){
durationSec="0"+durationSec;
}

durationEl.textContent=durationMin+":"+durationSec;

});

progress.addEventListener("input",()=>{
audio.currentTime=(progress.value/100)*audio.duration;
});

volume.addEventListener("input",()=>{
audio.volume=volume.value;
});

songs.forEach((song,index)=>{
let li=document.createElement("li");
li.textContent=song.title;
li.addEventListener("click",()=>{
songIndex=index;
loadSong(songIndex);
playSong();
});
playlistUI.appendChild(li);
});

loadSong(songIndex);