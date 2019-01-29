import React, { Component } from 'react';

export default class EmojiDisplay extends Component {
    render() {
        return(
            <div>
                <span style={{fontSize: '80px' }} role="img" aria-label="heart-eyes">{this.props.emoji}</span>
            </div>
        );
        
    }
}