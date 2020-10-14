import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
} from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import StorageIcon from "@material-ui/icons/Storage";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import BallotIcon from "@material-ui/icons/Ballot";
import IconLogo from "../images/idecide-logo.png";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { getAllSurveys, getSectionBySurveyId } from "../API/surveyAPI";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import Loading from "../components/util/loading";
import SurveyLayout from "../components/dashBoard/view/survey/SurveyLayout";
import SurveySection from "../components/dashBoard/view/survey/surveyView/SurveySection";
import DCLayout from "../components/dashBoard/view/dataCollection/DCLayout";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Box, Tooltip } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import LoginPage from "../components/loginComponent/loginPage";
import RegisterPage from "../components/loginComponent/registerPage";
import AdminInfo from "../components/loginComponent/adminInfo";
import UserInfo from "../components/loginComponent/userInfo";
import Landing from "../components/Landing";
import SurveyHome from "../components/surveyComponents/surveyHome";
import { getCsvDownloadLink } from "../API/surveyResultsAPI";

const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(0),
    width: 50,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  button: {
    background: "linear-gradient(45deg, #DA76C7 30%, #8973E6 90%)",
    border: 0,
    borderRadius: 20,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    width: 170,
    [theme.breakpoints.only("xs")]: {
      width: 20,
    },
    height: 40,
    padding: "0 30px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    marginTop: "5%",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    marginTop: "5%",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { width } = props;
  const [open, setOpen] = React.useState(false);
  const [openHelp, setHelp] = React.useState(false);
  const [surveys, setSurveys] = React.useState([]);
  const [showSurvey, setShowSurvey] = React.useState(true);
  const [link, setLink] = React.useState();
  const [isAdmin, setAdmin] = React.useState(true); // handle admin sidebar display, please set in the login page with the setAdmin function(props).
  const [openDownload, setOpenDownload] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getAllSurveys();

      setIsLoading(false);

      setSurveys(result.data);
    };

    fetchData();
  }, []);

  const handleDownloadOpen = () => {
    setOpenDownload(true);
  };

  const handleDownload = async () => {
    alert(link);
    await getCsvDownloadLink();
    //	setLink(link);
  };

  const handleDowloadClose = () => {
    setOpenDownload(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setHelp(true);
  };
  const handleClose = () => {
    setHelp(false);
  };

  const handleLogOut = () => {
    setAdmin(false);
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <div>
      {!isLoading && surveys ? (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            style={{ background: "white" }}
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <Collapse in={localStorage.getItem("userType") === "admin"}>
                <Tooltip title="Dashboard Side Menu.">
                  <IconButton
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                  >
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
              </Collapse>
              <IconButton onClick={() => (window.location.href = "/")}>
                <img
                  src={IconLogo}
                  alt="IconLogo"
                  style={{ height: 35, marginTop: 0 }}
                />
              </IconButton>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
                spacing={2}
              >
                {localStorage.getItem("userType") ? (
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Button
                        onClick={handleLogOut}
                        className={clsx(classes.button)}
                      >
                        <ExitToAppIcon />
                        {isWidthUp("sm", width) ? "LOGOUT" : ""}
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Tooltip title="Get more help.">
                        <Button
                          className={clsx(classes.button)}
                          onClick={handleOpen}
                        >
                          <PhoneIcon />
                          {isWidthUp("sm", width) ? "Get Help" : ""}
                        </Button>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Click to quick exit.">
                        <Button
                          className={clsx(classes.button)}
                          onClick={() => {
                            localStorage.clear();
                            window.location.href =
                              "https://www.weather.com.au/";
                          }}
                        >
                          <ExitToAppIcon />
                          {isWidthUp("sm", width) ? "Quick Exit" : ""}
                        </Button>
                      </Tooltip>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose} style={{ width: 50 }}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />

            <Box p={3}>
              <Link to={"/navbar/surveys"}>
                <Typography variant="h6" gutterBottom>
                  DashBoard
                </Typography>
              </Link>
              <Box p={1} />
              <AccountCircle />
              Admin
            </Box>

            <Divider />
            <List>
              <NavLink
                to={"/navbar/surveys"}
                onMouseDown={() => setShowSurvey(!showSurvey)}
              >
                <ListItem button>
                  <ListItemIcon>
                    <BallotIcon />{" "}
                  </ListItemIcon>
                  <Typography color="textPrimary" gutterBottom variant="body1">
                    Surveys
                  </Typography>
                  <ListItemText />
                  {showSurvey ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
              </NavLink>
              <Collapse in={showSurvey} timeout="auto" unmountOnExit>
                {surveys &&
                  surveys.map((survey, index) => (
                    <NavLink
                      to={"/navbar/surveyId=" + survey.surveyId}
                      key={survey.surveyId}
                    >
                      <MenuItem className={classes.nested}>
                        <ListItemIcon>
                          <AssignmentIcon />
                        </ListItemIcon>
                        <Typography
                          color="textSecondary"
                          gutterBottom
                          variant="body1"
                        >
                          {survey.surveyTitle}
                        </Typography>
                      </MenuItem>
                    </NavLink>
                  ))}
              </Collapse>
              <ListItem button onClick={handleDownloadOpen}>
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <Typography color="textPrimary" gutterBottom variant="body1">
                  Download Data
                </Typography>
              </ListItem>
            </List>
          </Drawer>
          <main
            key={props.location}
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <Switch>
              <Route exact path="/navbar/surveys" component={SurveyLayout} />
              <Route
                path="/navbar/surveyId=:surveyId"
                component={SurveySection}
              />
              <Route path="/dashboard/datacollection" component={DCLayout} />
              <Route
                path="/surveyComponent/surveyHome"
                component={SurveyHome}
              />
              <Route
                path="/loginComponent/loginPage"
                render={(props) => (
                  <LoginPage
                    {...props}
                    setAdmin={setAdmin}
                    classes={classes.button}
                  />
                )}
              />
              <Route
                path="/loginComponent/registerPage"
                component={RegisterPage}
              />
              <Route path="/loginComponent/adminInfo" component={AdminInfo} />
              <Route path="/loginComponent/userInfo" component={UserInfo} />

              <Route path="/" component={Landing} />
            </Switch>
          </main>

          {/** dialog for get help */}
          <Dialog
            open={openHelp}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
            maxWidth="md"
            fullWidth
          >
            <DialogTitle id="form-dialog-title">Get Help</DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText>
                If you’re looking for help, you can call:
              </DialogContentText>
              <Typography variant="body1" gutterBottom>
                1800 RESPECT -- <a href={`tel:1800 737 732`}>1800 737 732</a>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Lifeline -- <a href={`tel:13 11 14`}>13 11 14</a>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Sexual Assault Crisis Line --{" "}
                <a href={`tel:1800 737 732`}>1800 806 292</a>
              </Typography>
              <Typography variant="body1" gutterBottom>
                QLife -- <a href={`tel:1800 184 627`}>1800 184 627</a>
              </Typography>
              <Typography variant="body1" gutterBottom>
                InTouch Multicultural Centre Against Family Violence --{" "}
                <a href={`tel:1800 737 732`}>1800 755 988</a>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Safer Community Program --{" "}
                <a href={`tel:1800 737 732`}>61 3 9035 8675</a> --{" "}
                <a href="https://safercommunity.unimelb.edu.au/">
                  safercommunity.unimelb.edu.au
                </a>
              </Typography>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} className={clsx(classes.button)}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          {/** dialog for download data*/}
          <Dialog
            open={openDownload}
            onClose={handleDowloadClose}
            aria-labelledby="max-width-dialog-title"
            maxWidth="md"
            fullWidth
          >
            <DialogTitle id="form-dialog-title">Download data</DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText>
                Click the download button to download .csv file.
              </DialogContentText>
              {link}
            </DialogContent>

            <DialogActions>
              <Button
                onClick={handleDowloadClose}
                className={clsx(classes.button)}
              >
                Cancel
              </Button>
              <Button onClick={handleDownload} className={clsx(classes.button)}>
                Download
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <Loading isLoading={isLoading} />
      )}
    </div>
  );
}

export default withWidth()(NavBar);
