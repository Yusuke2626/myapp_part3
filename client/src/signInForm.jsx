import React from 'react';
import './App.css';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {username:"ユーザー名を入力 ",
                  password:"パスワードを入力",
                  user:'nothing'};

    // fetch("http://localhost:3000/")
    //   .then(response => response.json())
    //   .then(user => this.setState({user}));

      console.log('loginuser',this.state.user);
}
    post_signin(){
     fetch('http://localhost:3000/signin', {
       method: 'POST',
       mode: 'cors' ,
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         username: this.state.username,
         password: this.state.password,
       }),

     });
     console.log('ok');
     window.location="/home";
     // window.location="/home";
   };






  render(){
    return(
    <div>
      <div className='sign_up_form' >
          <p> username</p>
          <input type="text" name="username" value={this.state.username}
                      onChange={(e) => this.setState({username: e.target.value})}/>
          <p> password</p>
          <input type="text" name="password" value={this.state.password}
                      onChange={(e) => this.setState({password: e.target.value})}/>

          <button onClick={()=> {this.post_signin()}}> send</button>
      </div>
    </div>
    )
  }
};

export default App;
