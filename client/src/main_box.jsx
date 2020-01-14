import React from 'react';
import './App.css';
import Navbar from './Navbar';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {text:'signin',
                  class:'users_box',
                  sign_up_class:'',
                  component_name:'',
                  user:'nothing'
                };

    fetch("http://localhost:3000/tops")
      .then(response => response.json())
      .then(user => this.setState({user}));

  }

  handleClick(name){
    this.setState({component_name:name});
  }


  render(){
    console.log(this.state.user);
    const user = this.state.user
    if (user !== 'nothing'){
      return(
        <div>
          <div className={this.state.class}>
            <h5 className='subtittle_sub2'>look for people</h5>
          </div>
          <div className ='index_list'>
            <ul>
              <li>
                <a href='/meet'> share shareでroom share</a>
              </li>
              <li>
                <a href='/'> share shareとは</a>
              </li>
            </ul>
          </div>
        </div>
      )
    }else{
    return (
      <div>
        <div className={this.state.class}>
          <ul>
            <li onClick={()=>{this.handleClick('')}}>sign up</li>
            <li onClick={()=>{this.handleClick('sign_up_box')}}>{this.state.text}</li>
          </ul>
        </div>
        <div className ='index_list'>
          <ul>
            <li>
              <a href='/meet'> share shareでroom share</a>
            </li>
            <li>
              <a href='/'> share shareとは</a>
            </li>
          </ul>
        </div>
      </div>
    );
    }
  }
};

export default App;
