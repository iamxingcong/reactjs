import React from 'react';

import './App.css';

import { add } from './pg/math.js';

import OtherComponent from './pg/OtherComponent';


console.log(add(16, 26)); // 42



function App() {
  return (
    <div className="App">
	 	<OtherComponent />
    	
       
     	 <h1> 上面是react js 文件引用的形式，可以了解下，很方便呢 ，是不是</h1>
    
    </div>
  );
}

export default App;
