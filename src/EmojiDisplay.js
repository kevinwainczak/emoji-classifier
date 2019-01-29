import React, { Component } from 'react';

export default class EmojiDisplay extends Component {
    render() {
        return(
            <div style={{width: '252px'}}>
            <span style={{fontSize: '120px' }} role="img" aria-label="heart-eyes">{this.props.emoji}</span>
        </div>
        );
        
    }
}