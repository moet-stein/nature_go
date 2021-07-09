import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import green from '@material-ui/core/colors/green';
const useStyles = makeStyles((theme) => ({
  marginFlex: {
    marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-start',
  },
}));

const GoBack = () => {
  const classes = useStyles();

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.marginFlex}>
      <ArrowBackIcon
        style={{ color: green[500] }}
        fontSize="large"
        onClick={goBack}
      />
    </div>
  );
};

export default GoBack;
