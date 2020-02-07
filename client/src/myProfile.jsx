import React from 'react';
import './App.css';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {data:'nothing',
                  inputArea:false,
                  area:'area',
                  hobby:'hobby',
                  rent:'rent',
                  expect_area:'area',
                  display:'none',
                  num:'num'};

    fetch("http://localhost:3000/mypage")
      .then(response => response.json())
      .then(data => this.setState({data}));
    }

    handleClick(n){
      this.setState({num:n});
      console.log(this.state.num);
    }
    areaChange(e){
      var inputValue = e.target.value;
      this.setState({area:inputValue});

    }
    hobbyChange(e){
      var inputValue = e.target.value;
      this.setState({hobby:inputValue});
    }
    postMyprofile(){
      fetch('http://localhost:3000/mypage',{
        method: 'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type':'application/json',
        },
         body: JSON.stringify({
          area:this.state.area,
          hobby:this.state.hobby,

          user_id:this.state.data[0].id
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


    console.log(meet_people);
    console.log('myProfile',profile);
    console.log('myprofile_user',user);

    var meet_people_block = [];
    for(var u of meet_people){
      meet_people_block.push(
        <a href='/home'><img className='people_img' src={u.img} /></a>
      )
    }
    var inputStyle = this.state.display;
    console.log('inputStyle', inputStyle);

    var num = this.state.num;
    console.log(num);

    var inputName = `this.state.` +this.state.inputName;
    console.log(inputName);
    var inputArea = this.state.inputArea;

    /////mapで作る////////
    var inputAreaBlock = (<div><input style={{margin:5, width:200}} value={this.state.area}
                            onChange={(e)=>{this.areaChange(e)}}></input>
                            <input type='submit' value='変更' style={{margin: 5,width:200}} onClick={()=>{this.postMyprofile()}}></input></div> );
    var inputAreaBlock2 = (<div><input style={{margin:5, width:200}} value={this.state.hobby}
                            onChange={(e)=>{this.hobbyChange(e)}}></input>
                            <input type='submit' value='変更' style={{margin: 5,width:200}} onClick={()=>{this.postMyprofile()}}></input></div> );
    var inputAreaBlock3 = (<div><input style={{margin:5, width:200}} value={this.state.comment}
                            onChange={(e)=>{this.hobbyChange(e)}}></input>
                            <input type='submit' value='変更' style={{margin: 5,width:200}} onClick={()=>{this.postMyprofile()}}></input></div> );
    var inputAreaBlock4 = (<div><input style={{margin:5, width:200}} value={this.state.hobby}
                            onChange={(e)=>{this.hobbyChange(e)}}></input>
                            <input type='submit' value='変更' style={{margin: 5,width:200}} onClick={()=>{this.postMyprofile()}}></input></div> );
    var inputAreaBlock5 = (<div><input style={{margin:5, width:200}} value={this.state.hobby}
                            onChange={(e)=>{this.hobbyChange(e)}}></input>
                            <input type='submit' value='変更' style={{margin: 5,width:200}} onClick={()=>{this.postMyprofile()}}></input></div> );
    var inputAreaBlock6 = (<div><input style={{margin:5, width:200}} value={this.state.expect_area}
                            onChange={(e)=>{this.hobbyChange(e)}}></input>
                            <input type='submit' value='変更' style={{margin: 5,width:200}} onClick={()=>{this.postMyprofile()}}></input></div> );






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
            <p style={{margin:0,fontSize:6}}>クリックで編集</p>
            {profile.area? <p style={{cursor:'pointer'}} onClick={()=>{this.handleClick(1)}}>area:{profile.area}</p> : <p style={{cursor:'pointer'}} onClick={()=>{this.handleClick(1)}}>area: areaを入力 </p> }
            {num===1? <div>{inputAreaBlock}</div> : <div></div> }

            {profile.hobby? <p style={{cursor:'pointer'}} onClick={()=>{this.handleClick(2)}}>hobby:{profile.hobby}</p>   : <p style={{cursor:'pointer'}} onClick={()=>{this.handleClick(2)}}>hobby: hobbyを入力</p>}
            {num===2? <div>{inputAreaBlock2}</div> : <div></div> }

            {profile.comment? <p style={{cursor:'pointer'}} onClick={()=>{this.handleClick(3)}}>comment:{profile.comment}</p>  : <p style={{cursor:'pointer'}} onClick={()=>{this.handleClick(3)}}>comment: commentを入力</p>}
            {num===3? <div>{inputAreaBlock}</div> : <div></div> }

            {profile.num_of_people_min? <p style={{cursor:'pointer'}} onClick={()=>{this.handleClick(4)}}> 希望 人数 : {profile.num_of_people_min} ~ {profile.num_of_people_max}</p>  : <p style={{cursor:'pointer'}} onClick={()=>{this.handleClick(4)}}> 希望 人数 :  ~ </p>}
            {num===4? <div>{inputAreaBlock}</div> : <div></div> }

            {profile.expect_area? <p style={{cursor:'pointer'}} onClick={()=>{this.handleClick(5)}}> 希望 エリア :  {profile.expect_area}  </p> : <p style={{cursor:'pointer'}} onClick={()=>{this.handleClick(5)}}> 希望 エリア :   </p>}
            {num===5? <div>{inputAreaBlock}</div> : <div></div> }

            {profile.price_of_rent? <p style={{cursor:'pointer'}} onClick={()=>{this.handleClick(6)}}> 希望 家賃負担 :  {profile.price_of_rent}  </p> :  <p style={{cursor:'pointer'}} onClick={()=>{this.handleClick(6)}}> 希望 家賃負担 : </p>}
            {num===6? <div>{inputAreaBlock}</div> : <div></div> }
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
