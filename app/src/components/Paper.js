import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    marginTop: '15px',
  },
});

function PaperSheet(props) {
  const { classes, reveal, hsk } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      {
        !reveal ?
        <Typography variant="display2">
          {hsk.english}
        </Typography>
        :
        <div>
          <Typography variant="display4">
            {hsk.simChar}
          </Typography>
          <Typography variant="display2">
            {hsk.pinyin}
          </Typography>
        </div>
      }
    </Paper>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
  reveal: PropTypes.bool.isRequired,
  hsk: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
