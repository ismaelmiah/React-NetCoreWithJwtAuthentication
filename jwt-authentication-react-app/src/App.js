import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      login: false,
      store: null,
      post: "",
      posts: [],
    };
  }

  componentDidMount() {
    const localObj = JSON.parse(localStorage.getItem("login"));
    if (localObj != null) {
      this.setState({
        login: true,
        store: {
          username: localObj.username,
          token: localObj.token,
        },
      });
    }
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
      Password: this.state.password,
    };
    axios
      .post(
        "https://localhost:5001/api/user/token",
        JSON.stringify(data),
        axiosConfig
      )
      .then((response) => {
        localStorage.setItem(
          "login",
          JSON.stringify({
            login: true,
            token: response.data.token,
            username: this.state.username,
          })
        );
        this.setState({ login: true });
      })
      .catch((error) => console.log("Error: ", error));
  };

  PostOnChangeHanlder = (e) => {
    this.setState({
      post: e.target.value,
    });
  };

  post = () => {
    const post = this.state.post;
    let Oldposts = [...this.state.posts];
    Oldposts.push({
      post: post,
      id: Oldposts.length + 1,
    });
    this.setState({
      posts: Oldposts,
      post: "",
    });
  };

  logout = () => {
    localStorage.clear();
    this.setState({
      login: false
    })
  }
  render() {
    return (
      <div>
        <h1>Jwt Token with React</h1>
        {!this.state.login ? (
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
        ) : (
          <div>
            <div>
              <div>
                <button onClick={this.logout}>Logout</button>
              </div>
              <textarea
                onChange={(event) => this.PostOnChangeHanlder(event)}
                value={this.state.post}
              ></textarea>
              <button onClick={this.post}>Post</button>
            </div>
            <div>
              {this.state.posts.map((p) => (
                <div key={p.id}>
                  <p>{p.post}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
