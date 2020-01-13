import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {text:'signin',
                  class:'users_box'};
    // this.state = { count: 0};

    // fetch("http://localhost:3000/tops")
    //   .then(response => response.json())
    //   .then(users => this.setState({ users }));

  }

  handleClick(name){
    this.setState({class:name});
  }


  render(){
    return (
      <div>
        <div className={this.state.class}>
          <ul>
            <li onClick={()=>{console.log('hello')}}>sign up</li>
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
}};

export default App;
// .users_box
//   ul
//     if user === undifined
//       li
//         a(href='/users') sign up
//       li
//         a(href='/signin') log in
//
//   if user === undifined
//       h2.subtittle_sub1
//         a(href="/meet") look for people
//   if user
//     h5.subtittle_sub2
//       a(href="/meet") look for people
//
// .index_list
//   ul
//     li
//       a(href='/meet') share shareでroom share
//     li
//       a(href='/') share shareとは
