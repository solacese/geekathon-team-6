import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { withStyles } from '@material-ui/core/styles'



const styles = theme => {
    console.log("Theme is ", theme)
    return {
  root: {
    flexGrow: 1,
  },
  menuButton: {
  },
  title: {
    flexGrow: 1,
  },
}
}

class MyAppBar extends React.Component{
    render(){
        console.log('Buton', this);

        // const classes = styles;
        const { classes } = this.props;

        console.log('ButtonAppBar', classes)
        return (
            // <Button variant="contained" color="secondary" 
            //   onClick={() => { console.log('onClick'); this.props.onTodoClick()}}>
            //   Hello World
            // </Button>
            <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" className={classes.title}>
                    Dashboard
                </Typography>
                </Toolbar>
            </AppBar>
            </div>
        )
    }
}

// export default withTheme(MyAppBar)
export default withStyles(styles)(MyAppBar);

// export default MyAppBar
