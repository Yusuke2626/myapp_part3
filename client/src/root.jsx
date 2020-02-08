// import React from "react";
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Main_box from './main_box';
import MyProfile from './myProfile';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {top_contentsOpen:true,
                  myProfileOpen:false,
                  lookForPeopleOpen:false,
                  messageAreaOpen:false,
                  likesUserId:0,
                  something:'hello'}

    fetch("http://localhost:3000/tops",{mode: 'cors'})
      .then(response => response.json())
      .then(user => this.setState({user}));
  }

  clickFuncTopContents(){
    this.setState({top_contentsOpen:false});
  }
  handleClick(){
    this.setState({myProfileOpen:true})
  }
  handleClickLookForPeople(){
    this.setState({lookForPeopleOpen:true,myProfileOpen:false})
  }
  likeUserBtnOn(userId){
    console.log('likeuserOk',userId);
    // this.setState({likesUserId:userId})
  // }
  // postLikes(){
    fetch('http://localhost:3000/meet/like', {
      method: 'POST',
      mode: 'cors' ,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      like_user_id: userId
      }),

    });
    console.log('ok');
  };




  render() {
    var user = this.state.user;
    var cursorstyle = {cursor:'pointer'};
    const top_contents = (<div className="top_contents" >
                            <div className='tittle_area'>
                              <h2 className='tittle'><a href='/home'> share share </a></h2>
                              {console.log('hello')}
                              <p className='subtittle'>
                                Let's share room together!
                              </p>
                              <Main_box clickLookforPeople={()=>{this.clickFuncTopContents();}} />

                            </div>
                          </div>);
    if(this.state.top_contentsOpen){
      return (
        <div className='contents' >
          {top_contents}
        </div>
      );
    }else if(this.state.myProfileOpen){
      return(
        <div>
          <h3>share shareでルームメイトを見つけよう </h3>
          <h4 style={cursorstyle} onClick={()=>{this.handleClickLookForPeople()}}> look for people</h4>
          <div className='contents2' >
            < MyProfile />
          </div>
        </div>
    );
  }else if(this.state.lookForPeopleOpen){

      console.log('root_login_user',user[0]);
      console.log('root_login_user_name',user[0].name);
      console.log('root_login_user_profile_area',user[1].area);
      console.log('all_user',user);

      var users = user
      var profile = user[1];
      var user = user[0];

      var users = users.filter(n => n !== users[0] && n!==users[1]);
      var users = users.filter(n => n.id !== user.id)
      var num = 0;
      var index_num = 999;
      var partner_block = [];

      for(var u of users){var current_num = index_num - num;
                          partner_block.push(
                          <div className='panel_partner' style={{zIndex:{current_num}}}>
                            <p> Name: {u.name}</p>
                            <div className='image_area'>
                              <img src={u.img}/>
                            </div>
                            <div className='prof_list'>
                              <p className='list'> よろしく </p>
                              <p className='list'> 旅行 </p>
                              <p className='list'> ▽ </p>
                            </div>
                            <div className='btn_area'>
                            </div>
                          </div>)
                          var num = num+1;}

      return(
        <div>
          <h3>share shareでルームメイトを見つけよう </h3>
          <h4 style={cursorstyle} onClick={()=>{this.handleClick()}}> my_profile</h4>
          <div className='contents2' >
            <div className='self_area'>
              <div className='panel_self'>
                <p> your profile</p>
                <p>Name:{user.name}</p>

                <div className='image_area_self'>
                  <img className='my_img' src={user.img}/>
                </div>
                <p> area:{profile.area}</p>
              </div>
            </div>
            <div className='partner_area'>
            {partner_block}
              <div className='add_cards'>
                <p>No User</p>
              </div>
            </div>
          </div>
        </div>
      );
    }else if(this.state.messageAreaOpen){

    }
    else{
        console.log('root_login_user',user[0]);
        console.log('root_login_user_name',user[0].name);
        console.log('root_login_user_profile_area',user[1].area);
        console.log('all_user',user);
        console.log('allprofile',user[2]);
        console.log('user[3]',user[3]);
        console.log('user[3]',user[4]);

        var users = user
        var profile = user[1];
        var allProfile = user[2];
        var user = user[0];
        console.log('login_user_profile',profile);
        console.log('login_user_profile',profile.hobby);
        console.log('checktheSetstate',this.state.something);


        var users = users.filter(u => u !== users[0] && u!==users[1] && u!==users[2]);
        var users = users.filter(u => u.id !== user.id)
        var num = 0;
        var index_num = 999;
        var partner_block = [];

        var userProfile = allProfile.filter(p=>p.user_id===33)
        // console.log('profilecheck0',userProfile[0].hobby);
        console.log('userslength',users);
        console.log(profile);
        console.log('allprofilecheck2',allProfile);
        if(users.length !== 0){
          for(var u of users){
                                var current_num = index_num - num;
                                var userProfile = allProfile.find((p)=>p.user_id ===u.id);
                                console.log('user_id',u.id);
                                if(userProfile){
                                  console.log('profilecheck',userProfile.hobby)
                                  var userHobby = userProfile.hobby
                                  var userArea = userProfile.area };
                                console.log(index_num);
                                console.log('current_num',current_num);
                                partner_block.push(
                                  <div className='panel_partner' style={{zIndex:{current_num}}}>
                                    <p> Name: {u.name}</p>
                                    <div className='image_area'>
                                      <img src={u.img}/>
                                    </div>
                                    <div className='prof_list'>
                                      <p className='list'> area:{userArea} </p>
                                      <p className='list'> hobby:{userHobby} </p>
                                      <p className='list'> ▽ </p>
                                    </div>
                                    <div className='btn_area'>
                                      <p className='good' onClick={()=>{this.likeUserBtnOn(u.id)}}>good</p>
                                      <p className='next'>next</p>
                                    </div>
                                  </div>)
                                var num = num+1;
        }
      }

        return(
          <div>
            <h3>share shareでルームメイトを見つけよう </h3>
            <h4 style={cursorstyle} onClick={()=>{this.handleClick()}}> my_profile</h4>
            <div className='contents2' >
              <div className='self_area'>
                <div className='panel_self'>
                  <p> your profile</p>
                  <p>Name:{user.name}</p>
                  <div className='image_area_self'>
                    <img className='my_img' src={user.img}/>
                  </div>
                  <p>area:{profile.area}</p>
                </div>
              </div>
              <div className='partner_area'>
              {partner_block}
                <div className='add_cards'>
                  <p>No User</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
  }
}
