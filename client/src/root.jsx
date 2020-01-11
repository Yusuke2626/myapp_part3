import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users:[] };
    // this.state = { likes:[] };


    fetch("http://localhost:3000/tops")
      .then(response => response.json())
      .then(users => this.setState({ users }));

  }

  render() {
    return (
      <div>
        <h1>hello,world</h1>
        <h3>users</h3>
        <ul>

          {console.log(this.state.users)}
          {this.state.users.filter(user => user.name).map(user => (
            <li>
              {console.log(user)}
              <h2>{user.id}</h2>
              <p>{user.appointedto}</p>
              <p>{user.duedate}</p>
            </li>
          ))}
        </ul>
        <h3>likes</h3>
        <ul>
          {this.state.users.filter(user => user.like_user).map(user => (
            <li>
              {console.log(user)}
              <h2>{user.id}</h2>
              <p>{user.appointedto}</p>
              <p>{user.duedate}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
