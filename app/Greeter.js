// "use strict"
//
// const config = require('./config.json');
//
// module.exports = function (){
//     var greet = document.createElement('div');
//     greet.textContent = config.greetText;
//     return greet;
// }


import React, {Component} from 'react'
import config from './config.json';

class Greeter extends Component{
    render() {
        return (
            <h1>
                {config.greetText}
            </h1>
        );
    }
}

export default Greeter

































