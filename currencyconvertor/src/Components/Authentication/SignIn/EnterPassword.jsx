import React, { Component } from "react";
import "./EnterPassword.scss";
import { TextField, Checkbox, Button } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import UserServices from "./../../../Services/UserServices.js";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const userServices = new UserServices();

export class EnterPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      password: "",
      showPassword: false,
      SnackbarOpen: false,
      Transition: Fade,
      statusCode: 200,
      errors: {
        backEnd_message: "",
        password: "",
      },
      errorStatus: {
        passwordStatus: false,
        backEnd_message: false,
      },
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      email: props.location.state.email,
      firstName: props.location.state.firstName,
      lastName: props.location.state.lastName,
      mobileNumber: props.location.state.mobileNumber,
    };
  }

  checkNullity = (event) => {
    event.preventDefault();
    let state = this.state;
    if (state.password === "") {
      state.errors.passwordStatus = true;
      state.errors.password = "Enter a password";
      this.setState({ state });
      return false;
    }
    return true;
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

  handleError = (statusCode) => {
    let state = this.state;
    if (statusCode === 401) {
      state.errors.backEnd_message = "Incurrect Password";
      state.errorStatus.backEnd_message = true;
      state.statusCode = statusCode;
    }
    this.setState({ state });
  };

  redirect = () => {
    this.props.history.push({
      pathname: "/DashBoard",
      search: "?query=email",
      state: { email: this.state.email },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let state = this.state;
    if (this.checkNullity(event)) {
      console.log("Accepted");
      const data = {
        email: state.email,
        password: state.password,
      };
      userServices
        .SignInPassword(data)
        .then((data) => {
          console.log(data);
          this.redirect();
        })
        .catch((error) => {
          console.log("error :" + error);
          console.log("Status :" + error.response.status);
          this.handleError(error.response.status);
          this.handleClick(SlideTransition);
        });
    } else {
      console.log("Not Accepted");
    }
  };

  handleChange = (event) => {
    let state = this.state;
    const { name, value } = event.target;
    switch (name) {
      case "password":
        state.password = value;
        break;
      case "showPassword":
        state.showPassword = !state.showPassword;
        break;
      default:
        break;
    }

    this.setState({ state });
  };

  ResetPassPassword = (event) => {
    event.preventDefault();
    if (Number(this.state.mobileNumber) === 0) {
      this.props.history.push({
        pathname: "/OtpEmailVerification",
        search: "?query=email",
        state: {
          email: this.state.email,
        },
      });
    } else {
      this.props.history.push({
        pathname: "/MobileOtpSend",
        search: "?query=email",
        state: {
          email: this.state.email,
          mobileNumber: this.state.mobileNumber,
        },
      });
    }
  };

  render() {
    let state = this.state;
    let errors = this.state.errors;
    console.log(this.state);
    return (
      <div className="enterPassword_Container">
        <div className="sub_Container">
          <div className="inner_Container">
            <div className="google_Header">
              <span className="G">G</span>
              <span className="o1">o</span>
              <span className="o2">o</span>
              <span className="g">g</span>
              <span className="l">l</span>
              <span className="e">e</span>
            </div>
            <div className="body">
              <div className="enterPassword_Header">
                <div className="enterPassword_Inner">
                  {state.firstName}&nbsp;{state.lastName}
                </div>
              </div>
              <div className="sub_Header">
                <div className="sub_Inner">
                  <div className="accountImage"></div>
                  <div className="accountId">{state.email}</div>
                </div>
              </div>
              <div className="enterPassword_Body">
                <div className="input_Field">
                  <TextField
                    error={state.errors.passwordStatus ? true : false}
                    autoFocus={true}
                    className="Em_InputField"
                    label="Enter your password"
                    variant="outlined"
                    name="password"
                    type={state.showPassword ? "text" : "password"}
                    value={state.password}
                    onChange={this.handleChange}
                  />
                </div>
                {state.errors.passwordStatus && (
                  <div className="errorMessage">
                    <ErrorIcon fontSize="small" />
                    <div className="errorText">{errors.password}</div>
                  </div>
                )}
                <div className="show_password">
                  <Checkbox
                    color="primary"
                    className="check_Point"
                    name="showPassword"
                    onChange={this.handleChange}
                    checked={this.state.showPassword}
                  />
                  <div className="s_passwordText">Show password</div>
                </div>
                <div className="bottons">
                  <div className="create_Account">
                    <Button
                      color="primary"
                      className="ca_Button"
                      href="/MobileOtpSend"
                      onClick={this.ResetPassPassword}
                    >
                      {/* Forget password? */}
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
            </div>
          </div>
        </div>
        <div>
          {state.errorStatus.backEnd_message && (
            <Snackbar
              open={this.state.SnackbarOpen}
              onClose={this.handleClose}
              TransitionComponent={state.Transition}
              message={this.state.errors.backEnd_message}
              key={state.Transition.name}
            />
          )}
        </div>
      </div>
    );
  }
}

export default EnterPassword;
