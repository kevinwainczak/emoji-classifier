import React, { Component } from 'react';

export default class Pixel extends Component {

    constructor() {
        super();
        this.elemRef = React.createRef();
    }

    handleMouseEvent = (event) => {
        if (event.shiftKey) {
            this.props.fillPixel(this.props.col, this.props.row);
        }
    }
    
    componentDidMount = () => {
        this.elemRef.current.addEventListener('mousemove', this.handleMouseEvent);
    }

    componentWillUnmount = () => {
        this.elemRef.current.removeEventListener('mousemove', this.handleMouseEvent);
    }

    render() {
        if (this.props.filled) {
            return <div ref={this.elemRef} style={{width: `${this.props.size}px`, height: `${this.props.size}px`, background: 'black'}} />
        } else {
            return <div ref={this.elemRef} style={{width: `${this.props.size}px`, height: `${this.props.size}px`}} />
        }
    }
}