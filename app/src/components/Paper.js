import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button'
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

          <a
            style={{textDecoration: 'none'}}
            href={`https://www.yellowbridge.com/chinese/character-stroke-order.php?word=${hsk.simChar}`}
            target="_blank">
            <Button
              style={{marginTop: '15px'}}
              fullWidth
              variant="outlined"
              size="large">
              Stroke order (new window/tab)
            </Button>
          </a>
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
