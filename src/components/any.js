import React, { Component } from "react";

import LoginPage from "./login_page";
import RegisterPage from "./register_page";
import NotFoundPage from "./not_found_page";
import ProblemCreatePage from "./problem_create_page";
import ProblemViewPage from "./problem_view_page";

const components = {
  "syzoj.api.LoginPage": LoginPage,
  "syzoj.api.RegisterPage": RegisterPage,
  "syzoj.api.NotFoundPage": NotFoundPage,
  "syzoj.api.ProblemCreatePage": ProblemCreatePage,
  "syzoj.api.ProblemViewPage": ProblemViewPage
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
