import { useRef } from 'react';
import { videoSrc } from '../lib/sources';
import { useVideoPlayer } from '../hooks/useVideoPlayer';
import Controls from './Controls';
import styled from 'styled-components';

const Video = () => {
  const videoElement = useRef<HTMLVideoElement>(null);
  const {
    videoPlayer,
    handleHiddenControls,
    handlePlay,
    currentLength,
    startTime,
    totalTime,
    handleTimeUpdate,
    displayControls,
    handleProgressBar,
    handleMute,
  } = useVideoPlayer(videoElement);

  return (
    <VideoContainer>
      <VideoContent
        ref={videoElement}
        onClick={handleHiddenControls}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={videoSrc} type="video/mp4" />
      </VideoContent>
      <Controls
        videoPlayer={videoPlayer}
        handlePlay={handlePlay}
        currentLength={currentLength}
        startTime={startTime}
        totalTime={totalTime}
        displayControls={displayControls}
        handleProgressBar={handleProgressBar}
        handleMute={handleMute}
      />
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
`;

const VideoContent = styled.video`
  &::-webkit-media-controls {
    display: none;
  }
`;

export default Video;
