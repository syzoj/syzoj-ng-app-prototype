export type ProblemStatement = {
  markdown?: MarkdownLatexDocument;
};

export type MarkdownLatexDocument = {
  text?: string;
};

export type ProblemJudge = {
  traditional?: TraditionalJudgeData;
};

export type TraditionalJudgeData = {
  time_limit?: number;
  memory_limit?: number;
};

export type TraditionalJudgeCode = {
  language?: string;
  code?: string;
};
