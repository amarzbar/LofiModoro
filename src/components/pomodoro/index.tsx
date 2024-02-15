import React, { useState, useEffect } from "react";
import { MdPlayArrow } from "react-icons/md";
import { ImLoop2 } from "react-icons/im";
import { FaStop } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoVolumeHigh } from "react-icons/io5";


const Pomodoro = (props:any) => {
 

    // timer in seconds 
    const [timer, setTimer] = useState(1500);
    const [start, setStart] = useState(false);
    const [audio] = useState(new Audio('/5 second countdown with sound effect.mp3'));
    const [chime] = useState(new Audio('/TTC (Toronto) Subway Door Closing Chime.mp3'))
    const [isBreak, setBreak] = useState(false);
    const [menu, setMenu] = useState('None'); // None , Burger, or Vol
    const toggleTimer = () =>{
        setStart(!start);
        props.togglePlayback(!props.isPlaying)

       
    }

    const reset_clicked = () => {
        setStart(false);
        props.togglePlayback(false)

        setTimer(5);
    }

    const handleVolumeChange = (event) => {
        const newValue = event.target.value; // Get the new value of the slider
        props.setVolume(newValue); // Update the state variable
      };

    const parseSeconds = (time:any) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return [minutes, seconds]; 
    };
    useEffect(() => {
        const timerId = setInterval(() => {
            if (timer > 0 && start === true) {
                setTimer(timer - 1);
                if(timer === 5){
                    audio.play();
                }
            }if(timer === 0){
                chime.play();
                if(!isBreak){
                setTimer(5*60);
                setBreak(!isBreak);
            }else{
                setTimer(25*60);
                setBreak(!isBreak);
            }
            }
        }, 1000);

        return () => clearInterval(timerId);
    }, [timer, start]);

    const results = parseSeconds(timer);
    const minutes = results[0];
    const seconds = results[1];

    return(
        <>
        <div className="absolute z-10 w-full h-full bg-black opacity-30 blur-sm fill-transparent"></div>
        <div className=" w-1/2 h-1/2   relative flex flex-col m-auto translate-y-[50%] z-10 backdrop-blur-xl backdrop-opacity-50 backdrop-filter">
            <div className="m-auto text-white text-9xl">
                {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
            <div className="flex  [&>*]:rounded-full my-5 justify-around ">
                {/* <div className="text-center bg-red-700 min-w-auto w-52">+5 min</div> */}
                <div className="flex justify-around text-center controls min-w-auto w-52">
                { !start ?                
                (<div className="transition-all duration-200 bg-green-700 rounded-full cursor-pointer select-none p-7 start-stop hover:bg-green-300" onClick={toggleTimer}><MdPlayArrow className="scale-150" />
                </div>) :
                (<div className="transition-all duration-200 bg-red-700 rounded-full cursor-pointer p-7 start-stop hover:bg-red-300" onClick={toggleTimer}><FaStop />
                </div>) 

                }
                <div className="transition-all duration-300 ease-linear bg-blue-600 rounded-full p-7 hover:bg-sky-500" onClick={reset_clicked}><ImLoop2 /></div>

                
                </div>
                {/* <div className="text-center bg-blue-700 min-w-auto w-52">J</div> */}
            </div>
            <div className="flex self-center justify-center [&>*]:px-5 mt-20 scale-75">

            {
               !props.isPlaying ? (<div className="flex py-5 -mx-5 scale-125 bg-blue-200 rounded-full size-48"><img className="relative transition-all ease-linear rounded-full animate-spin-slow" src={props.videoData.thumbnail} alt="Album Art" /></div>):
               (<div className="flex py-5 -mx-5 transition-all duration-300 ease-in scale-125 bg-blue-200 rounded-full size-48"><img className="relative rounded-full" src={props.videoData.thumbnail} alt="Album Art" /></div>)
                
            }
            <div className="my-auto flex [&>*]:p-10 MediaControl bg-opacity-45 text-white  bg-black rounded-xl items-center">
                  
                  {!props.isPlaying ?(<div className="overflow-hidden text-nowrap text-ellipsis"> <h1 className="text-3xl">Now Playing:</h1>  <div className="animate-loop-scroll">{props.videoData.title}</div></div>): (<div className="overflow-hidden text-nowrap text-ellipsis"> <h1 className="text-3xl ">Playback Paused:</h1>  <div>{props.videoData.title}</div></div>) } 
                  <div className="[&>*]:p-0  rounded-full hover:bg-slate-500 mr-3 hover:bg-opacity-45" tabIndex={0} onClick={()=>{
                    if(menu!== 'Vol') setMenu('Vol')
                    else setMenu('None')
                }
                    
                    }><IoVolumeHigh  className="scale-150"/></div>
                  {
                    menu === 'Vol' && <div onBlur={()=>{setMenu('None')}}><input type="range" min={0} value={props.volume} max={100} id="volumeControl" onInput={handleVolumeChange } /></div>
                  }
                  <div className="[&>*]:p-0  rounded-full hover:bg-slate-500 ml-[-10px] hover:bg-opacity-45 "><GiHamburgerMenu className="scale-110" /></div>
              </div>


            </div>
           
        </div>
        </>
    );// Volume coming soon :) + More lofi streams to choose from!
};

export default Pomodoro;
