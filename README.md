# react-tiny-audio-player

react-tiny-audio-player is an audio player component with process bar and process tip
</br>
based on the HTML 5 Audio Tag

## Installation

`npm install react-tiny-audio-player --save`

## Usage

```javascript

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TinyAudioPlayer from 'react-tiny-audio-player';

ReactDOM.render(<TinyAudioPlayer
    name='Metallica - Enter Sandman'
    source='https://upload.wikimedia.org/wikipedia/en/3/39/Metallica_-_Enter_Sandman.ogg'
    />, document.getElementById('root'));

```

## Development

    npm install
    npm start
