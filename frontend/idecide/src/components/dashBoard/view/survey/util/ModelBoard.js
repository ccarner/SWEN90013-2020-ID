import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogContentText,
	DialogActions
} from '@material-ui/core';

function ModelBoard() {
//	const [ open, setDMOpen ] = React.useState(false); //control of adding new survey

	const handleClose = () => {
	//	setDMOpen(false);
	};

	return (
		<Dialog
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{"DELETE SURVEY?"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Are you sure to delete this survey?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleClose} color="primary" autoFocus>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ModelBoard;
