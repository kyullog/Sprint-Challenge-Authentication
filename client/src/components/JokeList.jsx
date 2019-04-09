import React, { Component } from "react";
import axios from "axios";

class JokeList extends Component {
  state = {
    jokes: []
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      const headers = { authorization: token };
      axios
        .get(this.props.url, { headers })
        .then(res => this.setState({ jokes: res.data }))
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <div className="list-wrapper">
        <ul>
          {this.state.jokes.map(joke => (
            <li key={joke.id}>{joke.joke}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default JokeList;
