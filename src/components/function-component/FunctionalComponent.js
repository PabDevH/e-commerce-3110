import React, { Component , useState} from 'react';

const FunctionalComponent = (props) => {
    const {name,edad} = props;
    
    return (
        <div>
            <h1>Functional Component {name}</h1>
            <h2>Cantidad: {edad}</h2>
        </div>
    );
}

export default FunctionalComponent;