import React from 'react';
import './App.css';
import SignInForm from './signInForm';
import SignUpForm from './signUpForm';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {text:'signin',
                  class:'users_box',
                  sign_up_class:'',
                  component_name:'',
                  user:'nothing',
                  ulclass:'',
                  signInFormOpen:false,
                  signUpFormOpen:false
                };

    fetch("http://localhost:3000/tops")
      .then(response => response.json())
      .then(user => this.setState({user}));

  }

  handleClickAndSignIn(name,hidden){
    this.setState({class:name,ulclass:hidden,signInFormOpen:true});
    console.log(this.state.class,this.state.ulclass);
  }
  handleClickAndSignUp(name,hidden){
    this.setState({class:name,ulclass:hidden,signUpFormOpen:true});
    console.log(this.state.class,this.state.ulclass);
  }


  render(){
    console.log(this.state.ulclass);
    const user = this.state.user;
    const signInForm  =   < SignInForm />;
    const signUpForm  =   < SignUpForm />;

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
    }else if(this.state.signInFormOpen){
      return(
        <div>
          <div className={this.state.class}>
            {signInForm}
          </div>
          <div className ='index_list'>
            <ul>
              {console.log(this.state.ulclass)}
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
    }else if(this.state.signUpFormOpen){
      return(
        <div>
          <div className={this.state.class}>
            {signUpForm}
          </div>
          <div className ='index_list'>
            <ul>
              {console.log(this.state.ulclass)}
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
      return(
        <div>
          <div className={this.state.class}>
            <ul className ={this.state.ulclass}>
              <li  onClick={()=>{this.handleClickAndSignUp('signUpBox','hidden')}}>sign up</li>
              <li  onClick={()=>{this.handleClickAndSignIn('signUpBox','hidden')}}>{this.state.text}</li>
            </ul>
          </div>
          <div className ='index_list'>
            <ul>
            {console.log(this.state.ulclass)}
              <li>
                <a href='/meet'>share shareでroom share</a>
              </li>
              <li>
                <a href='/'>share shareとは</a>
              </li>
            </ul>
          </div>
        </div>
    );
    }
  }
};

export default App;
