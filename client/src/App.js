import React from 'react';
import './App.css';


class App extends React.Component{
render(){
  return (
    <div className="top_contents">
      <div className='tittle_area'>
        <h2 className='tittle'><a href='/home'> share share </a></h2>
        {console.log('hello')}
        <p className='subtittle'>
          Let's share room together!
        </p>

        <main_box />

      </div>
    </div>
  );
}}

export default App;
