import React, { Component } from "react";
import { BaseComponent } from "../base_component";

// Corresponding message: syzoj.api.RegisterPage
export default class RegisterPage extends BaseComponent {
  render() {
    return (
      <div>
        "Register page"
        <button onClick={() => this.register()}>Register</button>
      </div>
    );
  }
  register() {
    this.doAction("register", {
      user_name: "test",
      password: "test"
    });
  }
}
