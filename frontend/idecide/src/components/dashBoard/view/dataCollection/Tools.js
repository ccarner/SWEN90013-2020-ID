import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Input,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
import { CountContext, SectionSearch } from "./DCLayout";
import {
  Collapse,
  Card,
  Tooltip,
  CardContent,
  makeStyles,
  Grid,
  CardHeader,
  Divider,
} from "@material-ui/core";
import { getSectionBySurveyId } from "../../../../API/surveyAPI";

const useStyles = makeStyles({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column",
  },
});

const Tools = ({ className, ...rest }, ref) => {
  const classes = useStyles();
  const [survey, setSurvey] = React.useState("");
  const [section, setSection] = React.useState("");
  const [sectionIndex, setSectionIndex] = React.useState(0);

  //	const [ sectionSearch, setSectionSearch ] = React.useState();
  const [openSection, setOpenSection] = React.useState(false);
  const [sections, setSections] = React.useState([]);
  let surveys = useContext(CountContext);
  let { sectionSearch, setSectionSearch } = useContext(SectionSearch);

  const handleSecChange = (event) => {

    setSection(event.target.value);
    setSectionIndex(event.target.value);
    setSectionSearch(sections[event.target.value]);
  };


  const handleChange = (event) => {
    setSurvey(event.target.value);
    fetchData(event.target.value);
  };

  const fetchData = async (id) => {
    const result = await getSectionBySurveyId(id);

    setSections(result.surveySections);
    setOpenSection(true);
  };

  const handleSearch = () => {
    // TODO
  };

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader
          action={
            <Tooltip title="Currently no survey data in the DB, so this button is not working!">
              <Button variant="contained" color="primary" size="small">
                Export
              </Button>
            </Tooltip>
          }
          title={"Data Collection"}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={5}
          >
            <Grid item xs={4}>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="demo-mutiple-checkbox-label">Survey</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={survey}
                  onChange={handleChange}
                >
                  {Array.from(surveys).map((survey) => (
                    <MenuItem key={survey.surveyId} value={survey.surveyId}>
                      <ListItemText primary={survey.surveyTitle} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Collapse in={openSection}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-mutiple-checkbox-label">
                    Section
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={section}
                    onChange={handleSecChange}
                  >
                    {Array.from(sections).map((section, index) => (
                      <MenuItem
                        key={section.sectionId}
                        value={index}
                        name={index}
                      >
                        <ListItemText primary={section.sectionTitleText} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Collapse>
            </Grid>

            <Grid item xs={4}>
              <Button
                variant="contained"
                color="default"
                size="small"
                onClick={handleSearch}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

Tools.propTypes = {
  className: PropTypes.string,
};

export default Tools;
