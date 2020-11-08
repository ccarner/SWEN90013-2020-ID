import React, { Component } from "react";
import { getValue, setValue } from "../API/keyValueAPI.js";
import { TextField, Card, Typography } from "@material-ui/core";
import keyValuePagesInfo from "./keyValuePagesInfo.json";
import PrimaryButton from "./../components/reusableComponents/PrimaryButton";
import { toast } from "react-toastify";

export default class KeyValuePairEditingPage extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.onChange = this.onChange.bind(this);
    this.resetState = this.resetState.bind(this);
    this.uploadValue = this.uploadValue.bind(this);
  }

  initialState() {
    return {
      value: "Loading...",
      loaded: false,
      key: this.props.match.params.key,
    };
  }

  async resetState() {
    this.setState({ ...this.initialState() });
  }

  async fetchData() {
    console.log("getting for key", this.state.key);
    const value = await getValue(this.state.key);
    this.setState({ value: value, loaded: true });
  }

  componentDidUpdate(prevProps) {
    console.log(
      "props",
      prevProps.match.params.key,
      this.props.match.params.key
    );
    if (prevProps.match.params.key !== this.props.match.params.key) {
      this.resetState().then(() => {
        this.fetchData();
      });
    }
  }

  async componentDidMount() {
    this.fetchData();
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  async uploadValue() {
    var stringifiedValue = JSON.stringify(JSON.parse(this.state.value));
    try {
      setValue(this.state.key, stringifiedValue)
        .then((data) => {
          console.log("data received", data);
          if (data.flag) {
            toast("uploaded successfully");
          } else {
            toast("Error uploading:" + data.message);
          }
        })
        .catch((err) => {
          console.error("error when uploading", err);
          toast("Failure to upload" + err);
        });
    } catch (err) {
      toast("Failure to upload" + err);
      console.error("Error when uploading file", err);
    }
  }

  render() {
    return (
      <div style={{ padding: "1em" }}>
        <Typography variant="h2" gutterBottom style={{ color: "white" }}>
          Editing: {keyValuePagesInfo[this.state.key].titleText}
        </Typography>
        <Typography variant="h5" gutterBottom style={{ color: "white" }}>
          {keyValuePagesInfo[this.state.key].description}
        </Typography>
        <Card style={{ margin: "1em", padding: "1em" }}>
          <TextField
            id="filled-textarea"
            label="Value"
            placeholder="Write Value Here"
            multiline
            variant="filled"
            value={this.state.value}
            onChange={this.onChange}
            fullWidth
          />
        </Card>
        <PrimaryButton onClick={this.uploadValue}>
          Save & Upload Changes
        </PrimaryButton>
      </div>
    );
  }
}
