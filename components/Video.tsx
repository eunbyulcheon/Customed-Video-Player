import { useState, useRef } from 'react';
import { videoSrc } from '../lib/sources';
import { useVideoPlayer } from '../hooks/useVideoPlayer';
import Controls from './Controls';
import Spinner from './Spinner';
import Ad from './Ad';
import styled from 'styled-components';

const Video = () => {
  const videoElement = useRef<HTMLVideoElement>(null);

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
    fullscreen,
    adPlaying,
    setAdPlaying,
    playAd,
    endAd,
  } = useVideoPlayer(videoElement);

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
      {videoElement.current?.networkState === 2 ? <Spinner /> : null}
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
          fullscreen={fullscreen}
        />
      )}
      {adPlaying && <Ad setAdPlaying={setAdPlaying} endAd={endAd} />}
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
