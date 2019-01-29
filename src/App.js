import React, { Component } from 'react';
import './App.css';
import Canvas from './Canvas.js';
import EmojiDisplay from './EmojiDisplay.js';
import brain from 'brain.js';
import Emoji from './Emoji.js';

class App extends Component {

  constructor() {
    super();
    this.canvasSize = 50;
    this.pixelSize = 4;
    this.net = new brain.NeuralNetwork({ hiddenLayers: [2500, 3000, 2500]});
    this.emoji = new Emoji();
    this.state = {
      currentEmoji: this.emoji.getRandomEmoji(),
      trainingData: [],
      train: true,
      modelGuessedEmoji: null
    }
  }

  trainData = (pixels) => {
    if (this.state.train) {
      var trainingData = this.state.trainingData.slice();
      const output = {};
      for (let e of this.emoji.getAllEmojis()) {
        if (e === this.state.currentEmoji) {
          output[e] = 1;
        } else {
          output[e] = 0;
        }
      }
      trainingData.push({
        input: pixels,
        output: output
      });
      this.setState({
        trainingData: trainingData
      });
      this.net.trainAsync(trainingData, {log: true})
      .then(res => {
        console.log(res);
        this.setState({
          currentEmoji: this.emoji.getRandomEmoji()
        });
      })
    } else {
      let results = this.net.run(pixels);
      console.log(results);
      let highestSeen = 0;
      let highestEmoji = null;
      for (let key in results) {
        if (results[key] > highestSeen) {
          highestSeen = results[key];
          highestEmoji = key;
        }
      }
      this.setState({
        modelGuessedEmoji: highestEmoji
      });
    }

  }

  toggleRunTrain = () => {
    this.setState((prevState) => {
      return {
        train: !prevState.train
      }
    })
  }

  render() {
    var emojiToDisplay = this.state.train ? this.state.currentEmoji : this.state.modelGuessedEmoji
    return (
      <div className="App">
        <h1>Emoji Classifier</h1>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <Canvas onComplete={this.trainData} 
                  canvasSize={this.canvasSize} 
                  pixelSize={this.pixelSize}/>
          <EmojiDisplay emoji={emojiToDisplay}/>
        </div>
        { this.state.train &&
          <button onClick={this.toggleRunTrain}>Run your model</button>
        }
        {
          !this.state.train &&
          <button onClick={this.toggleRunTrain}>Train your model</button>
        }
      </div>
    );
  }
}

export default App;
