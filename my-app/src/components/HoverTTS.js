// HoverTTS.js
import React from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const HoverTTS = ({ text }) => {
  const { speak } = useSpeechSynthesis();

  const handleHover = () => {
    speak({ text });
  };

  return <span onMouseEnter={handleHover}>{text}</span>;
};

export default HoverTTS;
