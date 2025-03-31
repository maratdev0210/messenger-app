import { Inputs } from "./inputs";

interface ISignupFields {
  name: keyof Inputs;
  label: string;
  type: string;
}

export const SignupFields: ISignupFields[] = [
  {
    name: "username",
    label: "Username",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
  {
    name: "firstName",
    label: "First name",
    type: "text",
  },
  {
    name: "lastName",
    label: "Last name",
    type: "text",
  },
];
