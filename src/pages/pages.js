import IndexPage from "./index_page";
import LoginPage from "./login_page";
import RegisterPage from "./register_page";
import NotFoundPage from "./not_found_page";
import ProblemCreatePage from "./problem_create_page";
import ProblemViewPage from "./problem_view_page";
import ProblemsetPage from "./problemset_page";
import ProblemsetCreatePage from "./problemset_create_page";
import DebugPage from "./debug_page";

export const pages = {
  "syzoj.api.IndexPage": IndexPage,
  "syzoj.api.LoginPage": LoginPage,
  "syzoj.api.RegisterPage": RegisterPage,
  "syzoj.api.NotFoundPage": NotFoundPage,
  "syzoj.api.ProblemsetPage": ProblemsetPage,
  "syzoj.api.ProblemsetCreatePage": ProblemsetCreatePage,
  "syzoj.api.ProblemCreatePage": ProblemCreatePage,
  "syzoj.api.ProblemViewPage": ProblemViewPage,
  "syzoj.api.DebugPage": DebugPage
};
