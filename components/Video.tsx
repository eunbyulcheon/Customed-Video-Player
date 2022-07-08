import { useRef } from 'react';
import { videoSrc } from '../lib/sources';
import { useVideoPlayer } from '../hooks/useVideoPlayer';
import Controls from './Controls';
import styled from 'styled-components';

const Video = () => {
  const videoElement = useRef<HTMLVideoElement>(null);
  const containerElement = useRef<HTMLDivElement>(null);
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

  //   console.log(videoElement);

  return (
    <VideoContainer
      ref={containerElement}
      tabIndex={0}
      onKeyDown={e => handleOnKeyDown(e)}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <VideoContent
        ref={videoElement}
        onClick={handleDisplayControls}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={videoSrc} type="video/mp4" />
      </VideoContent>
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
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
`;

const VideoContent = styled.video`
  outline: none;

  &::-webkit-media-controls {
    display: none;
  }
`;

export default Video;
