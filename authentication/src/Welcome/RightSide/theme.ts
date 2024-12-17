import { checkCred, registerUser } from "./api";

enum Page {
  registration = 0,
  login = 1,
}

class Theme {
  name: Page;
  title: string;
  subTitleText: string;
  inputText: string;
  inputPlaceHolder: string;
  buttonText: string;
  switchButtonText: string;

  constructor(
    title: string,
    subTitleText: string,
    inputText: string,
    inputPlaceHolder: string,
    buttonText: string,
    switchButtonText: string,
    name: Page
  ) {
    this.title = title;
    this.name = name;
    this.subTitleText = subTitleText;
    this.inputText = inputText;
    this.inputPlaceHolder = inputPlaceHolder;
    this.buttonText = buttonText;
    this.switchButtonText = switchButtonText;
  }

  handleSubmit = async ({userName, password, setLoading}:{userName: string, password: string, setLoading: (b: boolean) => void}) => {
    const lowerCase = userName.toLowerCase();
    const data = { email: lowerCase, password };
    setLoading(true)
    if (this.name === Page.login) {
      await checkCred(data);
    } else {
      await registerUser(data);
    }
    setLoading(false)
  };
}

export const registrationTheme = new Theme(
  "Get Start to Register",
  "Please enter your details to register",
  "Create Password",
  "Enter password",
  "Next",
  "Login",
  Page.registration
);

export const loginTheme = new Theme(
  "Welcome Back",
  "Please enter your details to sign in",
  "Password",
  "Enter your password",
  "LOGIN",
  "Sign up",
  Page.login
);
