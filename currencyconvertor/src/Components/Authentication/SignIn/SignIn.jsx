import React, { Component } from "react";
import "./SignIn.scss";
import { TextField, Button } from "@material-ui/core";
import UserServices from "./../../../Services/UserServices.js";
import ErrorIcon from "@material-ui/icons/Error";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const userService = new UserServices();

export class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      SnackbarOpen: false,
      Transition: Fade,
      statusCode: 200,
      errors: {
        email: "",
        backEnd_message: "",
      },
      errorStatus: {
        emailStatus: false,
        backEnd_message: false,
      },
    };
  }

  handleNullity = (event) => {
    event.preventDefault();
    let state = this.state;
    if (state.email === "") {
      state.errorStatus.emailStatus = true;
      state.errors.email = "Enter an email or phone number";
    }
    this.setState({ state });
  };

  handleInvalidNullity = (event) => {
    event.preventDefault();
    let state = this.state;
    if (state.email !== "") {
      state.errorStatus.emailStatus = false;
    }
    this.setState({ state });
  };

  handleError = (statusCode) => {
    let state = this.state;
    if (statusCode === 406) {
      state.errors.backEnd_message =
        "Account Not Verified, Please Verified your Account.";
      state.errorStatus.backEnd_message = true;
      state.statusCode = statusCode;
    }
    this.setState({ state });
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

  redirect = () => {
    this.props.history.push({
      pathname: "/SendVerificationOtpOnMobile",
      search: "?query=email",
      state: { email: this.state.email },
    });
  };

  redirectToPassword = (state) => {
    this.props.history.push({
      pathname: "/SignInEnterPassword",
      search: "?query=email",
      state: {
        email: this.state.email,
        firstName: state.firstname,
        lastName: state.lastname,
        mobileNumber: state.mobile,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleNullity(event);
    this.handleInvalidNullity(event);
    let state = this.state;
    if (state.errorStatus.emailStatus === false) {
      console.log("Accepted");
      const data = {
        email: state.email,
      };
      console.log(data);
      userService
        .SignInEmail(data)
        .then((data) => {
          console.log(data.data);
          state.errorStatus.backEnd_message = false;
          this.redirectToPassword(data.data);
        })
        .catch((error) => {
          console.log("Status :" + error.response.status);
          this.handleError(error.response.status);
          this.handleClick(SlideTransition);
        });
    } else {
      console.log("Not Accepted");
    }
  };

  handleChange = (event) => {
    event.preventDefault();

    this.setState({ email: event.target.value });
  };

  render() {
    let state = this.state;
    let error = this.state.errors;
    console.log(this.state);
    return (
      <div className="signIn_Container">
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
              <div className="signIn_Header">
                <div className="signIn_Inner">Sign in</div>
              </div>
              <div className="sub_Header">
                <div className="sub_Inner">Use your Account</div>
              </div>
              <div className="signIn_Body">
                <div className="input_Field">
                  <TextField
                    error={state.errorStatus.emailStatus ? true : false}
                    className="Em_InputField"
                    label="Email or phone"
                    variant="outlined"
                    value={state.email}
                    onChange={this.handleChange}
                  />
                </div>
                {state.errorStatus.emailStatus && (
                  <div className="errorMessage">
                    <ErrorIcon fontSize="small" />
                    <div className="errorText">{error.email}</div>
                  </div>
                )}
                <div className="forget_email">
                  <Button
                    color="primary"
                    className="f_email"
                    href="/ForgetEmail"
                  >
                    {/* Forgot email? */}
                  </Button>
                </div>
                <div className="suggestion_Text">
                  Not your computer? Use Guest mode to sign in privately.
                </div>
                <div className="learnmore_Button">
                  <Button color="primary" className="lm_Button">
                    Learn more
                  </Button>
                </div>
                <div className="bottons">
                  <div className="create_Account">
                    <Button color="primary" className="ca_Button" href="/">
                      Create account
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
              action={
                this.state.statusCode === 406 ? (
                  <Button
                    color="inherit"
                    size="small"
                    style={{ color: "yellow" }}
                    onClick={() => {
                      this.redirect();
                    }}
                  >
                    click here
                  </Button>
                ) : (
                  ""
                )
              }
              key={state.Transition.name}
            />
          )}
        </div>
      </div>
    );
  }
}

export default SignIn;
