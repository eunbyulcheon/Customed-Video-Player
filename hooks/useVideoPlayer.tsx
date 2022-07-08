import React, { useEffect, useState } from 'react';

export const useVideoPlayer = (videoElement: any) => {
  const [videoPlaying, setVideoPlaying] = useState({
    playing: false,
    progress: 0,
    muted: false,
  });
  const [displayControls, setDisplayControls] = useState(false);

  // make controls visible
  const handleDisplayControls = () => {
    if (!displayControls) {
      setDisplayControls(true);
      setTimeout(() => {
        setDisplayControls(false);
      }, 3000);
    }
  };

  // play/pause function
  const handlePlay = () => {
    setVideoPlaying({
      ...videoPlaying,
      playing: !videoPlaying.playing,
    });
  };

  useEffect(() => {
    videoPlaying.playing
      ? videoElement.current.play()
      : videoElement.current.pause();
  }, [videoPlaying.playing, videoElement]);

  // Progress bar function -> how much has been watched
  const totalTime =
    (videoElement && videoElement.current && videoElement.current.duration) ||
    0;

  const handleTimeUpdate = () => {
    const progress =
      (videoElement.current.currentTime / videoElement.current.duration) * 100;
    setVideoPlaying({
      ...videoPlaying,
      progress,
    });
  };

  // Progress bar function -> dragging the progress bar to where we want to watch
  const handleProgressBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const manualChange = Number(e.target.value);
    videoElement.current.currentTime =
      (videoElement.current.duration / 100) * manualChange;
    setVideoPlaying({
      ...videoPlaying,
      progress: manualChange,
    });
  };

  // volume mute
  const handleMute = () => {
    setVideoPlaying({
      ...videoPlaying,
      muted: !videoPlaying.muted,
    });
  };

  useEffect(() => {
    videoPlaying.muted
      ? (videoElement.current.muted = true)
      : (videoElement.current.muted = false);
  }, [videoPlaying.muted, videoElement]);

  // volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    videoElement.current.volume = e.target.value;
  };

  // keydown event condition
  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement | HTMLVideoElement>
  ): void => {
    if (e.code === 'ArrowLeft') {
      videoPlaying.progress -= 5;
    } else if (e.code === 'ArrowRight') {
      videoPlaying.progress += 5;
    } else if (e.code === 'Space') {
      if (videoElement.current.paused) {
        videoElement.current.play();
        setVideoPlaying({
          ...videoPlaying,
          playing: true,
        });
      } else {
        videoElement.current.pause();
        setVideoPlaying({
          ...videoPlaying,
          playing: false,
        });
      }
    }
  };

  // mouse events
  const handleOnMouseEnter = () => {
    setDisplayControls(true);
  };

  const handleOnMouseLeave = () => {
    setDisplayControls(false);
  };

  // fullscreen
  const handleFullScreen = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (videoElement.current.fullscreenElement) {
      videoElement.current.exitFullscreen();
    } else {
      videoElement.current.requestFullscreen();
    }
  };

  return {
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
  };
};
