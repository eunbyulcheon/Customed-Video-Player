import { useEffect, useState } from 'react';

export const useVideoPlayer = (videoElement: any) => {
  const [videoPlayer, setVideoPlayer] = useState({
    playing: false,
    progress: 0,
    muted: false,
  });

  // play/pause function
  const handlePlay = () => {
    setVideoPlayer({
      ...videoPlayer,
      playing: !videoPlayer.playing,
    });
  };

  useEffect(() => {
    videoPlayer.playing
      ? videoElement.current.play()
      : videoElement.current.pause();
  }, [videoPlayer.playing, videoElement]);

  // Progress bar function -> how much has been watched

  const handleTimeUpdate = () => {
    const progress =
      (videoElement.current.currentTime / videoElement.current.duration) * 100;
    setVideoPlayer({
      ...videoPlayer,
      progress,
    });
  };

  // Progress bar function -> dragging the progress bar to where we want to watch
  const handleProgressBar = (e: any) => {
    const rePosition = Number(e.target.value);
    console.log(rePosition);
    videoElement.current.currentTime =
      (videoElement.current.duration / 100) * rePosition;
    setVideoPlayer({
      ...videoPlayer,
      progress: rePosition,
    });
  };

  // volume mute function
  const handleMute = () => {
    setVideoPlayer({
      ...videoPlayer,
      muted: !videoPlayer.muted,
    });
  };

  useEffect(() => {
    videoPlayer.muted
      ? (videoElement.current.muted = true)
      : (videoElement.current.muted = false);
  }, [videoPlayer.muted, videoElement]);

  return {
    videoPlayer,
    handlePlay,
    handleTimeUpdate,
    handleProgressBar,
    handleMute,
  };
};
