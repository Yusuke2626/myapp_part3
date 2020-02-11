import React from 'react';
import './App.css';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.childRef = React.createRef();
    this.state = {data:'nothing',
                  likeUserId:0,
                  value:0,
                  text:'テキストを入力',
                  userId:0};

    fetch("http://localhost:3000/mypage")
      .then(response => response.json())
      .then(data => this.setState({data}));
    }


    postMessage(){

      fetch('http://localhost:3000/partner',{
        method: 'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type':'application/json',
        },
         body: JSON.stringify({
          text:this.state.text,
          user_id:this.state.userId,

        }),
      },
      fetch("http://localhost:3000/mypage")
        .then(response => response.json())
        .then(data => this.setState({data}))
      )
      console.log('ok');
    };


  render(){
    var user = this.state.data[0];
    var profile = this.state.data[1];
    var meet_people = this.state.data[2];
    var messages = this.state.data[3];

    console.log(meet_people);
    console.log('myProfile',profile);
    console.log('myprofile_user',user);
    console.log('value',this.props.likeUserId);
    console.log('alldata',this.state.data[2]);
    var partnerUserId = this.props.likeUserId;
    var likeUsers = this.state.data[2];
    console.log(likeUsers);
    console.log('likeUsers.length',likeUsers.length);
    console.log(this.state.data[3]);

    // var partnerUser = likeUsers[0].filter(u=>u.id ===partnerUserId)
    if(Array.isArray(messages)){
      var messages = messages.filter(m=>m.to_user_id === partnerUserId || m.user_id===partnerUserId)
      // var messages = messages.filter(m=>m.user_id===partnerUserId)
    }
    if(likeUsers.length>1){
      var partnerUser = likeUsers.filter(u=>u.id ===partnerUserId)[0]
    }else{
      var partnerUser = likeUsers[0]
    }

    console.log('partnerUser',partnerUser);
    console.log('messages',messages);

    return(
    <div>
      <div className='partner_profile_area' >
        <p>{partnerUser.name}</p>
        <img className='people_img' src={partnerUser.img}/>
        <p>profile.area</p>
      </div>
      <div className='message_area'>
        <p>each message</p>
      </div>
      <input type="text"  className='message_input' name='text' value={this.state.text} onChange={(e) => this.setState({text: e.target.value,userId:partnerUser.id})}/>
      <input type='submit' value='送信' className='message_submit' style={{margin: 5,width:200}} onClick={()=>{this.postMessage()}}/>
    </div>
    )
  }
};


export default App;
