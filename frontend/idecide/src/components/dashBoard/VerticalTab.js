import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	paper: {
		marginRight: theme.spacing(2),
		height: 500,
		width: 200
	}
}));

export default function MenuListComposition() {
	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);
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
		[ open ]
	);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<MenuList>
					<NavLink to="/dashboard/home">
						<MenuItem>
							<Typography color="textPrimary" gutterBottom variant="h6">
								DashBoard
							</Typography>
						</MenuItem>
					</NavLink>
					<NavLink to="/dashboard/survey">
						<MenuItem>
							<Typography color="textPrimary" gutterBottom variant="h6">
								Survey
							</Typography>
						</MenuItem>
					</NavLink>
					<NavLink to="/dashboard/datacollection">
						<MenuItem>
							<Typography color="textPrimary" gutterBottom variant="h6">
								Data
							</Typography>
						</MenuItem>
					</NavLink>
					<NavLink to="/dashboard/actionplan">
						<MenuItem>
							<Typography color="textPrimary" gutterBottom variant="h6">
								Action Plan
							</Typography>
						</MenuItem>
					</NavLink>
					<NavLink to="/dashboard/user">
						<MenuItem>
							<Typography color="textPrimary" gutterBottom variant="h6">
								Researcher
							</Typography>
						</MenuItem>
					</NavLink>
				</MenuList>
			</Paper>
			<div />
		</div>
	);
}
