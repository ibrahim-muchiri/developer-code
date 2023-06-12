import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';


import { WaveformContianer, Wave, PlayButton } from './Waveform.styled';

class Waveform extends Component {  
  state = {
    playing: false,
    speed: 1,
    speedOptions: [0.5, 1, 1.25, 1.5, 2],
  };

  componentDidMount() {
    const track = document.querySelector('#track');

    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'WebAudio',
      height: 80,
      progressColor: '#2D5BFF',
      responsive: true,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent',
    });

    this.waveform.load(track);
    this.waveform.setPlaybackRate(this.state.speed);
  };
  
  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  };
  
  skipBackward = () => {
    const currentTime = this.waveform.getCurrentTime();
    const newTime = Math.max(0, currentTime - 5);
    this.waveform.seekTo(newTime / this.waveform.getDuration());
  };
  
  skipForward = () => {
    const currentTime = this.waveform.getCurrentTime();
    const newTime = Math.min(this.waveform.getDuration(), currentTime + 5);
    this.waveform.seekTo(newTime / this.waveform.getDuration());
  };
  handleSpeedChange = () => {
    const currentIndex = this.state.speedOptions.indexOf(this.state.speed);
    const nextIndex = (currentIndex + 1) % this.state.speedOptions.length;
    const nextSpeed = this.state.speedOptions[nextIndex];
    this.setState({ speed: nextSpeed });
    this.waveform.setPlaybackRate(nextSpeed);
  };

  render() {
    const url = this.props;

    return (
      <>
      <WaveformContianer>
        <PlayButton onClick={this.handlePlay}>
          {!this.state.playing ? <i className="fa fa-play-circle fa-5x"></i> : <i className="fa fa-pause fa-2x"></i>}
        </PlayButton>
        <Wave id="waveform" />
        <audio id="track" src={url} />
      </WaveformContianer>
      <div style={{ display: 'flex', alignItems : 'center', marginBottom: '20px', marginTop: '0px' }}>
      <span style={{ display: 'flex', alignItems : 'center'}}>
      <label style={{ marginRight: '10px' }}>Speed:</label>
      <select value={this.state.speed} onChange={this.handleSpeedChange}>
        <option value={0.5}>0.5x</option>
        <option value={1}>1x</option>
        <option value={1.25}>1.25x</option>
        <option value={1.5}>1.5x</option>
        <option value={2}>2x</option>
      </select>
    </span>
    &nbsp; &nbsp;
    <span>
       
    <button  style={{border: 'none '}} onClick={this.skipBackward}>
    <svg data-v-3177ad4d="" width="19px" height="20px" viewBox="0 0 19 20" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M5.06671702,4 L14,4 C16.7614237,4 19,6.23857625 19,9 L19,12 C19,14.7614237 16.7614237,17 14,17 L12.8344704,17 L12.8344704,15 L14,15 C15.6568542,15 17,13.6568542 17,12 L17,9 C17,7.34314575 15.6568542,6 14,6 L5.06671702,6 L5.06671702,10 L0,5 L5.06671702,0 L5.06671702,4 Z" id="Combined-Shape"></path><text id="15" font-family="HelveticaNeue-Bold, Helvetica Neue" font-size="10" font-weight="bold" letter-spacing="0.125"><tspan x="0" y="19">5</tspan></text></svg>
    </button>
  
    <button style={{border: 'none '}} onClick={this.skipForward}><svg data-v-4592c488="" width="19px" height="20px" viewBox="0 0 19 20" version="1.1" xmlns="http://www.w3.org/2000/svg" >
<text id="5" font-family="HelveticaNeue-Bold, Helvetica Neue" font-size="10" font-weight="bold" letter-spacing="0.125">
<tspan x="7" y="19">5</tspan>
</text>
<path d="M5.06671702,4 L14,4 C16.7614237,4 19,6.23857625 19,9 L19,12 C19,14.7614237 16.7614237,17 14,17 L12.8344704,17 L12.8344704,15 L14,15 C15.6568542,15 17,13.6568542 17,12 L17,9 C17,7.34314575 15.6568542,6 14,6 L5.06671702,6 L5.06671702,10 L0,5 L5.06671702,0 L5.06671702,4 Z" id="Combined-Shape" transform="translate(9.500000, 8.500000) scale(-1, 1) translate(-9.500000, -8.500000) "></path></svg></button>
    </span>
   
  </div>
      </>
    );
  }
};

export default Waveform;
