import React, { Component } from 'react';
import Profile from './Components/Profile';
import Search from './Components/Search';


const API = 'https://api.github.com/user'
class Github extends Component{

  constructor(props){
    super(props);

    this.state = {
      username: 'odunfunkenny',
      name: '',
      avatar: '',
      repos: '',
      followers: '',
      following: '',
      homeURL: '',
      NOTFound: ''
    };
  }

  getProfile(username){
    let finalURL = `${API}/${username}`;

    fetch(finalURL)
    .then((res) => res.json() )
    .then((data) => {
      this.setState({
        username: data.login,
        name: data.name,
        avatar: data.avatar_url,
        repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        homeURL: data.html_url,
        NOTFound: data.message
      })
    })
    .catch((error) => console.log('There was a problem in fetching data'))
  }

  componentDidMount(){
    this.getProfile(this.state.username);
  }

  render(){
    return(
      <div>
      <section id="card">
        <Search searchProfile={this.getProfile.bind(this)} />
          <Profile userData={this.state} />
      </section>
      </div>
    );
  }
}

export default Github;
