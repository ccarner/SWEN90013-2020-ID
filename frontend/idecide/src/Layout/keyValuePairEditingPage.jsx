import React, { Component } from "react";
import { getValue, setValue } from "../API/keyValueAPI.js";
import { TextField, Card, Typography } from "@material-ui/core";
import keyValuePagesInfo from "./keyValuePagesInfo.json";
import PrimaryButton from "./../components/reusableComponents/PrimaryButton";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export default class KeyValuePairEditingPage extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.onChange = this.onChange.bind(this);
    this.resetState = this.resetState.bind(this);
    this.uploadValue = this.uploadValue.bind(this);
    /*
     * Quill modules to attach to editor
     * See https://quilljs.com/docs/modules/ for complete options
     */
    this.quillModules = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    };
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
    this.setState({ value: JSON.parse(value), loaded: true });
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
    if (event.target) {
      //received a JS event, from MUI
      this.setState({ value: event.target.value });
    }
    //else received just a string from Quill
    this.setState({ value: event });
    console.log(event);
  }

  async uploadValue() {
    var stringifiedValue = JSON.stringify(this.state.value);
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
          {/* <TextField
            id="filled-textarea"
            label="Value"
            placeholder="Write Value Here"
            multiline
            variant="filled"
            value={this.state.value}
            onChange={this.onChange}
            fullWidth
          /> */}
          <ReactQuill
            value={this.state.value}
            onChange={this.onChange}
            modules={this.quillModules}
          />
        </Card>

        <PrimaryButton onClick={this.uploadValue}>
          Save & Upload Changes
        </PrimaryButton>
      </div>
    );
  }
}
