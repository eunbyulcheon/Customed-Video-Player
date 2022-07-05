import styled from 'styled-components';

const Video = () => {
  const videoSrc =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  return (
    <VideoContainer>
      <VideoContent>
        <source src={videoSrc} type="video/mp4" />
      </VideoContent>
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  position: relative;
`;

const VideoContent = styled.video`
  &::-webkit-media-controls {
    display: none;
  }
`;

export default Video;
