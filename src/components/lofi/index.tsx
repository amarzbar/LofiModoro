import React, { useRef, useEffect, useState } from 'react';
import Youtube from 'react-youtube';

export default function Lofi(props:any) {
  const playerRef = useRef(null);
  // Function to play or pause the video
  useEffect (() =>{

    console.log("toggling from lofi")
    // Check if the player reference exists
    if (playerRef.current) {
      // Access the player instance
      const player = playerRef.current.internalPlayer;
      // If the video is currently playing, pause it; otherwise, play it
      if (props.isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      
      // Update the state to reflect the new playback state
    }

    return () => {
      props.togglePlayback(false);
  	};
  }, [props.isPlaying]) 
  // The reason for this UseEffect existing is to prevent tab-navigation from accessing this component. Originally tab-indexing and parameters to the youtube-react component didn't seem to work. So I had to bring the big guns
  useEffect(() => {
    const handleTabPress = (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
      }
    };
    
    document.addEventListener('keydown', handleTabPress);
  
    return () => {
      document.removeEventListener('keydown', handleTabPress);
    };
  }, []);

  useEffect(() => {
    // Check if the player reference exists
    if (playerRef.current) {
      // Access the player instance
      const player = playerRef.current.internalPlayer;
      // Update the volume if the player supports it
      if (player.setVolume) {
        player.setVolume(props.volume);
      }
    }
}, [props.volume]);
  // Options for the Youtube component
  const opts = {
    height: '100%',
    width: '100%',
    tabIndex: -1,
    playerVars: {
      // Add any player parameters here if needed
      rel: 0,
      controls: 0,
      disablekb: 1,
      enablejsapi: 1,
    },
  };

  // Add a click event listener to play/pause the video when the div is clicked
  

  return (
    <div className='relative w-full h-full overflow-hidden scale-125  translate-y-[-50%] pointer-events-none' tabIndex={-2}>
      {/* Div with a listener to play/pause the video */}
      {/* Youtube component  */}
      <Youtube className="relative h-[100%] w-[100%] scale-[190%] blur-xl"    videoId="jfKfPfyJRdk" opts={opts} ref={playerRef} />
    </div>
  );
}
