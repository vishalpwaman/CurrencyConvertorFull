import React, { Component } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Button,
} from "@material-ui/core";
import "./dashboard.scss";

import UserServices from "./../../Services/UserServices.js";

const userServices = new UserServices();

export class dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputCurrencyType: "EUR",
      outputCurrencyType: "USD",
      inputCurrencyValue: "0",
      outputCurrencyValue: "0",
      History: [],
    };
  }

  handleInputChange = (event) => {
    console.log("handle Input Change");
    this.setState({ inputCurrencyType: event.target.value });
  };

  handleOutputChange = (event) => {
    console.log("handle Output Change");
    this.setState({ outputCurrencyType: event.target.value });
  };

  History = () => {
    userServices
      .ConversionHistory()
      .then((data) => {
        console.log("History :" + data);
        this.setState({ History: data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  BackendServices = () => {
    console.log("Call Back end Services");
    if (this.state.inputCurrencyType !== "") {
      console.log("Accepted");
      const data = {
        CurrencyInputType: this.state.inputCurrencyType,
        CurrencyOutputType: this.state.outputCurrencyType,
        CurrencyInputValue: this.state.inputCurrencyValue,
      };

      userServices
        .ConversionService(data)
        .then((data) => {
          console.log("Output Result " + data.data.data.CurrencyOutputValue);
          this.setState({
            outputCurrencyValue: data.data.data.CurrencyOutputValue,
          });
          this.History();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({ outputCurrencyValue: 0 });
    }
  };

  handleValueChange = (event) => {
    console.log(" handle Value Change ");
    // this.BackendServices(event.target.value);
    this.setState({ inputCurrencyValue: event.target.value });
  };

  render() {
    console.log(this.state);
    return (
      <div className="dashboard-Container">
        <div className="sub-Container">
          <div className="first-Container">Currency Convertor</div>
          <div className="second-Container">
            <div className="operation">
              <div className="type1">
                <div className="currencyType">
                  <FormControl>
                    <InputLabel id="demo-customized-select-label">
                      Input Currency Type
                    </InputLabel>
                    <Select
                      //   labelId="demo-customized-select-label"
                      //   id="demo-customized-select"
                      value={this.state.inputCurrencyType}
                      onChange={this.handleInputChange}
                    >
                      <MenuItem value="EUR">EUR</MenuItem>
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="GBP">GBP</MenuItem>
                      <MenuItem value="NZD">NZD</MenuItem>
                      <MenuItem value="AUD">AUD</MenuItem>
                      <MenuItem value="JPY">JPY</MenuItem>
                      <MenuItem value="HUF">HUF</MenuItem>
                      <MenuItem value="INR">INR</MenuItem>
                      <MenuItem value="TRY">TRY</MenuItem>
                      <MenuItem value="QAR">QAR</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="currencyValue1">
                  <TextField
                    id="outlined-basic"
                    label="Input"
                    type="number"
                    variant="outlined"
                    placeholder="Input"
                    name="firstValue"
                    value={this.state.inputCurrencyValue}
                    onChange={this.handleValueChange}
                  />
                </div>
              </div>
              <div className="type2">
                <div className="currencyType">
                  <FormControl>
                    <InputLabel id="demo-customized-select-label">
                      Output Currency Type
                    </InputLabel>
                    <Select
                      //   labelId="demo-customized-select-label"
                      //   id="demo-customized-select"
                      value={this.state.outputCurrencyType}
                      onChange={this.handleOutputChange}
                    >
                      <MenuItem value="EUR">EUR</MenuItem>
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="GBP">GBP</MenuItem>
                      <MenuItem value="NZD">NZD</MenuItem>
                      <MenuItem value="AUD">AUD</MenuItem>
                      <MenuItem value="JPY">JPY</MenuItem>
                      <MenuItem value="HUF">HUF</MenuItem>
                      <MenuItem value="INR">INR</MenuItem>
                      <MenuItem value="TRY">TRY</MenuItem>
                      <MenuItem value="QAR">QAR</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="currencyValue2">
                  <TextField
                    id="outlined-basic"
                    // label="Output"
                    variant="outlined"
                    placeholder="Output"
                    name="secondValue"
                    value={this.state.outputCurrencyValue}
                  />
                </div>
              </div>
            </div>
            <div className="button">
              <div className="conversionButton">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.BackendServices}
                >
                  Convert
                </Button>
              </div>
              <div className="historyButton">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.History}
                >
                  History
                </Button>
              </div>
            </div>
            <div className="history">
              <table className="table">
                <tr>
                  <th className="header">CONVERSION ID</th>
                  <th className="header">CURRENCY INPUT TYPE</th>
                  <th className="header">CURRENCY OUTPUT TYPE</th>
                  <th className="header">INPUT VALUE</th>
                  <th className="header">OUTPUT VALUE</th>
                </tr>
                <div className="seperation"></div>
                {this.state.History.map(function (task, index) {
                  return (
                    // <div key={index} className="table-data">
                    <tr>
                      <td className="data">{task.conversion_id}</td>
                      <td className="data">{task.CurrencyInputType}</td>
                      <td className="data">{task.CurrencyOutputType}</td>
                      <td className="data">{task.CurrencyInputValue}</td>
                      <td className="data">{task.CurrencyOutputValue}</td>
                    </tr>
                    // </div>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default dashboard;
