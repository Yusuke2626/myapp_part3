import React from 'react';
import './App.css';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {name:"ユーザー名を入力 ",
                  password:"パスワードを入力",
                  email:'emailを入力',
                  img:'画像'};

      console.log('loginuser',this.state.user);
}
    post_signup(){
     fetch('http://localhost:3000/users', {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         name: this.state.username,
         password: this.state.password,
         email:this.state.email,

       }),

     });
     console.log('ok');
     window.location="/home";

   };

  render(){
    return(
    <div>
      <div className='sign_up_form' >

          <p> username</p>
          <input type="text" name="name" value={this.state.username}
                      onChange={(e) => this.setState({username: e.target.value})}/>
          <p> password</p>
          <input type="text" name="password" value={this.state.password}
                      onChange={(e) => this.setState({password: e.target.value})}/>
          <p> email</p>
          <input type="text" name="email" value={this.state.email}
                      onChange={(e) => this.setState({email: e.target.value})}/>



          <button onClick={()=> {this.post_signup()}}> send</button>


      </div>
    </div>
    )
  }
};

export default App;
