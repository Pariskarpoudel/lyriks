/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const ref = useRef(null);
  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      // audio is inbuild component , audio component or element lai reference deko, + ref.current ,  input element ma ref depar, ref.current returns that referenced input element i.e <input value="" type="">, yo document.getelemtnt by query selector gare jasto vayo, aba i can manipulate my way
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);
  // activeSong?.hub?.actions[1]?.uri 
  return (
    <audio
      src={activeSong?.hub?.actions[1]?.uri || activeSong?.streaming?.preview}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
