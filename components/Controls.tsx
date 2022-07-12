import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

interface VideoProps {
  videoPlaying: {
    playing: boolean;
    progress: number;
    muted: boolean;
    volume: number;
  };
  handlePlay: () => void;
  totalTime: any;
  displayControls: boolean;
  handleMute: () => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProgressBar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFullScreen: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Controls: React.FC<VideoProps> = ({
  videoPlaying,
  handlePlay,
  totalTime,
  handleProgressBar,
  handleVolumeChange,
  handleMute,
  handleFullScreen,
}) => {
  const formatTime = (second: number) => {
    const date = new Date(second * 1000);
    const mm = date.getUTCMinutes();
    const ss = date.getSeconds();
    const minutes = (mm < 10 ? '0' : '') + mm + ':';
    const seconds = (ss < 10 ? '0' : '') + ss;
    return minutes + seconds;
  };

  return (
    <Container>
      <PlayButton onClick={handlePlay}>
        <Image
          src={!videoPlaying.playing ? '/images/play.png' : '/images/pause.png'}
          width={40}
          height={40}
          alt="play/pause"
        />
      </PlayButton>

      <VideoLength>
        <ProgressBar
          type="range"
          value={videoPlaying.progress}
          min="0"
          max="100"
          onChange={e => handleProgressBar(e)}
        />
        <CurrentLength>{formatTime(videoPlaying.progress)}</CurrentLength>
        <TotalLength>{formatTime(totalTime)}</TotalLength>
      </VideoLength>

      {!videoPlaying.muted && (
        <VolumeBar
          type="range"
          min={0}
          max={100}
          value={videoPlaying.volume * 100}
          onChange={e => handleVolumeChange(e)}
        />
      )}
      <VolumeButton onClick={handleMute}>
        <Image
          src={!videoPlaying.muted ? '/images/volume.png' : '/images/mute.png'}
          width={40}
          height={40}
          alt="volume"
        />
      </VolumeButton>

      <FullscreenButton onClick={e => handleFullScreen(e)}>
        <Image
          src="/images/fullscreen.png"
          width={40}
          height={40}
          alt="fullscreen"
        />
      </FullscreenButton>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 88%;
  height: 80px;
  margin: 0 auto;
  border-radius: 20px;
`;

const PlayButton = styled.button`
  background: none;
  color: #fff;
`;

const VideoLength = styled.div`
  width: 800px;
  height: 80px;
  position: relative;
`;

const ProgressBar = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  height: 8px;
  width: 800px;
  margin-top: 35px;
  border-radius: 20px;
  background: ${props =>
    `linear-gradient(to right, #fff 0%, #fff ${props.value}%, #ffffff7f ${props.value}%, #ffffff7f 100%);`};

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background-image: radial-gradient(circle, #ffffff7f 40%, #fff 45%);
    border-radius: 50%;
    cursor: pointer;
  }
`;

const CurrentLength = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  font-size: 16px;
  color: #fff;
  letter-spacing: 1px;
`;

const TotalLength = styled(CurrentLength)`
  left: 760px;
`;

const VolumeBar = styled.input`
  position: absolute;
  right: 119px;
  bottom: 105px;
  width: 80px;
  height: 8px;
  transform: rotate(270deg);
  transform-origin: center;
  outline: none;
  border-radius: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: ${props =>
    `linear-gradient(to right, #fff 0%, #fff ${props.value}%, #ffffff7f ${props.value}%, #ffffff7f 100%);`};

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background-image: radial-gradient(circle, #ffffff7f 40%, #fff 45%);
    border-radius: 50%;
    cursor: pointer;
  }
`;

const VolumeButton = styled.button`
  background: none;
`;

const FullscreenButton = styled.button`
  background: none;
  color: #fff;
`;

export default Controls;
