import React from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";

/**
 * This component will show a) the 'feedback' from the survey and b) the answers
 * filled in by the user.
 */
export default function surveyResultsPage() {
  return (
    <div className="padding10">
      <div>
        Survey Completed your answers + feedback will be given here on this page
        (previous completions will open to this page)
      </div><br />
      <Link to="/">
        <MDBBtn gradient="purple">
          Go home
        </MDBBtn>
        {/* <Button type="button">Go home</Button> */}
      </Link>
    </div>
  );
}
