import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TinyAudioPlayer from './src/TinyAudioPlayer';

ReactDOM.render(<TinyAudioPlayer
    source={"https://a.tumblr.com/tumblr_moq4pcJ2m71rm6176o1.mp3"}
    />, document.getElementById('root'));