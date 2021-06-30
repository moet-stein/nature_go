import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function CardHeader({ pic }) {
  const classes = useStyle();
  return (
    <Paper>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        ml={2}
      >
        <Box mr={1} mt={1} mb={1}>
          <Avatar
            alt={pic.author.username}
            src={pic.author.avatarUrl}
            className={classes.small}
          />
        </Box>
        <Box mt={1} mb={1}>
          <Typography color="secondary">{pic.author.username}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}
