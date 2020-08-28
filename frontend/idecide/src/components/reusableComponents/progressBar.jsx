import React from "react";
import { ProgressBar as BootstrapProgressBar } from "react-bootstrap";

export default function ProgressBar(props) {
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
}
