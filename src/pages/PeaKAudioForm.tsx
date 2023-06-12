import React, { Component } from 'react';
import Peaks from 'peaks.js';
import '../assets/css/peakAudio.css';

class AudioWaveform extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.audioRef = React.createRef();
    this.peaksInstance = null;
  }

  componentDidMount() {
    const options = {
      zoomview: {
        container: this.containerRef.current.querySelector('.zoomview-container')
      },
      overview: {
        container: this.containerRef.current.querySelector('.overview-container')
      },
      mediaElement: this.audioRef.current,
      webAudio: {
        audioContext: new (window.AudioContext || window.webkitAudioContext)()
      }
    };

    this.peaksInstance = Peaks.init(options, (err, peaks) => {
      if (err) {
        console.error('Failed to initialize Peaks instance:', err.message);
        return;
      }
      console.log('Peaks.js instance is ready');
      // Do something with the Peaks.js instance, like adding event listeners or customizing the waveform
    });
  }

  componentWillUnmount() {
    // Clean up any event listeners or resources used by the Peaks.js instance
    if (this.peaksInstance) {
      this.peaksInstance.destroy();
    }
  }

  render() {
    return (
        <div ref={this.containerRef} className="peaks-container">
        <div className="zoomview-container"></div>
        <div className="overview-container"></div>
        <audio ref={this.audioRef} src={this.props.audioSrc} controls ></audio>
      </div>
    );
  }
}

export default AudioWaveform;
