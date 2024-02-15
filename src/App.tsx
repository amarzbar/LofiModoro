import './App.css'
import Pomodoro from './components/pomodoro'
import Lofi from './components/lofi'
import { useState } from 'react';
import videoData from './data/livestreams.json';
function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currVideo, setCurrVideo] = useState();
  const [volume,setVolume] = useState(50);
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div tabIndex={-1}  className="absolute w-full h-full overflow-hidden"  >
     <Pomodoro isPlaying={isPlaying} togglePlayback={togglePlayback} videoData={videoData[0]} volume={volume} setVolume={setVolume}/>
      <Lofi isPlaying={isPlaying} togglePlayback={togglePlayback} volume={volume}/>
    </div>
  )
}

export default App
