import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const StyledButton = withStyles((theme) => ({
  root: {
    margin: "1em",
    // height: "3em",
    background: "linear-gradient(45deg, #DA76C7 30%, #8973E6 90%)",
    border: 0,
    borderRadius: 20,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    "&:hover": {
      opacity: "0.9",
    },
  },
}))(Button);

export default function PrimaryButton(props) {
  return (
    <StyledButton
      variant="contained"
      color="primary"
      size="large"
      style={{ ...props.extraStyle }}
      {...props}
    >
      {props.children}
    </StyledButton>
  );
}
