import React, { Component } from "react";
import {
  getAllImageNames,
  deleteImage,
  getStaticImageUrlFromName,
  addImageForSurvey,
} from "../../../../API/surveyAPI";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Divider from "@material-ui/core/Divider";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
} from "@material-ui/core";
import { DeleteForeverIcon } from "@material-ui/icons/DeleteForever";
import PrimaryButton from "./../../../reusableComponents/PrimaryButton";
import PrimaryButtonContrast from "./../../../reusableComponents/primaryButtonContrast";

export default class imageManagementView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedImageList: false,
      imageList: null,
      imageUploadDialogOpen: false,
      newImageName: "",
      uploadingImage: null,
    };
    this.uploadImage = this.uploadImage.bind(this);
  }

  componentDidMount() {
    getAllImageNames().then((response) => {
      this.setState({ imageList: response.data, loadedImageList: true });
    });
    //TODO: this is a hack while the getAllImageNames API still has cors issues
    this.setState({
      imageList: [
        "123.jpg",
        "1305421023604248576.JPG",
        "50.png",
        "null.png",
        "iconPrioritiesSurvey.png",
        "1302863810511638528.jpg",
        "iconSafetySurvey.png",
        "1303880142719946752.JPG",
        "5.png",
        "1305799574060929024.png",
        "1305421023604248576.png",
        "1314207316417056768.jpg",
        "1306080679989219328.JPG",
        "1302821302398226432.jpg",
        "4.png",
        ".git",
        "1306390151383093248.png",
        "1305100263929024512.jpg",
        "iconCompleted.png",
        "1307963397173809152.jpg",
        "1305755655654739968.JPG",
        "1314207316417056768.png",
        "1305755655654739968.png",
        "1302851796569559040.jpg",
        "1305799574060929024.jpg",
        "1305865825013600256.JPG",
        "2.png",
        "1302819594389557248.jpg",
        "1.png",
        "null.JPG",
        "1306390114573881344.jpg",
        "iconRelationshipSurvey.png",
        "1305842719125540864.JPG",
        "13057556556547399681305755655654739968.png",
        "1303880142719946752.png",
      ],
      loadedImageList: true,
    });
  }

  async uploadImage() {
    let formData = new FormData();
    formData.set("img", this.state.uploadingImage);
    formData.set("name", this.state.newImageName);
    await addImageForSurvey(formData);
    this.setState({ newImageName: "", uploadingImage: null });
  }

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.state.imageUploadDialogOpen}
          onClose={() => {
            this.setState({ imageUploadDialogOpen: false });
          }}
          fullWidth
        >
          <DialogTitle id="form-dialog-title">Upload image</DialogTitle>
          <Divider />
          <DialogContent>
            <div style={{ padding: "2em" }}>
              <input
                type="file"
                name="img"
                multiple="multiple"
                onChange={(event) => {
                  this.setState({
                    uploadingImage: event.target.files[0],
                    newImageName: event.target.files[0].name,
                  });
                }}
              />
            </div>
            <div>
              <TextField
                fullWidth
                value={this.state.newImageName || ""}
                onChange={(event) => {
                  this.setState({ newImageName: event.target.value });
                }}
                label="Name of Image"
                helperText="make sure to include the extension"
                variant="outlined"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <PrimaryButton
              onClick={() => {
                this.setState({ imageUploadDialogOpen: false });
              }}
            >
              Close
            </PrimaryButton>

            <PrimaryButton onClick={this.uploadImage}>Upload</PrimaryButton>
          </DialogActions>
        </Dialog>
        <div>
          <PrimaryButtonContrast
            onClick={() => {
              this.setState({ imageUploadDialogOpen: true });
            }}
          >
            Upload new image
          </PrimaryButtonContrast>
        </div>
        <div
          style={{
            margin: "1rem",
            justifyContent: "center",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gridGap: "1rem",
          }}
        >
          {this.state.loadedImageList &&
            this.state.imageList.map((imageName) => {
              return (
                <Card style={{ maxWidth: "300px" }}>
                  <CardMedia
                    style={{ minHeight: "300px" }}
                    image={getStaticImageUrlFromName(imageName)}
                    title={imageName}
                  />
                  <CardContent>
                    <Typography> Image name : {imageName}</Typography>
                    <PrimaryButton
                      onClick={(imageName) => {
                        deleteImage(imageName);
                      }}
                    >
                      Delete Image
                    </PrimaryButton>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </React.Fragment>
    );
  }
}
