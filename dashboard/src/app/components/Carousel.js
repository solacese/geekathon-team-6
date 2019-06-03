//@flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import {
  // CSSTransition,
  // TransitionGroup,
} from 'react-transition-group';
// import uuid from 'uuid';
// import Button from '@material-ui/core/Button'

import Pane from '../containers/PaneContainer'

// import './styles.css';



const styles = theme => {
  // console.log('Theme', theme)
  return(
    {
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        // color: theme.palette.text.secondary,
        color: theme.palette.primary.main,
      },
    }    
  )
}

type Data = {
    key: number,
    name: string,
}
type State = {
    data: Array<Data>,
}
type Props = {
}



class Carousel extends Component<Props, State>{
    state = {
        data: [
        ]
    }


    render(){
        console.log('render', this)
        let elements = this.props.fieldData;

        // let elements = this.props.fieldData.slice(-1*ELEMENT_COUNT)
        // let elements = [
        //   {key: 0, name: 'Test 1', detectedAt: Date.now()},
        //   {key: 1, name: 'Test 2', detectedAt: Date.now()},
        //   {key: 2, name: 'Test 3', detectedAt: Date.now()},
        //   {key: 3, name: 'Test 4', detectedAt: Date.now()},
        // ]
        return(
                <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                >
                {
                elements.map((el, index)=>{
                  return(
                        <Grid key={index} item xs={12} sm={4}>
                            <Pane key={index} title={el.detectedAt} paneData={el}/>
                        </Grid>
                  )
                })}          
                {/* {
                    this.state.data == null?
                    <div/>
                    :
                    this.state.data.map((el) => {
                    return (
                        <Grid key={el.key} item xs={2}>
                            <Pane key={el.key} title={el.name} />
                        </Grid>
                    )
                })
            } */}
            </Grid>
        )
    }
}



export default withStyles(styles)(Carousel);
