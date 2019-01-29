// React Import
import React, { Component } from 'react';
import './App.css';

// The components we're importing
import Canvas from './Canvas.js';
import EmojiDisplay from './EmojiDisplay.js';

// Our Random Emoji class
import Emoji from './Emoji.js';

// Our neural network package
import brain from 'brain.js';

class App extends Component {
  /**
   * Initializes the canvas size, the neural network,
   * our random-emoji class, and the state.
   */
  constructor() {
    super();

    // Canvas initialization
    this.canvasSize = 20;
    this.pixelSize = 4;

    this.net = new brain.NeuralNetwork();
    this.emoji = new Emoji();
    this.drawTotal = 3;

    this.state = {
      currentEmoji: this.emoji.getRandomEmoji(), // init with a randomly retrieved emoji
      trainingData: [], // the training data that we will build
      train: true, // we start in training mode
      modelGuessedEmoji: null, // the emoji that the model guesses
      drawNum: 0
    }
  }

  /**
   * When we call this class with input pixels, we add it to the
   * existing training data, train the nerual network on the new
   * data point, and then replace the emoji.
   * 
   * @param {Array} pixels An array of 1's and 0's representing filled pixels.
   */
  trainData = (pixels) => {

      // Build the output.
      const output = {};
      for (let e of this.emoji.getAllEmojis()) {
        if (e === this.state.currentEmoji) {
          output[e] = 1;
        } else {
          output[e] = 0;
        }
      }

      // Create the new set of training data and save it
      var trainingData = this.state.trainingData.slice();
      trainingData.push({
        input: pixels,
        output: { [this.state.currentEmoji]: 1}
      });
      if (this.state.drawNum === 2) {
        this.emoji.addSeenEmoji(this.state.currentEmoji);
        this.setState({
          trainingData: trainingData,
          currentEmoji: this.emoji.getRandomEmoji(),
          drawNum: 0
        });
      } else {
        this.setState((prevState) => {
          return {
            trainingData: trainingData,
            drawNum: prevState.drawNum + 1
          }
        });
      }
  }

  /**
   * Given a list of 1's and 0's representing our canvas,
   * we will run it through our network and set our highest
   * scoring emoji to the model guessed emoji.
   */
  runModel = (pixels) => {
      let results = this.net.run(pixels);
      console.log(results);

      // Find the highest scoring result.
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

  /**
   * Will toggle train between true/false
   */
  toggleRunTrain = () => {
    if (this.state.train) {
      // Train the neural network with new data
      this.net.trainAsync(this.state.trainingData, {log: true})
      .then(res => {
        console.log(res);
      })
      .catch(err =>
        // If we get an error display it in the output.
        this.setState({ 
          currentEmoji: <div id='error' style={{fontSize: '15px'}}>{err}</div>
      }));
    } else {
      this.net = new brain.NeuralNetwork()
    }
    this.setState((prevState) => {
      return {
        train: !prevState.train
      }
    })
  }

  /**
   * Resets the model guessed emoji to null.
   */
  reset = () => {
    this.setState({
      modelGuessedEmoji: null
    });
  }

  render() {
    var renderBody;

    if (this.state.train) {
      renderBody = (
        <div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Canvas onComplete={this.trainData} 
                    canvasSize={this.canvasSize} 
                    pixelSize={this.pixelSize}/>
            <EmojiDisplay emoji={this.state.currentEmoji}/>
          </div>
          <p>Draw this {this.drawTotal - this.state.drawNum} times!</p>
          <button onClick={this.toggleRunTrain}>Run your model</button>
      </div>);

    } else {
      renderBody = (
      <div>
        {this.state.modelGuessedEmoji === null &&
          <Canvas onComplete={this.runModel}
                  canvasSize={this.canvasSize}
                  pixelSize={this.pixelSize}/>
        }
        {this.state.modelGuessedEmoji !== null &&
          <div>
            <EmojiDisplay emoji={this.state.modelGuessedEmoji}/>
            <button onClick={this.reset}>Try Another!</button>
          </div>
        }
        <button onClick={this.toggleRunTrain}>Train your model</button>
      </div>);
    }
    return (
      <div className="App">
        <h1>Emoji Classifier</h1>
        <p>To draw, press the shift key and move your mouse over the canvas.</p>
        <br></br>
        { renderBody }
        <div>
          <p>The emojis we've trained so far:</p>
          {this.emoji.getSeenEmojis()}
        </div>
      </div>
    );
  }
}

export default App;
