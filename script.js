console.log("Welcome to Spotify")


let songIndex = 1;
let audioElement = new Audio();
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));
let masterSongName = document.getElementById('masterSongName');
let next = document.getElementById('next');
let previous = document.getElementById('previous');


let songs = [
    { songName: "Warriyo", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "She Move It Like", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Oxygen", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Mia", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Wo Kehte Hai", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg" },
    { songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg" },
]


//Updating Song name and covers
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    //element.getElementsByClassName("timeStamp")[0].innerText = so
})


//Default song 
masterSongName.textContent = songs[songIndex - 1].songName;
audioElement.src = songs[songIndex - 1].filePath;


const whichSongIsPlaying = () => {
   // console.log(audioElement.getAttribute("src"))
    let source = audioElement.getAttribute("src")
    var matches = source.match(/(\d+)/);
    //console.log("yo", matches[0])
    songIndex = matches[0]
    return songIndex
    //console.log(songItems[songIndex - 1].childNodes[5].childNodes[0].childNodes[1].classList)
}

//Updating the Masterplay
masterPlay.addEventListener("click", () => {
    songIndex = whichSongIsPlaying();
    console.log("inside masterplay whichsongisplaying", whichSongIsPlaying())
    let playPauseBtn = songItems[songIndex - 1].childNodes[5].childNodes[0].childNodes[1];
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();

        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
        
        playPauseBtn.classList.remove("fa-play-circle")
        playPauseBtn.classList.add("fa-pause-circle")
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
        playPauseBtn.classList.remove("fa-pause-circle")
        playPauseBtn.classList.add("fa-play-circle")
    }
})

//Update Seeker(Seeker will move)
audioElement.addEventListener("timeupdate", () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

//Progress bar will change when clicked
myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;

})

//When we will click on the certain songItemPlay class , then if a song is currently playing(means there is 
//currently pause class), we would want it to stop(pause) . This means we have to pause the song and add play class.
//So, we will remove pause class and add play class.
const makeAllPlays = () => {
    songItemPlay.forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


//If a certain songItemPlay class is clicked, then we would want it to play the particular song, remove play class
//and add pause class(meaning the song is playing). But before that we want to ensure that if some another song is
//playing, it should be stopped(remove pause class and add play class).So, we must call makeAllPlays() to ensure that.
//Then, we would want that particular song to play(remove play class and add pause class).
songItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = e.target.parentNode.parentNode.parentNode.childNodes[1].alt;
        //console.log("inside songItemplay", songIndex)
       // console.log(audioElement.duration)
        if (audioElement.paused) {
            //console.log("yes")
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex}.mp3`;
            masterSongName.innerText = songs[songIndex - 1].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            //console.log("playing")
        }
       
        else {
            audioElement.pause()
            e.target.classList.remove('fa-pause-circle')
            e.target.classList.add('fa-play-circle')
            masterPlay.classList.remove('fa-pause-circle')
            masterPlay.classList.add('fa-play-circle')
            gif.style.opacity = 0;
            //console.log(songIndex)
            console.log("paused")
        }
    })
})


//console.log("prev",songIndex)
//Play the next song
next.addEventListener('click', () => {
    console.log("index",songIndex)
    // whichSongIsPlaying();
    if (songIndex >= 10) {
        songIndex = 1;
        console.log("next", songIndex)
    }
    else {
        //console.log("inside else: adding 1==",songIndex)
        songIndex++;
    }
    
    console.log("after updating",songIndex)
    makeAllPlays();
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    //console.log("current song playing:::",songIndex)
    //console.log(songItems[songIndex-1].childNodes[5].childNodes[0].childNodes[1].classList)
    songItems[songIndex - 1].childNodes[5].childNodes[0].childNodes[1].classList.remove('fa-play-circle')
    songItems[songIndex - 1].childNodes[5].childNodes[0].childNodes[1].classList.add('fa-pause-circle')


})

//Play the previous song
previous.addEventListener('click', () => {
    if (songIndex <= 1) {
        songIndex = 10;
    }
    else {
        songIndex--;
    }
    makeAllPlays();
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    
    songItems[songIndex-1].childNodes[5].childNodes[0].childNodes[1].classList.remove('fa-play-circle')
    songItems[songIndex-1].childNodes[5].childNodes[0].childNodes[1].classList.add('fa-pause-circle')
})

//console.log(songItems[songIndex-1])