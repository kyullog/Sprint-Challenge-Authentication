import React, { Component } from "react";
import UserForm from "./components/UserForm";
import JokeList from "./components/JokeList";

import endpoints from "./config/endpoints";
import "./App.css";

class App extends Component {
  state = {
    loggedIn: false
  };

  checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  componentDidMount() {
    this.checkToken();
  }

  render() {
    console.log(endpoints.register);
    return (
      <div className="App">
        <UserForm
          url={endpoints.register}
          type="Register"
          update={this.checkToken}
        />
        <UserForm
          url={endpoints.login}
          type="Log In"
          update={this.checkToken}
        />
        {this.state.loggedIn && <JokeList url={endpoints.jokes} />}
      </div>
    );
  }
}

export default App;
