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
      <div className='profile_area' >
        <h5>myprofile</h5>
        <div className='panel_self'>
          <p>Name:{user.name}</p>
          <div className='image_area_self'>
            <img src={user.img} />
          </div>
        </div>
        <div className='description'>
          {profile.area? <p>area:{profile.area}</p> : <p>area: </p> }
          {profile.hobby? <p>hobby:{profile.hoby}</p>   : <p>hobby: </p>}
          {profile.comment? <p>comment:{profile.comment}</p>  : <p>comment:</p>}
          {profile.num_of_people_min? <p> 希望 人数 : {profile.num_of_people_min} ~ {profile.num_of_people_max}</p>  : <p> 希望 人数 :  ~ </p>}
          {profile.expect_area? <p> 希望 エリア :  {profile.expect_area}  </p> : <p> 希望 エリア :   </p>}
          {profile.price_of_rent? <p> 希望 家賃負担 :  {profile.price_of_rent}  </p> :  <p> 希望 家賃負担 : </p>}
        </div>
      </div>
      <div className='matching_people'>
        <h5>Matching People</h5>
        <div className='matching_people_block'>
          {meet_people_block}
        </div>
      </div>
    </div>
    )
  }
};


export default App;
