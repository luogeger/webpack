// const greeter = require('./Greeter')
// document.getElementById("root").appendChild(greeter());

import React from 'react';
import {render} from 'react-dom';
import './main.css';//使用require导入css文件
import Greeter from './Greeter';

render(<Greeter />, document.getElementById('root'));
