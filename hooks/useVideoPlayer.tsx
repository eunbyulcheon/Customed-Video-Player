import React, { useEffect, useState } from 'react';

export const useVideoPlayer = (videoElement: any) => {
  const [videoPlaying, setVideoPlaying] = useState({
    playing: false,
    progress: 0,
    muted: false,
    volume: 0.5,
  });
  const [displayControls, setDisplayControls] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [adPlaying, setAdPlaying] = useState(false);

  // time update
  const handleTimeUpdate = () => {
    const progress =
      (videoElement.current.currentTime / videoElement.current.duration) * 100;
    setVideoPlaying({
      ...videoPlaying,
      progress,
    });
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

  // Progress bar
  const totalTime =
    (videoElement && videoElement.current && videoElement.current.duration) ||
    0;

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

  //  volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let newValue = Number(e.currentTarget.value);
    setVideoPlaying({
      ...videoPlaying,
      volume: (videoElement.current.volume / 100) * newValue,
      muted: newValue === 0 ? true : false,
    });
  };

  // fullscreen
  const handleFullScreen = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (videoElement.current.fullscreenElement) {
      videoElement.current.exitFullscreen();
      setFullscreen(false);
    } else {
      videoElement.current.requestFullscreen();
      setFullscreen(true);
    }
  };

  // keydown event
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    let progressChange =
      (videoElement.current.currentTime / videoElement.current.duration) * 100;

    if (e.code === 'ArrowLeft') {
      setVideoPlaying({
        ...videoPlaying,
        progress: (progressChange -= 5),
      });
    } else if (e.code === 'ArrowRight') {
      setVideoPlaying({
        ...videoPlaying,
        progress: (progressChange += 5),
      });
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

  // make controls visible
  const handleDisplayControls = () => {
    if (!displayControls) {
      setDisplayControls(true);
      setTimeout(() => {
        setDisplayControls(false);
      }, 3000);
    }
  };

  // ad
  const playAd = () => {
    let timer = setTimeout(() => {
      setAdPlaying(true);
      setVideoPlaying({
        ...videoPlaying,
        playing: false,
        progress: videoElement.current.currentTime,
        muted: true,
      });

      timer = setTimeout(() => {
        setAdPlaying(false);
      }, 15000);
    }, 30000);
  };

  const endAd = () => {
    setAdPlaying(false);
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
    fullscreen,
    adPlaying,
    setAdPlaying,
    playAd,
    endAd,
  };
};
