import * as model from "./syzoj.model.d";

export type Response = {
  mutations: [Mutation];
};

export type Mutation = {
  path: string;
  method: string;
  value: any;
};

export type IndexPage = {};

export type NotFoundPage = {};

export type LoginPage = {};

export type RegisterPage = {};

export type ProblemCreatePage = {};

export type ProblemViewPage = {
  problem_title: string;
  problem_statement: model.ProblemStatement;
  problem_judge: model.ProblemJudge;
};

export type ProblemsPage = {
  problem_entry?: [ProblemsPage.ProblemEntry];
};

export namespace ProblemsPage {
  export type ProblemEntry = {
    id: string;
    problem_id: string;
    problem_title: string;
  };
}
