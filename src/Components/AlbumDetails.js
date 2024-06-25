import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import './AlbumDetails.css';

const AlbumDetails = ({ onClose, setCurrentSong }) => {
  const { id } = useParams(); 
  const [albumData, setAlbumData] = useState(null);
  const [songSources, setSongSources] = useState([]); // Store song sources

  useEffect(() => {
    // Fetch album details using the album ID from the route parameters
    fetch(`https://academics.newtonschool.co/api/v1/music/album/${id}`, {
      headers: {
        'projectId': 'bmc60xnvc646' 
      }
    })
      .then(response => response.json())
      .then(data => {
        setAlbumData(data.data); // Store the fetched album data in the state
        collectSongSources(data.data); // Collect song sources
      })
      .catch(error => {
        console.error('Error fetching album data:', error);
      });
  }, [id]); // Fetch whenever the album ID changes

  const collectSongSources = (albumData) => {
    const sources = [];
    albumData.artists.forEach(artist => {
      artist.songs.forEach(songId => {
        const song = albumData.songs.find(song => song._id === songId);
        if (song) {
          sources.push(song.audio_url);
        }
      });
    });
    setSongSources(sources);
  }
console.log(albumData);
  if (!albumData) {
    return null; // If album data is not fetched yet, don't render anything
  }
  
  return (
    <div className="album-details-popup">
      <div className='album-box'>
        <div className="album-img" >
      <img className='song-img' src={albumData.image} alt={albumData.title} /></div>
      <div className='album-details'>
      <span className='song-title'>{albumData.title}</span>
      <p className='song-description'>{albumData.description}</p>
      <button className='main-btn'>Preview</button>
      </div>
      </div>
      <div className='main-box'>
        <div className='head-name'>
          <p>Song</p>
          <p>Artist</p>
          <p>Mood</p>
          <p>Play</p>
        </div>
      {albumData.artists.map(artist => (
        <div className='song-by-name'key={artist._id}>

          {artist.songs.map(songId => {
            const song = albumData.songs.find(song => song._id === songId);
            if (song) {
              return (
                <div className='song-play' key={song._id} onClick={() =>
                  setCurrentSong({
                    link: song.audio_url,
                    image: song.image,
                    title: song.title,
                    songData: albumData,
                  }) }>
                    <div className='song-collect'>
                      <div className='first-data'>
                    <img className='song-images' src={albumData.image} alt={albumData.title} />
                     <p className='audio-title'>{song.title}</p>
                     </div>
                     <p>{artist.name}</p>
                  <p className='audio-title'>{song.mood}</p>
                  <p  className='play-btn'><PlayArrowIcon /></p>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      ))}
      </div>
    </div>
   
  );
};

export default AlbumDetails;
