import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconLogo from '../../../../images/idecide-logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const SurveyCard = ({ product, ...rest }) => {

  return (
    <Card
     fullwidth
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
        //  mb={3}
        >
          <Avatar
            alt="Product"
            src={IconLogo}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.surveyTitle}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {product.surveyIntroduction}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            item
          >
            <AccessTimeIcon
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {product.surveyVersion}
            </Typography>
          </Grid>
          <Grid
            item
          >
            <GetAppIcon
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {' '}
              TakenNum
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

SurveyCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default SurveyCard;
