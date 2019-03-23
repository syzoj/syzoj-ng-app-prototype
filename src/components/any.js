import React, { Component } from "react";

import LoginPage from "./login_page";

const components = {
  "syzoj.api.LoginPage": LoginPage
};

export default function Any(props) {
  const {
    ["data"]: { ["@type"]: type, ...mdata },
    ...mprops
  } = props;
  const typename = type.substring(type.indexOf("/") + 1);
  mprops.data = mdata;
  const Comp = components[typename];
  return <Comp {...mprops} />;
}
