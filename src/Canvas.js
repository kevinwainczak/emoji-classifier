import React, { Component } from 'react';
import Pixel from './Pixel.js';

/**
 * This function coordinates many Pixel components and keeps track of which
 * pixels should be filled in by marking them as a 1 or a 0 in a 1D array.
 */
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

    /**
     * This function should be called with the x,y coordinates
     * of the pixel that will be filled.
     */
    fillPixel = (x,y) => {
        this.setState(function (prevState) {
            prevState.pixels[y * this.canvasSize + x] = 1;
            return {
                pixels: prevState.pixels,
                canComplete: true
            }
        })
    }

    /** This function returns an array of the Pixel component,
     *  which represents one row of the canvas. 
     * 
     * @param {int} size represents how many pixels should be in the row.
     * @param {int} y represents the y coordinate of the row.
     */
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

    /**
     * This function creates a canvas of pixels, which is a 2D array
     * of Pixel components. The canvas is a square, with the row and
     * column size equaling the value of this.size.
     */
    createCanvas = () => {
        let rows = [];
        for (let y = 0; y < this.canvasSize; y++) {
            rows.push(<div key={`y-${y}`} style={{display: 'flex', flexDirection: 'row'}}>{this.createCol(this.canvasSize, y)}</div>);
        }
        return rows;
    }

    /**
     * This function should be triggered when a drawing is complete
     * and will call the onComplete function that is passed in as a prop.
     * It will also reset the array to all 0's.
     */
    finishDrawing = () => {
        this.props.onComplete(this.state.pixels);
        this.clearCanvas();
    }

    /**
     * This function resets the canvas by setting the array to all 0's.
     */
    clearCanvas = () => {
        this.setState({
            pixels: new Array(this.canvasSize * this.canvasSize).fill(0),
            canComplete: false
        });
    }

    render () {
        return (
            <div>
                <div style={{ border: '1px solid black', width: 'fit-content', margin: 'auto'}}>
                    {this.createCanvas()}
                </div>
                <button onClick={this.clearCanvas}>Clear</button>
                { this.state.canComplete && <button onClick={this.finishDrawing}>Done!</button>}
            </div>
        );
    }
}