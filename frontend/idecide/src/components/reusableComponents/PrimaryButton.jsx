import React from "react";
import { MDBBtn } from "mdbreact";

export default function PrimaryButton(props) {
  return (
    <MDBBtn
      gradient="purple"
      style={{ borderRadius: "10em", border: "none", ...props.extraStyle }}
      {...props}
    >
      {props.children}
    </MDBBtn>
  );
}
