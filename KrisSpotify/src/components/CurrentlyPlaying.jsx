import React, { useState, useEffect } from 'react';

const CurrentlyPlaying = ({ token }) => {
  const [currentTrack, setCurrentTrack] = useState(null);

  // Function to fetch the current song playing across all devices
  const fetchCurrentTrack = async () => {
    try {
      // Fetch the currently playing track from any active device
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          Authorization: `Bearer ${token}`,  // Pass the token in the Authorization header
        },
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();
        
        if (data.item) {
          // If a song is playing, update the state with the track details
          setCurrentTrack(data.item);
        } else {
          // If no song is playing (e.g., playback is paused), set track to null
          setCurrentTrack(null);
        }
      } else {
        // Handle error (e.g., no active playback)
        setCurrentTrack(null);
      }
    } catch (error) {
      console.error('Error fetching current track:', error);
    }
  };

  useEffect(() => {
    if (token) {
      // Fetch the currently playing song whenever the token is available
      fetchCurrentTrack();

      // Refresh the current track every 5 seconds
      const interval = setInterval(fetchCurrentTrack, 5000);
      return () => clearInterval(interval);  // Cleanup on component unmount
    }
  }, [token]);

  return (
    <div className="currently-playing">
      {currentTrack ? (
        <div>
          <h3>Now Playing:</h3>
          <p>{currentTrack.name} by {currentTrack.artists.map(artist => artist.name).join(', ')}</p>
          <img src={currentTrack.album.images[0].url} alt={currentTrack.name} />
        </div>
      ) : (
        <p>No song playing</p>
      )}
    </div>
  );
};

export default CurrentlyPlaying;
