import React from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * This component will show a) the 'feedback' from the survey and b) the answers
 * filled in by the user.
 */
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
