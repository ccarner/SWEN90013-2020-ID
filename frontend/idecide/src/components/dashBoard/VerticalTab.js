import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import FormRow from '@material-ui/core';
import Spacer from 'react-add-space';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
// import Header from './Header';

import Menu from './Menu';

import Content from './Content';
import { Container } from 'react-bootstrap';



const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	paper: {
		marginRight: theme.spacing(2),
		height: 600,
		width: 300
	}
}));

export default function MenuListComposition() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(
		() => {
			if (prevOpen.current === true && open === false) {
				anchorRef.current.focus();
			}

			prevOpen.current = open;
		},
		[open]
	);

	return (
		// <div>

		// 	<Menu />
		// 	<Content /> */}

		// </div>
		<Grid container spacing={2}>
			<Grid container item xs={12} spacing={30}>

			</Grid>



			<Container maxWidth="sm" >

				<Paper className={classes.paper}>

					<div className={classes.root} >





						<Col>

							<MenuList>

								<Menu />

							</MenuList>


						</Col>

						<div >

							<Col  >

								{/* <Content /> */}


							</Col>



						</div>




					</div>
				</Paper >
			</Container >
		</Grid >

	);
}
