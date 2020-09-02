// Still testing and modifying. and 

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import IconLogo from '../../images/idecide-logo.png';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerContainer: {
		overflow: 'auto'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}));

export default function ClippedDrawer() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar} color="">
				<Toolbar>
					<Typography variant="h6" noWrap>
						<img src={IconLogo} alt="IconLogo" style={{ height: 40, marginTop: 10 }} />
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<Toolbar />
				<div className={classes.drawerContainer}>
					<List>
						{[ 'DashBoard', 'Researcher', 'Survey' ].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						{[ 'Account', 'Log Out' ].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									<AccountCircle />
								</ListItemIcon>
								<ListItemText primary={text} />
								<Link href="/dashboard/survey">Link</Link>
							</ListItem>
						))}
						<Link href="/dashboard/survey">Link</Link>
					</List>
				</div>
			</Drawer>
			<main className={classes.content}>
				<Toolbar />
				<Router>
					<Route path="/dashboard/user" component={ResearcherListView} />
					<Route path="/dashboard/survey" component={SurveyList} />
					
					<Grid container />
				</Router>
			</main>
		</div>
	);
}
