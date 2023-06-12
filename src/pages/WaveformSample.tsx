import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #fff;
  padding: 16px;
`;

const WaveformContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 150px;
  width: 100%;
  background: transparent;
`;

const Wave = styled.div`
  width: 100%;
  height: 90px;
`;

const PlayButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 60px;
height: 60px;
background: #EFEFEF;
border-radius: 50%;
border: none;
outline: none;
cursor: pointer;
padding-bottom: 3px;
&:hover {
  background: #DDD;
}
`;

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M3 22v-20l18 10-18 10z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M6 19h-4v-14h4v14zM18 19h-4v-14h4v14z" />
  </svg>
);

const PlayPauseButton = ({ waveform }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    if (isPlaying) {
      waveform.pause();
      setIsPlaying(false);
      const currentTime = waveform.getCurrentTime();
      localStorage.setItem('wavetime', currentTime);
    } else {
      waveform.play();
      setIsPlaying(true);
    }
  };
  const skipBackward = () => {
    const currentTime = waveform.getCurrentTime();
    const newTime = Math.max(0, currentTime - 5);
    waveform.seekTo(newTime / waveform.getDuration());
  };

  
  return (
  
    <PlayButton onClick={handleClick}>
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </PlayButton>
    
   
  );
};

const Waveform = ({ url }) => {
  const waveformRef = useRef(null);
  const [waveform, setWaveform] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [Initialtime, setInitialTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  

  useEffect(() => {
   
    const wavetime = localStorage.getItem('wavetime');
    setInitialTime(wavetime);
    const waveform = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#EFEFEF',
      progressColor: '#2D5BFF',
      barWidth: 2,
      barRadius: 3
    });
    waveform.on('ready', () => {
      setIsLoading(false);
      waveform.setCurrentTime(Initialtime );
    });

    waveform.load(url);
    setWaveform(waveform);

    waveform.on('audioprocess', () => {
      setCurrentTime(waveform.getCurrentTime());
    });

    return () => waveform.destroy();
  }, [url, Initialtime]);
  const skipBackward = () => {
    const currentTime = waveform.getCurrentTime();
    const newTime = Math.max(0, currentTime - 5);
    waveform.seekTo(newTime / waveform.getDuration());
  };
  const skipForward = () => {
    const currentTime = waveform.getCurrentTime();
    const newTime = Math.min(waveform.getDuration(), currentTime + 5);
    waveform.seekTo(newTime / waveform.getDuration());
  };
  const [state, setState] = useState({
    playing: false,
    speed: 1,
    speedOptions: [0.5, 1, 1.25, 1.5, 2],
  });
  
  const handleSpeedChange = () => {
    const currentIndex = state.speedOptions.indexOf(state.speed);
    const nextIndex = (currentIndex + 1) % state.speedOptions.length;
    const nextSpeed = state.speedOptions[nextIndex];
    setState({ ...state, speed: nextSpeed });
    waveform.setPlaybackRate(nextSpeed);
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'F2') {
        if (waveform.isPlaying()) {
          waveform.pause();
        } else {
          waveform.play();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [waveform]);

  return (
    <>
    {isLoading && <div>Loading audio file...</div>}
    <WaveformContainer>
      <PlayPauseButton waveform={waveform} />
      <Wave ref={waveformRef} />
      
    </WaveformContainer>
    <div style={{ display: 'flex', alignItems : 'center', marginBottom: '20px', marginTop: '0px' }}>
      <span style={{ display: 'flex', alignItems : 'center'}}>
      <label style={{ marginRight: '10px' }}>Speed:</label>
      <select value={state.speed} onChange={handleSpeedChange}>
        <option value={0.5}>0.5x</option>
        <option value={1}>1x</option>
        <option value={1.25}>1.25x</option>
        <option value={1.5}>1.5x</option>
        <option value={2}>2x</option>
      </select>
    </span>
    &nbsp; &nbsp;
    <span>
       
    <button  style={{border: 'none '}} onClick={skipBackward}>
    <svg data-v-3177ad4d="" width="19px" height="20px" viewBox="0 0 19 20" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M5.06671702,4 L14,4 C16.7614237,4 19,6.23857625 19,9 L19,12 C19,14.7614237 16.7614237,17 14,17 L12.8344704,17 L12.8344704,15 L14,15 C15.6568542,15 17,13.6568542 17,12 L17,9 C17,7.34314575 15.6568542,6 14,6 L5.06671702,6 L5.06671702,10 L0,5 L5.06671702,0 L5.06671702,4 Z" id="Combined-Shape"></path><text id="15" font-family="HelveticaNeue-Bold, Helvetica Neue" font-size="10" font-weight="bold" letter-spacing="0.125"><tspan x="0" y="19">5</tspan></text></svg>
    </button>
  
    <button style={{border: 'none '}} onClick={skipForward}><svg data-v-4592c488="" width="19px" height="20px" viewBox="0 0 19 20" version="1.1" xmlns="http://www.w3.org/2000/svg" >
<text id="5" font-family="HelveticaNeue-Bold, Helvetica Neue" font-size="10" font-weight="bold" letter-spacing="0.125">
<tspan x="7" y="19">5</tspan>
</text>
<path d="M5.06671702,4 L14,4 C16.7614237,4 19,6.23857625 19,9 L19,12 C19,14.7614237 16.7614237,17 14,17 L12.8344704,17 L12.8344704,15 L14,15 C15.6568542,15 17,13.6568542 17,12 L17,9 C17,7.34314575 15.6568542,6 14,6 L5.06671702,6 L5.06671702,10 L0,5 L5.06671702,0 L5.06671702,4 Z" id="Combined-Shape" transform="translate(9.500000, 8.500000) scale(-1, 1) translate(-9.500000, -8.500000) "></path></svg></button>
    </span>
    <span style={{ marginLeft: '10px' }}>
            {currentTime.toFixed(1)}s / {waveform && waveform.getDuration().toFixed(1)}s
          </span>
   
  </div>
  </>
  );
};

const WaveformContainerWithBackground = ({ url }) => {
  return (
    <Container>
      <Waveform url={url} />
    </Container>
  );
};

export default WaveformContainerWithBackground;
