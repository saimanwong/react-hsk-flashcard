import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import Paper from './components/Paper'
import Hsk1 from './json/hsk1.json'
import Hsk2 from './json/hsk2.json'
import Hsk3 from './json/hsk3.json'
import Hsk4 from './json/hsk4.json'
import Hsk5 from './json/hsk5.json'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      locked: false,
      reveal: false,
      hsk: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      },
      currentHsk: {
        item: '',
        x: '',
        y: ''
      },
      currentDeck: [],
      yes: [],
      no: []
    }
  }

  confirmCollection () {
    this.setState({locked: true})
    let copy = []
    let hsk = this.state.hsk

    if (hsk['1']) copy.push([...Hsk1])
    if (hsk['2']) copy.push([...Hsk2])
    if (hsk['3']) copy.push([...Hsk3])
    if (hsk['4']) copy.push([...Hsk4])
    if (hsk['5']) copy.push([...Hsk5])

    this.setState({currentDeck: copy})
    this.randomHsk(copy)
  }

  resetCollection () {
    this.setState({
      locked: false,
      reveal: false,
      hsk: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      },
      currentHsk: {
        item: '',
        x: '',
        y: ''
      },
      currentDeck: [],
      yes: [],
      no: []
    })
  }

  checkHskCheckbox () {
    for (var i in this.state.hsk) {
      if (this.state.hsk[i]) { return false }
    }
    return true
  }

  handleChange = name => event => {
    let copy = {...this.state.hsk}
    copy[name] = event.target.checked
    this.setState({ hsk: copy })
  }

  randomHsk (nextState, x) {
    let current = nextState
    if (current.length > 0) {
      const x = Math.floor(Math.random() * (current.length))
      const y = Math.floor(Math.random() * (current[x].length))
      this.setState({currentHsk: {
        item: current[x][y],
        x: x,
        y: y
      }})
    } else if (this.state.no.length > 0 || (this.state.no.length === 0 && x === 'no')) {
      this.setState({no: []})
      let copy = [...this.state.no]
      copy.push(this.state.currentHsk.item)
      current.push(copy)
      this.randomHsk(current)
    } else {
      alert('empty...')
      this.resetCollection()
    }
  }

  revealHsk () {
    if (this.state.reveal) {
      this.setState({reveal: false})
    } else {
      this.setState({reveal: true})
    }
  }

  noYes (x) {
    let copy = [...this.state.currentDeck]
    copy[this.state.currentHsk.x].splice(this.state.currentHsk.y, 1)
    if (copy[this.state.currentHsk.x].length === 0)
      copy.splice(this.state.currentHsk.x, 1)

    this.setState({
      currentDeck: copy
    })

    if (x === 'no') {
      this.setState(prevState => ({
        no: [...prevState.no, this.state.currentHsk.item]
      }))
    } else if (x === 'yes') {
      this.setState(prevState => ({
        yes: [...prevState.yes, this.state.currentHsk.item]
      }))
    } else {
      alert('something went horribly wrong...')
    }

    this.randomHsk(copy, x)
    this.setState({reveal: false})
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item sm={1} />
          <Grid item xs={12} sm={10}>
            <FormGroup row style={{justifyContent: 'center'}}>
              {Object.keys(this.state.hsk).map((item) => {
                return (
                  <FormControlLabel
                    key={'hsk' + item}
                    control={
                      <Checkbox
                        disabled={this.state.locked ? true : false}
                        checked={this.state.hsk[item]}
                        onChange={this.handleChange(item)}
                        value="item"
                      />
                    }
                    label={item}
                  />
                )
              })}
            </FormGroup>

            { !this.state.locked ?
                <Button
                  onClick={this.confirmCollection.bind(this)}
                  fullWidth
                  disabled={this.checkHskCheckbox()}
                  variant="contained"
                  size="large">
                  Confirm
                </Button>
                :
                <div>
                  <Button onClick={this.resetCollection.bind(this)} fullWidth variant="contained" size="large">
                    Reset
                  </Button>

                  <Paper
                    reveal={this.state.reveal}
                    key={this.state.currentHsk.item.id}
                    hsk={this.state.currentHsk.item}
                  />
                </div>
            }


            <div style={{disply: 'inline-block', position: 'absolute', left: 0, right: 0, bottom: 0}}>
              { this.state.locked && !this.state.reveal ?
                <Button
                  onClick={() => this.revealHsk()}
                  style={{minHeight: '20vh'}}
                  fullWidth
                  variant="contained"
                  size="large">
                  Reveal
                </Button>
                : this.state.locked && this.state.reveal ?
                <div>
                  <Button
                    onClick={() => this.noYes('no')}
                    style={{minHeight: '20vh', maxWidth: '50%'}}
                    fullWidth
                    color="secondary"
                    variant="contained"
                    size="large">
                    No
                  </Button>
                  <Button
                    onClick={() => this.noYes('yes')}
                    style={{minHeight: '20vh', maxWidth: '50%'}}
                    fullWidth
                    color="primary"
                    variant="contained"
                    size="large">
                    Yes
                  </Button>
                </div>
                :
                ''
              }
            </div>
          </Grid>

          <Grid item sm={1} />
        </Grid>
      </div>
    )
  }
}

export default App
