import React, { Component } from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import './App.css';

const particlesOptions = {
  "particles": {
      "number": {
          "value": 75,
          density: {
            enable: true,
            value_area: 800
          }
      },
      "size": {
          "value": 4
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

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState( { user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (response) => {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayfaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch('https://dry-reef-41263.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then( response => response.json())
      .then((response) => {
        fetch('https://dry-reef-41263.herokuapp.com/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(res => res.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}));
          })
          .catch(console.log)
        
          this.displayfaceBox(this.calculateFaceLocation(response))})
      .catch(error => console.log(error));
  }

  onRouteChange = (route) => {
    if(route ==='signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  render() {
    const {isSignedIn, imageUrl, route, box, user} = this.state;
    return (
      <div className="App">
        <Particles 
          className = 'particles'
          params={particlesOptions}
        />
        <Navigation onRouteChange = {this.onRouteChange} isSignedIn = { isSignedIn } />
        { route === 'home' 
        ?
        <div> 
            <Logo />
            <Rank
                name={user.name}
                entries={user.entries}
            />
            <ImageLinkForm 
                onInputChange = { this.onInputChange }  
                onButtonSubmit = { this.onButtonSubmit }  
            />
            <FaceRecognition imageUrl = {imageUrl} box = { box } />
        </div>
        : (
          route === 'signin'
          ?
          <div>
            <Logo />
            <SignIn onRouteChange = { this.onRouteChange } loadUser = { this.loadUser } />
          </div>
          :
          <div>
            <Logo />
            <Register onRouteChange = { this.onRouteChange } loadUser = { this.loadUser } />
          </div>
        )}
      </div> 
    );
  }
}

export default App;
