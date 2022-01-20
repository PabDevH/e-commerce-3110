import React, { Component } from 'react';

export class ClassComponent extends Component {
    
    render() {
        const {name, edad} = this.props;
        return (
            <div>
                <h1>Class Component {name}</h1>
                <h2>Edad: {edad}</h2>
            </div>
        );
    }
};