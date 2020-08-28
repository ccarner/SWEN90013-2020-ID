import React from "react";
import { Spinner } from "react-bootstrap";

export default function loadingSpinner() {
  return (
    <div>
      <Spinner animation="border" style={{ margin: "50px", color: "purple" }} />
    </div>
  );
}
