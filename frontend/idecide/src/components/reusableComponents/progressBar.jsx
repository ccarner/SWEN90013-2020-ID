import React from "react";
import { ProgressBar as BootstrapProgressBar } from "react-bootstrap";

export default function ProgressBar(props) {
  if (props.showLabel !== false) {
    return (
      <div>
        <BootstrapProgressBar
          now={props.value}
          label={`${Math.floor(props.value)}%`}
          style={{
            margin: "10px",
          }}
        />
      </div>
    );
  } else {
    return (
      <div>
        <BootstrapProgressBar
          now={props.value}
          style={{
            margin: "10px",
          }}
        />
      </div>
    );
  }
}
