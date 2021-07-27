import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      login: false,
      store: null,
    };
  
  }
  
  EmailOnChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  PasswordOnChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  login = () => {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    let data = {
      Email: this.state.email,
      Password: this.state.password
    }
    axios
      .post("https://localhost:5001/api/user/token", JSON.stringify(data), axiosConfig)
      .then(response => console.log(response))
      .catch((error) => console.log("Error: ", error));
  };

  render() {
    return (
      <div>
        <h1>Jwt Token with React</h1>
        <div>
          <input
            type="email"
            placeholder="email"
            onChange={(event) => this.EmailOnChangeHandler(event)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(event) => this.PasswordOnChangeHandler(event)}
          />
          <button onClick={this.login}>Login</button>
        </div>
      </div>
    );
  }
}

export default App;
