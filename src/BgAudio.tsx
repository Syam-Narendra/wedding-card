import { useEffect } from 'react';

const BackgroundMusic = () => {
  useEffect(() => {
    const audio = new Audio('path_to_wedding_music.mp3');
    audio.loop = true;
    audio.play();
  }, []);

  return null;
};
export default BackgroundMusic;