import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';
import prevTrack from '../assets/prevtrack.png'
import nextTrack from '../assets/nexttrack.png'
import pause from '../assets/pause.png'
import play from '../assets/play.png'
import shuffle from '../assets/shuffle.png'
import repeat from '../assets/repeat.png'
import { getPlayer, getTrack } from '../services/mediaService';
import { useInterval } from 'usehooks-ts';

export default function MediaPlayer() {
  const [track, setTrack] = useState({
    author: 'author',
    title: 'title',
    album: 'album',
    cover: 'https://bulma.io/images/placeholders/1280x960.png',
    duration: 0,
    durationHuman: '',
    url: '',
    id: '',
    isVideo: 0,
    isAdvertisement: 0,
    inLibrary: 0
  })

  const [player, setPlayer] = useState({
    hasSong: 0,
    isPaused: 0,
    volumePercent: 0,
    seekbarCurrentPosition: 0,
    seekbarCurrentPositionHuman: '',
    statePercent: 0,
    likeStatus: '',
    repeatType: ''
  })

  const url = 'http://localhost:9863'

  useEffect(() => {
    const trackFetch = async () => {
      const trackData = await getTrack(url);
      setTrack({
        ...track,
        ...trackData
      });
    }
    trackFetch();
  }, [player])

  useInterval(() => {
    const playerFetch = async () => {
      const playerData = await getPlayer(url);
      setPlayer({
        ...player,
        ...playerData
      });
    }
    playerFetch();
  }, 100)

  function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }

  const currentDuration = `${Math.floor(track.duration*player.statePercent/60)}:${pad(Math.floor(track.duration*player.statePercent%60), 2)}`
  return(
    <div className='main is-flex is-flex-direction-column is-justify-content-center'>
      <br/>
      <h3 className="title is-3 is-flex is-justify-content-center">NowPlaying</h3>
      <div className="box">
      <div className="card-image">
        <figure className="image is-4by3 is-flex">
          <img src={track.cover} alt="Placeholder" />
        </figure>
      </div>
      <div className="card-content">
        <div className="content is-flex is-justify-content-center">
          {track.title}
        </div>
        <div className="content is-flex is-justify-content-center">
          {track.author} • {track.album}
        </div>
      </div>
      {currentDuration} / {track.durationHuman}
      <progress className="progress is-danger" value={(player.statePercent)*100} max="100">{(player.statePercent)*100}</progress>
      <nav className="level is-mobile">
        <div className="level-item has-text-centered">
          <div>
          <button className="button is-rounded is-danger"><img src={shuffle} width="15" height="15" alt="Shuffle"/></button>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
          <button className="button is-rounded is-danger"><img src={prevTrack} width="15" height="15" alt="Previous"/></button>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
          <button className="button is-rounded is-danger"><img src={player.isPaused ? play : pause} width="15" height="15" alt="Play/Pause"/></button>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
          <button className="button is-rounded is-danger"><img src={nextTrack} width="15" height="15" alt="Next"/></button>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
          <button className="button is-rounded is-danger"><img src={repeat} width="15" height="15" alt="Repeat"/></button>
          </div>
        </div>
      </nav>
      </div>
    </div>
  )
}