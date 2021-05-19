import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./Components/Authentication/SignUp/SignUp.jsx";
import SignIn from "./Components/Authentication/SignIn/SignIn.jsx";
import EnterPassword from "./Components/Authentication/SignIn/EnterPassword.jsx";
import Dashboard from "./Components/DashBoard/dashboard.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/SignInEmail" component={SignIn} />
          <Route exact path="/SignInEnterPassword" component={EnterPassword} />
          <Route exact path="/DashBoard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
