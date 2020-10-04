import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import MailIcon from '@material-ui/icons/Mail';
import IconLogo from '../images/idecide-logo.png';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { getAllSurveys, getSectionBySurveyId } from '../API/surveyAPI';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Loading from '../components/util/loading';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: theme.spacing(0),
		width: 50
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	button: {
		background: 'linear-gradient(45deg, #DA76C7 30%, #8973E6 90%)',
		border: 0,
		borderRadius: 20,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		width: 150,
		[theme.breakpoints.only('xs')]: {
			width: 30
		},
		height: 40,
		padding: '0 30px'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	},
	nested: {
		paddingLeft: theme.spacing(4)
	}
}));

function Section(props) {
	const { sections, classes, index, show } = props;
	console.log(props);

	return (
		<Collapse in={sections} timeout="auto" unmountOnExit>
			<List>
				{sections &&
					sections.map((section, index) => (
						<ListItem button key={section} className={classes.nested}>
							<ListItemIcon>
								<AssignmentTurnedInIcon />
							</ListItemIcon>
							<ListItemText primary={section.sectionTitle} />
						</ListItem>
					))}
			</List>
		</Collapse>
	);
}

function NavBar(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [ isLoading, setIsLoading ] = useState(false);
	const { width } = props;
	const [ open, setOpen ] = React.useState(false);
	const [ openHelp, setHelp ] = React.useState(false);
	const [ surveys, setSurveys ] = React.useState([]);
	const [ sections, setSections ] = React.useState();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const result = await getAllSurveys();
			
			setIsLoading(false);
			
			setSurveys(result.data);

		};

		fetchData();
	}, []);

	console.log(surveys);

	const [ showSection, setShowSection ] = React.useState(
		surveys &&
			surveys.map((a, index) => {
			//	a.sections=Array();
				return false;
			})
	);

	const fetchData = async (index) => {
		const result = await getSectionBySurveyId(surveys[index].surveyId);
		surveys[index].sections = result.surveySections;
		const curData = [ ...showSection ];
		curData[index] = !curData[index];
		setShowSection(curData);
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

	return (
		<div>
			{!isLoading && surveys ? (
				<div className={classes.root}>
					<CssBaseline />
					<AppBar
						position="fixed"
						style={{ background: 'white' }}
						//  className={classes.navbar}
						className={clsx(classes.appBar, {
							[classes.appBarShift]: open
						})}
					>
						<Toolbar>
							{props.location.pathname !== '/navbar' ? (
								<div>aaa</div>
							) : (
								<IconButton
									color="black"
									aria-label="open drawer"
									onClick={handleDrawerOpen}
									edge="start"
									className={clsx(classes.menuButton, open && classes.hide)}
								>
									<MenuIcon />
								</IconButton>
							)}
							<IconButton onClick={() => (window.location.href = '/')}>
								<img src={IconLogo} alt="IconLogo" style={{ height: 35, marginTop: 0 }} />
							</IconButton>
							<Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
								<Grid item>
									<Button className={clsx(classes.button)} onClick={handleOpen}>
										{isWidthUp('sm', width) ? 'Get Help' : 'Help'}
									</Button>
								</Grid>
								<Grid item>
									<Button
										className={clsx(classes.button)}
										onClick={() => {
											localStorage.clear();
											window.location.href = 'https://www.weather.com.au/';
										}}
									>
										{isWidthUp('sm', width) ? 'Quick Exit' : 'Exit'}
									</Button>
								</Grid>
							</Grid>
						</Toolbar>
					</AppBar>
					<Drawer
						className={classes.drawer}
						variant="persistent"
						anchor="left"
						open={open}
						classes={{
							paper: classes.drawerPaper
						}}
					>
						<div className={classes.drawerHeader}>
							<IconButton onClick={handleDrawerClose}>
								{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
							</IconButton>
						</div>
						<Divider />
						<List>
							{surveys &&
								surveys.map((survey, index) => (
									<div key={index}>
										<ListItem button key={index} onClick={() => fetchData(index)}>
											<ListItemIcon>
												<AssignmentIcon />{' '}
											</ListItemIcon>
											<ListItemText primary={survey.surveyTitle} />
											{index}
										</ListItem>
										{/** 
									<Section
											sections={sections}
											show={showSection[index]}
											classes={classes}
											index={index}
										/>
									*/}
										<Collapse in={showSection[index]} timeout="auto" unmountOnExit>
											<List key={survey.surveyId}>
												{typeof survey.sections !== 'undefined' && survey.sections.length > 0 &&
													survey.sections.map((section, index) => (
														<ListItem button key={section} className={classes.nested}>
															<ListItemIcon>
																<AssignmentTurnedInIcon />
															</ListItemIcon>
															<ListItemText primary={section.sectionTitle} />
														</ListItem>
													))}
											</List>
										</Collapse>
									</div>
								))}
						</List>
					</Drawer>
					<main
						className={clsx(classes.content, {
							[classes.contentShift]: open
						})}
					>
						<div className={classes.drawerHeader} />
						<Typography paragraph>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo
							vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque
							non tellus. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Odio
							morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est
							ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu
							scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa
							tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
							varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
							sapien faucibus et molestie ac.
						</Typography>
						<Typography paragraph>
							Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
							facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt.
							Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
							mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate
							odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
							gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor.
							Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
							Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus
							vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
						</Typography>
					</main>
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
							<DialogContentText>If you’re looking for help, you can call:</DialogContentText>
							<Typography variant="body1" gutterBottom>
								1800 RESPECT -- <a href={`tel:1800 737 732`}>1800 737 732</a>
							</Typography>
							<Typography variant="body1" gutterBottom>
								Lifeline -- <a href={`tel:13 11 14`}>13 11 14</a>
							</Typography>
							<Typography variant="body1" gutterBottom>
								Sexual Assault Crisis Line -- <a href={`tel:1800 737 732`}>1800 806 292</a>
							</Typography>
							<Typography variant="body1" gutterBottom>
								QLife -- <a href={`tel:1800 184 627`}>1800 184 627</a>
							</Typography>
							<Typography variant="body1" gutterBottom>
								InTouch Multicultural Centre Against Family Violence --{' '}
								<a href={`tel:1800 737 732`}>1800 755 988</a>
							</Typography>
							<Typography variant="body1" gutterBottom>
								Safer Community Program -- <a href={`tel:1800 737 732`}>61 3 9035 8675</a> -- {' '}
								<a href="https://safercommunity.unimelb.edu.au/">safercommunity.unimelb.edu.au</a>
							</Typography>
						</DialogContent>

						<DialogActions>
							<Button onClick={handleClose} className={clsx(classes.button)}>
								Cancel
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
