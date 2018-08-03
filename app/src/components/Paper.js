import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import UnicodePinyin from '../json/unicodePinyin.json';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    marginTop: '15px',
  },
});

function pinyinColorize (simChar, pinyin) {
  let tones = []

  let word = '';
  for (let i in pinyin) {
    if (!isNaN(parseInt(pinyin[i], 10))) {
      tones.push({
        tone: parseInt(pinyin[i], 10),
        index: i,
        word: word
      })
      word = '';
    } else {
      word += pinyin[i]
    }
  }
  console.log(UnicodePinyin)

  for (let i in tones) {
    let vowel = ''
    for (let j in tones[i].word) {
      if (vowel.length === 0) {
        if (tones[i].word[j] === 'a') vowel = 'a'
        else if (tones[i].word[j] === 'e') vowel = 'e'
        else if (tones[i].word[j] === 'i') vowel = 'i'
        else if (tones[i].word[j] === 'o') vowel = 'o'
        else if (tones[i].word[j] === 'u') vowel = 'u'
        else if (tones[i].word[j] === 'v') vowel = 'v'
        if (vowel.length > 0) {
          tones[i].word = tones[i].word.substr(0, j) + UnicodePinyin[vowel][tones[i].tone] + tones[i].word.substr(parseInt(j, 10)+1,tones[i].word.length)
          break;
        }
      } else break
    }
  }

  return (
    <div>
      <Typography variant="display3">
        {tones.map((item, key) => {
          return (
            <font key={key} style={{
              color: item.tone === 1 ? 'blue' :
              (item.tone === 2 ? 'green' :
                (item.tone === 3 ? 'orange' :
                  (item.tone === 4 ? 'red' : ''
                  )))
            }}>
            {simChar[key]}
          </font>
          )})}
      </Typography>
      <Typography variant="display2">
        {tones.map((item, key) => {
          return (
            <font key={key} style={{
              color: item.tone === 1 ? 'blue' :
              (item.tone === 2 ? 'green' :
                (item.tone === 3 ? 'orange' :
                  (item.tone === 4 ? 'red' : ''
                  )))
            }}>
            {item.word}
          </font>
          )})}
      </Typography>
    </div>
  )
}

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
          {pinyinColorize(hsk.simChar, hsk.pinyin)}

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
