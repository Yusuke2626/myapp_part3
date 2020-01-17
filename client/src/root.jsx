// import React from "react";
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { BrowserRouter, Route } from "react-router-dom";
import Navbar from './Navbar';
import About from './About';
import Home from './App';
import Main_box from './main_box';


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="top_contents">
        <div className='tittle_area'>
          <h2 className='tittle'><a href='/home'> share share </a></h2>
          {console.log('hello')}
          <p className='subtittle'>
            Let's share room together!
          </p>
          <Main_box />

        </div>
      </div>

    );
  }
}
// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
//
//
// function App() {
//   return (
//     <div className="top_contents">
//         <h2> share share </h2>
//         {console.log('hello')}
//         <p>
//           aaaaaEdit and save to reload.aaaa
//         </p>
//
//
//
//     </div>
//   );
// }
//
// export default App;
// import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Navbar from './Navbar';
// import About from './About';
// import Home from './Home';
//
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <Router>
//           <div>
//             <Navbar /><hr/>
//             <Route exact path='/' component={Home}/>
//             <Route path='/About' component={About}/>
//           </div>
//         </Router>
//       </div>
//     );
//   }
// }
//
// export default App;
