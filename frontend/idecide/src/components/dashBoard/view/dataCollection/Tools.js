import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button, FormControl, Select, InputLabel, MenuItem, Input, Checkbox, ListItemText } from '@material-ui/core';

import { Typography, Card, TextField, CardContent, makeStyles, Grid, CardHeader, Divider } from '@material-ui/core';

const useStyles = makeStyles({
	root: {},
	item: {
		display: 'flex',
		flexDirection: 'column'
	}
});

const Tools = ({ className, ...rest }) => {
	const classes = useStyles();
	const [ value, setValue ] = React.useState('');
	console.log(value);

	const handleEditTitle = (event) => {
		console.log(event.target.value);
		setValue(event.target.value);
	};

	const names = [
		'Oliver Hansen',
		'Van Henry',
		'April Tucker',
		'Ralph Hubbard',
		'Omar Alexander',
		'Carlos Abbott',
		'Miriam Wagner',
		'Bradley Wilkerson',
		'Virginia Andrews',
		'Kelly Snyder'
	];

	const [ personName, setPersonName ] = React.useState([]);

	const handleChange = (event) => {
		setPersonName(event.target.value);
	};

	return (
		<form className={clsx(classes.root, className)} {...rest}>
			<Card>
				<CardHeader
					action={
						<Button variant="contained" color="primary" size="small">
							Export
						</Button>
					}
					title={'Data'}
				/>
				<Divider />
				<CardContent>
					<Grid container container direction="row" justify="space-between" alignItems="center" spacing={5}>
						<Grid item xs={4}>
							<FormControl className={classes.formControl} fullWidth>
								<InputLabel id="demo-mutiple-checkbox-label">Survey</InputLabel>
								<Select
									labelId="demo-mutiple-checkbox-label"
									id="demo-mutiple-checkbox"
									multiple
									value={personName}
									onChange={handleChange}
									input={<Input />}
									renderValue={(selected) => selected.join(', ')}
								>
									{names.map((name) => (
										<MenuItem key={name} value={name}>
											<Checkbox checked={personName.indexOf(name) > -1} />
											<ListItemText primary={name} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
                        <Grid item xs={4}>
							<FormControl className={classes.formControl} fullWidth>
								<InputLabel id="demo-mutiple-checkbox-label">Section</InputLabel>
								<Select
									labelId="demo-mutiple-checkbox-label"
									id="demo-mutiple-checkbox"
									multiple
									value={personName}
									onChange={handleChange}
									input={<Input />}
									renderValue={(selected) => selected.join(', ')}
								>
									{names.map((name) => (
										<MenuItem key={name} value={name}>
											<Checkbox checked={personName.indexOf(name) > -1} />
											<ListItemText primary={name} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={4}>
							<Button variant="contained" color="default" size="small">
								Confirm
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</form>
	);
};

Tools.propTypes = {
	className: PropTypes.string
};

export default Tools;
