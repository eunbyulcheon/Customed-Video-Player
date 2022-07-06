import Image from 'next/image';
import styled from 'styled-components';

interface VideoProps {
  videoPlayer: {
    playing: boolean;
    progress: number;
    muted: boolean;
  };
  handlePlay: () => void;
  currentLength: number;
  startTime: number;
  totalTime: any;
  displayControls: boolean;
  handleProgressBar: any;
  handleMute: () => void;
}

const Controls: React.FC<VideoProps> = ({
  videoPlayer,
  handlePlay,
  currentLength,
  startTime,
  totalTime,
  handleProgressBar,
  handleMute,
}) => {
  return (
    <Container>
      <PlayButton onClick={handlePlay}>
        <Image
          src={!videoPlayer.playing ? '/images/play.png' : '/images/pause.png'}
          width={40}
          height={40}
          alt="play/pause"
        />
      </PlayButton>

      <VideoLength>
        <Range
          type="range"
          value={currentLength}
          max={totalTime}
          onChange={handleProgressBar}
        />
        <CurrentLength>{startTime}</CurrentLength>
        <TotalLength>{totalTime}</TotalLength>
      </VideoLength>

      <VolumeButton onClick={handleMute}>
        <Image
          src={!videoPlayer.muted ? '/images/volume.png' : '/images/mute.png'}
          width={40}
          height={40}
          alt="volume"
        />
      </VolumeButton>

      <FullscreenButton>
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

const Range = styled.input`
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0, 2);
  border-radius: 20px;
  height: 6px;
  width: 800px;
  margin-top: 35px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    cursor: pointer;
    height: 6px;
  }

  &::-moz-range-progress {
    background-color: #fff;
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

const VolumeButton = styled.button`
  background: none;
`;

const FullscreenButton = styled.button`
  background: none;
  color: #fff;
`;

export default Controls;
