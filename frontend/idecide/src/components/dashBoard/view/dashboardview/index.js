import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Survey from './Survey';
import RecordDiagram from './RecordDiagram';
import InDangerPer from './InDangerPer';
import WomenNum from './WomenNum';
import TotalTakenTimes from './TotalTakenTimes';
import TrafficByDevice from './TrafficByDevice';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3)
	}
}));

const Dashboard = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Container maxWidth={false}>
				<Grid container spacing={3}>
					<Grid item lg={3} sm={6} xl={3} xs={12}>
						<Survey />
					</Grid>
					<Grid item lg={3} sm={6} xl={3} xs={12}>
						<WomenNum />
					</Grid>
					<Grid item lg={3} sm={6} xl={3} xs={12}>
						<InDangerPer />
					</Grid>
					<Grid item lg={3} sm={6} xl={3} xs={12}>
						<TotalTakenTimes />
					</Grid>
					<Grid item lg={8} md={12} xl={9} xs={12}>
						<RecordDiagram />
					</Grid>
					<Grid item lg={4} md={6} xl={3} xs={12}>
						<TrafficByDevice />
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Dashboard;
