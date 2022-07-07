import { useRef } from 'react';
import { videoSrc } from '../lib/sources';
import { useVideoPlayer } from '../hooks/useVideoPlayer';
import Controls from './Controls';
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
    handleOnKeyDown,
  } = useVideoPlayer(videoElement);

  //   console.log(videoElement);

  return (
    <VideoContainer>
      <VideoContent
        tabIndex={0}
        ref={videoElement}
        onClick={handleDisplayControls}
        onTimeUpdate={handleTimeUpdate}
        onKeyDown={e => handleOnKeyDown(e)}
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
