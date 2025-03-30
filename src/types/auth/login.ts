import { Inputs } from "./inputs";

interface ILoginFields {
  name: keyof Inputs;
  label: string;
  type: string;
}

export const LoginFields: ILoginFields[] = [
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
];

