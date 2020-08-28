import React, { Component } from "react";
import { getCsvDownloadLink } from "../../API/surveyResultsAPI";
import PrimaryButton from "./../reusableComponents/PrimaryButton";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

export default class AdminConsole extends Component {
  constructor(props) {
    super(props);

    this.state = {
      downloadUrl: false, //false if not yet generated
    };
  }

  async generateCsvLink() {
    var link = await getCsvDownloadLink();
    this.setState({
      downloadUrl: link,
    });
  }

  render() {
    if (!this.state.downloadUrl) {
      return (
        // the commented out button will be first used to generate a download link
        // then a new button for downloading will appear.
        // <PrimaryButton onClick={this.generateCsvLink}>
        //   Click here to generate a CSV file of all survey results
        // </PrimaryButton>
        <Container>
          <Card style={{ width: "100%", marginTop: "100px" }}>
            <Card.Body>
              <Card.Title>Admin Console</Card.Title>
              {/* NOTE: currently this is hardcoded to one URL, but in future we need to use the API 
              to obtain a download link first (currently had CORS issues so hardcoded link) */}
              <a href="http://8.210.28.169/files/totalResult.csv" download>
                <PrimaryButton extraStyle={{ width: "40em" }}>
                  Click here to download a CSV file of all results
                </PrimaryButton>
              </a>
            </Card.Body>
          </Card>
        </Container>
      );
    } else {
      return (
        <a href={this.state.downloadUrl} download>
          Click to download results CSV file
        </a>
      );
    }
    return <div>HI!{this.state.downloadUrl}</div>;
  }
}
