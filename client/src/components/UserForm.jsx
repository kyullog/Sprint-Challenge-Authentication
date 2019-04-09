import React, { Component } from "react";
import axios from "axios";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      url: this.props.url
    };
  }

  componentDidMount() {}

  inputCreater(name, type = "text") {
    return (
      <input
        name={name}
        type={type}
        placeholder={name[0].toUpperCase() + name.slice(1)}
        onChange={this.changeHandler}
      />
    );
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const user = { username, password };
    axios
      .post(this.state.url, user)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        this.props.update();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="form-wrapper">
        <h2>{this.props.type}</h2>
        <form onSubmit={this.submitHandler}>
          {this.inputCreater("username")}
          {this.inputCreater("password", "password")}
          <button type="submit">{this.props.type}</button>
        </form>
      </div>
    );
  }
}

export default UserForm;
