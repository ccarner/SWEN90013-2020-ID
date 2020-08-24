import React from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function surveyResultsPage() {
  return (
    <div>
      {" "}
      Survey Completed your answers + feedback will be given here on this page
      (previous completions will open to this page)
      <Link to="/">
        <Button type="button">Go home</Button>
      </Link>
    </div>
  );
}
