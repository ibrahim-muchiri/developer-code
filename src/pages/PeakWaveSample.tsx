import React, { useState, useEffect } from 'react';
import { Media, Player, controls, utils } from 'react-media-player';
import Peaks from 'peaks.js';
import '../assets/css/peakAudio.css';

const { PlayPause, CurrentTime, Progress, SeekBar, Duration, MuteUnmute, Volume, Fullscreen } = controls;
const { keyboardControls } = utils;

function PeakWaveSample() {
  const [peaksInstance, setPeaksInstance] = useState(null);

  useEffect(() => {
    if (!peaksInstance) {
      const options = {
        zoomview: {
          container: document.getElementById('zoomview-container')
        },
        overview: {
          container: document.getElementById('overview-container')
        },
        mediaElement: document.querySelector('video'),
        webAudio: {
          audioContext: new AudioContext()
        }
      };

      Peaks.init(options, function(err, peaks) {
        if (err) {
          console.error('Failed to initialize Peaks instance: ' + err.message);
          return;
        }

        setPeaksInstance(peaks);
      });
    }

    return () => {
      if (peaksInstance) {
        peaksInstance.destroy();
        setPeaksInstance(null);
      }
    };
  }, [peaksInstance]);

  return (
    <Media>
      {(mediaProps) => (
        <div
          className="media"
          onKeyDown={keyboardControls.bind(null, mediaProps)}
        >
          <Player
            src="https://scribe.clickaway.co.ke/api/projectFiles/4d4baeaa-0f14-4367-9a6d-e324fd236767"
            className="media-player"
          />
          <div className="media-controls">
            <PlayPause />
            <CurrentTime />
            <Progress />
            <SeekBar />
            <Duration />
            <MuteUnmute />
            <Volume />
            <Fullscreen />
          </div>
          <div id="overview-container"  style={{display: 'block', width: '100%', height: '50px'}} ></div>
          <div id="zoomview-container" style={{display: 'block', width: '100%', height: '50px'}}></div>
        </div>
      )}
    </Media>
  );
}

export default PeakWaveSample;
