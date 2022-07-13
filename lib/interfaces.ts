interface VideoPlayingProp {
    playing: boolean;
    progress: number;
    muted: boolean;
    volume: number;
  }
  
  export interface VideoProps {
    videoPlaying: VideoPlayingProp;
    handlePlay: () => void;
    totalTime: any;
    displayControls: boolean;
    handleMute: () => void;
    fullscreen: boolean;
    handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleProgressBar: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFullScreen: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }