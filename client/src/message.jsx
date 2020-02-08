import React from 'react';
import './App.css';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {data:'nothing'};

    fetch("http://localhost:3000/mypage")
      .then(response => response.json())
      .then(data => this.setState({data}));
    }



  render(){
    var user = this.state.data[0];
    var profile = this.state.data[1];
    var meet_people = this.state.data[2];

    console.log(meet_people);
    console.log('myProfile',profile);
    console.log('myprofile_user',user);

    var meet_people_block = [];
    for(var u of meet_people){
      meet_people_block.push(
        <img className='people_img' src={u.img} />
      )
    }

    return(
    <div>
      <div className='partner_profile_area' >
        <p>partner_name</p>
        <img className='people_img' src=''/>
        <p>profile.area</p>
      </div>
      <div className='message_area'>
        <p>each message</p>
        <input className='message_input'/>
      </div>

    </div>
    )
  }
};


export default App;
