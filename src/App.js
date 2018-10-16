import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import './App.css';


const app = new Clarifai.App({
  apiKey: '03672e2b325a49deb349cfe40287d0d7'
 });

const particleOptions ={
          particles: {
            number:{
              value:50,
              density: {
                enable:true,
                value_area:800
              }
            },
          }, 
        }
      

class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }

  calculateFaceLocation =(data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height)
    console.log(clarifaiFace)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }

  }

  displayFaceBox = (box) => {
    this.setState({ box:box });
    console.log(box)
  }
 
  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({isSignedIn:false})
    }else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route: route})
  }

  onInputChange=(e)=>{
    this.setState({input: e.target.value})
  }

  onButtonSubmit =()=>{
    this.setState({imageUrl:this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
     .catch(err => console.log(err))
    
  }

  render() {
    const {box, isSignedIn, route, imageUrl } = this.state
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        {route === 'home'  
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}  
              />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          
          : (
            route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;