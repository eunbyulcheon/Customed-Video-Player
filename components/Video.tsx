import { useState, useRef } from 'react';
import { videoSrc } from '../lib/sources';
import { useVideoPlayer } from '../hooks/useVideoPlayer';
import Ad from './Ad';
import Controls from './Controls';
import styled from 'styled-components';

const Video = () => {
  const videoElement = useRef<HTMLVideoElement>(null);
  const [ad, setAd] = useState(false);

  const {
    videoPlaying,
    handleDisplayControls,
    handlePlay,
    totalTime,
    handleTimeUpdate,
    displayControls,
    handleProgressBar,
    handleMute,
    handleVolumeChange,
    handleOnKeyDown,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleFullScreen,
  } = useVideoPlayer(videoElement);

  const playAd = () => {
    let timer = setTimeout(() => {
      setAd(true);
      videoPlaying.muted = true;
      videoPlaying.playing = false;
      timer = setTimeout(() => {
        setAd(false);
        videoPlaying.muted = false;
        videoPlaying.playing = true;
      }, 15000);
    }, 5000);
  };

  const endAd = () => {
    setAd(false);
  };

  return (
    <VideoContainer
      tabIndex={0}
      onKeyDown={e => handleOnKeyDown(e)}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <VideoContent
        ref={videoElement}
        onClick={handleDisplayControls}
        onTimeUpdate={handleTimeUpdate}
        onPlay={playAd}
        onEnded={endAd}
      >
        <source src={videoSrc} type="video/mp4" />
      </VideoContent>
      {displayControls && (
        <Controls
          videoPlaying={videoPlaying}
          handlePlay={handlePlay}
          totalTime={totalTime}
          displayControls={displayControls}
          handleProgressBar={handleProgressBar}
          handleMute={handleMute}
          handleVolumeChange={handleVolumeChange}
          handleFullScreen={handleFullScreen}
        />
      )}
      {ad && <Ad setAd={setAd} endAd={endAd} />}
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  outline: none;
`;

const VideoContent = styled.video`
  width: 100%;
  outline: none;

  &::-webkit-media-controls {
    display: none;
  }
`;

export default Video;
