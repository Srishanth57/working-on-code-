// components/MusicPage.tsx
import React, { useRef } from 'react';

const sounds = [
  { name: 'Birds', file: 'birds.mp3' },
  { name: 'Bubbles', file: 'bubbles.mp3' },
  { name: 'Cafe', file: 'cafe.mp3' },
  { name: 'Campfire', file: 'campfire.mp3' },
  { name: 'Crickets', file: 'crickets.mp3' },
  { name: 'Rain', file: 'rain.mp3' },
  // Add more sounds as needed
];

export const MusicPage: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = (fileName: string) => {
    if (audioRef.current) {
      audioRef.current.src = `${process.env.PUBLIC_URL}/sounds/${fileName}`;
      audioRef.current.play();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Listen to the Music and Enjoy ❤️</h2>
      <p className="text-gray-600 mb-6">Listen to ambient sounds to improve your mood :</p>
      
      <div className="grid grid-cols-3 gap-4">
        {sounds.map((sound) => (
          <button
            key={sound.name}
            onClick={() => playSound(sound.file)}
            className="p-4 rounded-lg border text-gray-700 hover:bg-gray-100"
          >
            {sound.name}
          </button>
        ))}
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} />
    </div>
  );
};
