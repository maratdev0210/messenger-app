export type LoginInputs = {
  username: string;
  password: string;
};

export type SignupInputs = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type Inputs = LoginInputs & SignupInputs;
