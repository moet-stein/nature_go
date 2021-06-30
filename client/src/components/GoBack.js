import React, { useContext } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import { FavSavContext } from '../context/FavSavContext';
import { PicsArrContext } from '../context/PicsArrContext';
import { useHistory } from 'react-router';
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
  const { setMatchedFavIdArr } = useContext(FavSavContext);
  const {
    setPicturesArr,

    setPicsIdArr,
  } = useContext(PicsArrContext);

  const goBack = () => {
    setMatchedFavIdArr([]);
    setPicturesArr([]);
    setPicsIdArr([]);
    history.goBack();
  };

  return (
    <div className={classes.marginFlex}>
      <ArrowBackIcon fontSize="large" onClick={goBack} />
    </div>
  );
};

export default GoBack;
