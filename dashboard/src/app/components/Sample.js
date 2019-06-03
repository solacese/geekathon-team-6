import React from 'react';
import Button from '@material-ui/core/Button';

// import { withTheme } from '@material-ui/core/styles';


class Sample extends React.Component {
  render() {
      console.log(this)
    return (
      <div>
        Hello World<br/>
        Hello World<br/>
        Hello World<br/>
        Hello World<br/>
        Hello World<br/>

      <Button variant="contained" color="primary" 
        onClick={() => { console.log('onClick'); this.props.onTodoClick()}}>
      Hello World
    </Button>
    <Button variant="contained" color="secondary">
      Hello World
    </Button>
    </div>
    );
  }
}


export default Sample;
