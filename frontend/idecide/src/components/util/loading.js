import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff'
	}
}));

const Loading = (isLoading) => {
	const classes = useStyles();
	return (
		<Backdrop className={classes.backdrop} open={isLoading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default Loading;
