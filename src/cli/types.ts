type QuestionWhen = (answers: Partial<Record<string, any>>, options?: any) => boolean;
type QuestionValidate = (input: string) => string | boolean;

type ActionType = "list" | "input";

interface BaseQuestion {
  type: ActionType;
  name: string;
  message: string;
}

interface ListQuestion extends BaseQuestion {
  type: "list";
  choices: string[];
  when?: QuestionWhen;
}

interface InputQuestion extends BaseQuestion {
  type: "input";
  when?: QuestionWhen;
  validate?: QuestionValidate;
  default?: string;
}

type Question = ListQuestion | InputQuestion;

interface SingleBarOptions {
  format: string;
  barCompleteChar: string;
  barIncompleteChar: string;
  hideCursor: boolean;
}

export { Question, SingleBarOptions };
