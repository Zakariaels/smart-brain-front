import React, { Component } from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';

import './App.css';

const particlesoptions = {
  "particles": {
      "number": {
          "value": 70,
      },
      "size": {
          "value": 3
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles 
          className = 'particles'
          params={particlesoptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
         { /*<Facerecognition />
        */}
      </div>
    );
  }
}

export default App;
