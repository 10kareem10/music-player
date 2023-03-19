import react,{useState,useRef} from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import data from "./data"
import Library from "./components/Library";
import Nav from "./components/Nav";


import "./styles/app.scss"
import LibrarySong from "./components/LibrarySong";

function App() {
  const audioRef= useRef(null);

  const[songs, SetSongs]= useState(data());
  const[currentSong, setCurrentSong]= useState(songs[0]);
  const[isPlaying,setIsPlaying]=useState(false);
  const[songInfo,SetSongInfo]=useState(
    {
        currentTime:0,
        duration:0,
    } 
);
const [libraryStatus,setLibraryStatus]=useState(false);
const timeUpdateHandler=(e)=>{
  const current= e.target.currentTime;
  const duration= e.target.duration;
  SetSongInfo({...songInfo,currentTime:current,duration});
};  

const songEndHandler = async ()=>{
  let currentIndex=songs.findIndex((song)=>song.id===currentSong.id);
        await setCurrentSong(songs[(currentIndex+1)%songs.length]);
         if(isPlaying) audioRef.current.play();      
};
  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}/>
      <Player audioRef={audioRef}
       SetSongInfo={SetSongInfo} 
       songInfo={songInfo}
        audio={audioRef} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying}
         currentSong={currentSong}
         setCurrentSong={setCurrentSong}
         songs={songs}
         SetSongs={SetSongs}
         />
      <Library audioRef={audioRef }
       songs={songs}
        setCurrentSong={setCurrentSong}
         isPlaying={isPlaying}
          SetSongs={SetSongs}
          libraryStatus={libraryStatus}
          setLibraryStatus={setLibraryStatus}
          />
      <audio onTimeUpdate={timeUpdateHandler}
       onLoadedMetadata={timeUpdateHandler} 
       ref={audioRef}
        src={currentSong.audio}
          onEnded={songEndHandler}>

        </audio>

      
    </div>
  );
}

export default App;
