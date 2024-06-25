import React, { useState, useEffect } from 'react';
import './CustomAudioPlayer.css'; // Apply your own CSS

const CustomAudioPlayer = ({ currentSong }) => {
  const [audioIndex, setAudioIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = React.createRef();

  useEffect(() => {
    const audio = audioRef.current;

    if (currentSong.songData.songs.length > 0) {
      audio.src = currentSong.link;
      audio.play();
    }

    const updateProgress = () => {
      const duration = audio.duration;
      const currentTime = audio.currentTime;
      const progressPercentage = (currentTime / duration) * 100;
      setProgress(progressPercentage);
    };

    audio.addEventListener('timeupdate', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, [currentSong, audioIndex]);

  const handleSeek = (e) => {
    const progressBar = e.target;
    const clickedX = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    
    // Calculate seekTime and ensure it's within valid range
    const seekTime = (clickedX / progressBarWidth) * audioRef.current.duration;
    if (!isNaN(seekTime) && isFinite(seekTime)) {
      audioRef.current.currentTime = seekTime;
    }
  };
  

  const handleAudioEnd = () => {
    if (currentSong.songs && audioIndex < currentSong.songs.length - 1) {
      setAudioIndex(audioIndex + 1);
    }
  };

  return (
    <div className="custom-audio-player">
      <audio ref={audioRef} controls={false} onEnded={handleAudioEnd} autoPlay>
        {/* The source will be set in the useEffect */}
      </audio>
      <div className="progress-bar" onClick={handleSeek}>
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
