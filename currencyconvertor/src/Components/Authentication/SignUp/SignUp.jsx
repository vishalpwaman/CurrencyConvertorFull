import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import "./SignUp.scss";
import Registerlogo from "../../../Asserts/logoRegister.svg";
import {
  TextField,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormControl,
  FormHelperText,
  Button,
  Checkbox,
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import UserServices from "./../../../Services/UserServices";

const userServices = new UserServices();
const emailRegrex = RegExp("^[0-9A-Za-z_.-]+$");

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => {
    val === true && (valid = false);
  });
  return valid;
};

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      SnakBarMessage: "",
      SnackbarOpen: false,
      Transition: Fade,
      errors: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
      errorMessage: {
        Name: null,
        email: null,
        password: null,
      },
    };
  }

  handleNullValidation = (event) => {
    event.preventDefault();
    let state = this.state;
    let errors = this.state.errors;
    let errorMessage = this.state.errorMessage;
    console.log("Email Regrex ", emailRegrex.test(state.email));

    if (state.firstName === "") {
      errors.firstName = true;
      errorMessage.Name =
        state.firstName.length === 0 ? "Enter first name" : null;
    }

    if (state.lastName === "") {
      errors.lastName = true;
      errorMessage.Name = "Enter last name";
    }

    if (state.firstName === "" && state.lastName === "") {
      errors.firstName = true;
      errors.lastName = true;
      errorMessage.Name = "Enter first name & last name";
    }

    if (state.email === "") {
      console.log("flag 11");
      errors.email = true;
      errorMessage.email = "Choose a Gmail address";
    } else if (!emailRegrex.test(state.email)) {
      console.log("enter in regrex");
      errors.email = true;
      errorMessage.email =
        "only letters (a-z), numbers (0-9), and periods (.) are allowed.";
    } else if (!(state.email.length >= 6 && state.email.length <= 30)) {
      console.log("flag 22");
      errors.email = true;
      errorMessage.email =
        "Sorry, your username must be between 6 and 30 characters long.";
    }

    if (state.password === "") {
      errors.password = true;
      errorMessage.password = "Enter a password";
    } else if (state.password.length < 8) {
      errors.password = true;
      errorMessage.password = "Use 8 characters or more for your password";
    }
    console.log("password ", state.password);
    console.log("Confirm password ", state.confirmPassword);
    if (state.password.length >= 8) {
      if (state.confirmPassword.length >= 1) {
        if (state.password !== state.confirmPassword) {
          errors.password = true;
          errorMessage.password = "Password not match";
        }
      } else if (state.confirmPassword === "") {
        errors.password = true;
        errors.confirmPassword = true;
        errorMessage.password = "Enter a confirm password";
      }
    }

    this.setState({ errors, errorMessage });
  };

  handleInvalidNullity = (event) => {
    event.preventDefault();
    let state = this.state;
    let errors = this.state.errors;

    if (state.firstName.length > 0) {
      errors.firstName = false;
    }
    if (state.lastName.length > 0) {
      errors.lastName = false;
    }
    if (
      state.email.length >= 6 &&
      state.email.length <= 30 &&
      emailRegrex.test(state.email)
    ) {
      console.log("flag 1");
      errors.email = false;
    } else if (emailRegrex.test(state.email)) {
      console.log("flag 2");
      errors.email = false;
    }

    if (state.password.length >= 8) {
      if (state.confirmPassword.length > 0) {
        if (state.password === state.confirmPassword) {
          console.log("password flag false");
          errors.password = false;
        }
        errors.confirmPassword = false;
      }
    }

    this.setState({ errors });
  };

  redirect = (emailId) => {
    console.log("flag 2");
    this.props.history.push({
      pathname: "/SignInEmail",
      search: "?query=email",
      state: { email: emailId },
    });
  };


  handleSubmit = (event) => {
    event.preventDefault();
    let state = this.state;
    this.handleNullValidation(event);
    this.handleInvalidNullity(event);
    if (validateForm(state.errors)) {
      console.log("Acceptable");
      const data = {
        firstname: state.firstName,
        lastname: state.lastName,
        email: state.email + "@gmail.com",
        password: state.password,
        confirmpassword: state.confirmPassword,
      };

      userServices
        .SignUp(data)
        .then((data) => {
          console.log(data.data.data.email);
          console.log("flag 1");
          state.SnakBarMessage = "SignUp Successfull";
          this.setState({ state });
          this.handleClick(SlideTransition);
          this.redirect(data.data.data.email);
        })
        .catch((error) => {
          console.log("Status :" + error.response.status);
          console.log("data :" + error);
          this.setState({
            SnakBarMessage: "SOMETHING WENT WRONG, SIGNUP UNSUCCESSFULL",
          });
          this.handleClick(SlideTransition);
        });
    } else {
      console.log("Not Acceptable");
    }
  };

  handleChecked = (event) => {
    event.preventDefault();
    let state = this.state;
    state.showPassword = !state.showPassword;
    this.setState({ state });
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(" " + [name] + " " + value);
    this.setState({ [name]: value });
  };

  handleClick = (Transition) => {
    console.log("Handle click");
    this.setState({
      SnackbarOpen: true,
      Transition,
    });
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      SnackbarOpen: false,
    });
  };

  render() {
    var state = this.state;
    var errors = this.state.errors;
    var errorMessage = this.state.errorMessage;
    console.log(this.state);
    return (
      <div className="signUp_Container">
        <div className="sub_Container">
          <div className="input_Container">
            <div className="google_Font">
              Currency Convertor
            </div>
            <div className="main_headerText">Create your Account</div>
            <div className="input_Field1">
              <div className="input1">
                <div className="input11">
                  <TextField
                    error={errors.firstName ? true : false}
                    autoFocus
                    autoComplete="off"
                    className="input1_TextField"
                    label="First name"
                    variant="outlined"
                    size="small"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input12">
                  <TextField
                    error={errors.lastName ? true : false}
                    autoComplete="off"
                    className="input2_TextField"
                    label="Last name"
                    variant="outlined"
                    size="small"
                    name="lastName"
                    value={state.lastName}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.lastName || errors.firstName ? (
                <div className="errorMessage1">
                  <ErrorIcon fontSize="small" />
                  <div className="errorText">{errorMessage.Name}</div>
                </div>
              ) : (
                <div className="errorMessage1"></div>
              )}
              <div className="input2">
                <FormControl variant="outlined" className="input_form">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Username
                  </InputLabel>
                  <OutlinedInput
                    error={errors.email ? true : false}
                    autoComplete="off"
                    id="outlined-adornment-password"
                    variant="outlined"
                    className="input2_Textfield"
                    name="email"
                    style={{
                      height: "58%",
                      width: "100%",
                    }}
                    endAdornment={
                      <InputAdornment position="end">@gmail.com</InputAdornment>
                    }
                    labelWidth={60}
                    value={state.email}
                    onChange={this.handleChange}
                  />
                  {errors.email ? (
                    <div className="errorMessage1">
                      <ErrorIcon fontSize="small" />
                      <div className="errorText">{errorMessage.email}</div>
                    </div>
                  ) : (
                    <FormHelperText
                      id="outlined-weight-helper-text"
                      className="gmail_HelperText"
                    >
                      You can use letters, numbers & periods
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="suggestion_Button">
                <Button color="primary" className="s_Button">
                  Use my current email address instead
                </Button>
              </div>
              <div className="passwordField">
                <div className="p_field">
                  <div className="password">
                    <TextField
                      error={
                        errors.password && !errors.confirmPassword
                          ? true
                          : false
                      }
                      autoComplete="off"
                      className="input1_TextField"
                      label="password"
                      type={state.showPassword ? "text" : "password"}
                      variant="outlined"
                      size="small"
                      name="password"
                      value={this.password}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="confirmPassword">
                    <TextField
                      error={errors.confirmPassword ? true : false}
                      autoComplete="off"
                      className="input2_TextField"
                      label="Confirm password"
                      type={state.showPassword ? "text" : "password"}
                      variant="outlined"
                      size="small"
                      name="confirmPassword"
                      value={this.confirmPassword}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                {errors.password ? (
                  <div className="errorMessage1">
                    <ErrorIcon fontSize="small" />
                    <div className="errorText">{errorMessage.password}</div>
                  </div>
                ) : (
                  <FormHelperText
                    id="outlined-weight-helper-text"
                    className="password_HelperText"
                  >
                    You 8 or more characters with a mix of letters, numbers &
                    symbols
                  </FormHelperText>
                )}
              </div>
              <div className="show_password">
                <Checkbox
                  color="primary"
                  className="check_Point"
                  onChange={this.handleChecked}
                  checked={this.state.showPassword}
                />
                <div className="s_passwordText">Show password</div>
              </div>
            </div>
            <div className="bottom_Button">
              <div className="signIn_Button">
                <Button
                  color="primary"
                  className="s_Button"
                  href="/SignInEmail"
                >
                  Sign in instead
                </Button>
              </div>
              <div className="next_Button">
                <Button
                  variant="contained"
                  color="primary"
                  className="n_Button"
                  onClick={this.handleSubmit}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
          <div className="image_Container">
            <div className="image_Subcontainer">
              <div className="image_Field">
                <img src={Registerlogo} alt="" className="image" />
              </div>
              <div className="image_Text">
                One account. All of Google working for you
              </div>
            </div>
          </div>
        </div>
        <div>
          <Snackbar
            open={this.state.SnackbarOpen}
            onClose={this.handleClose}
            TransitionComponent={state.Transition}
            message={this.state.SnakBarMessage}
            key={state.Transition.name}
          />
        </div>
      </div>
    );
  }
}

export default SignUp;
