import React, { Component } from 'react';
import Pixel from './Pixel.js';

export default class Canvas extends Component {
    constructor(props) {
        super(props);
        this.pixelSize = props.pixelSize;
        this.canvasSize = props.canvasSize;
        this.state = {
            pixels: new Array(this.canvasSize * this.canvasSize).fill(0),
            canComplete: false
        }
    }

    fillPixel = (x,y) => {
        this.setState(function (prevState) {
            prevState.pixels[y * this.canvasSize + x] = 1;
            return {
                pixels: prevState.pixels,
                canComplete: true
            }
        })
    }

    createCol = (size, y) => {
        let row = [];
        for (let x = 0; x < size; x++) {
            row.push(<Pixel 
                        key={`y-${y} x-${x}`}
                        size={this.pixelSize}
                        row={y} 
                        col={x} 
                        fillPixel={this.fillPixel} 
                        filled={this.state.pixels[y*size + x]} />);
        }
        return row;
    }

    createCanvas = () => {
        let rows = [];
        for (let y = 0; y < this.canvasSize; y++) {
            rows.push(<div key={`y-${y}`} style={{display: 'flex', flexDirection: 'row'}}>{this.createCol(this.canvasSize, y)}</div>);
        }
        return rows;
    }

    finishDrawing = () => {
        this.props.onComplete(this.state.pixels);
        this.setState({
            pixels: new Array(this.canvasSize * this.canvasSize).fill(0)
        })
    }

    render () {
        return (
            <div>
                <div style={{ border: '1px solid black', width: 'fit-content', margin: 'auto'}}>
                    {this.createCanvas()}
                </div>
                { this.state.canComplete && <button onClick={this.finishDrawing}>Done!</button>}
            </div>
        );
    }
}