import React, { Component } from "react";
import { BaseComponent } from "../base_component";

// Corresponding message: syzoj.api.LoginPage
export default class LoginPage extends BaseComponent {
  render() {
    return (
      <div>
        "Login page"
        <button onClick={() => this.login()}>Login</button>
      </div>
    );
  }
  login() {
    this.doAction("login", {
      user_name: "test",
      password: "test"
    });
  }
}
