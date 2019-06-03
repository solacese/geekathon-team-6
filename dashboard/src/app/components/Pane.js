import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import ImagePanel from '../containers/ImagePanelContainer'

const styles = {
  container: {
    padding: '20px',
    marginTop: '20px',
  },
  card: {
    minWidth: 275,
  },
  paneTitle:{
    background: '#aabbcc',
    minHeight: 300,


  },
  paneImage:{
    background: '#aa00bb',
    minHeight: 300,

  },
  paneMeta:{
    background: '#00bbcc',
    minHeight: 300,

  },
  title: {
    fontSize: 14,
  },
  labels: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    // height: 700,
    // paddingTop: '56.25%', // 16:9
  },
  good: {
    fontSize: 14,
    color: '#aaaabb',
    background: 'white',
    padding: '2px',
    margin: '2px',
    border: '5px',
    borderColor: 'green',
    borderStyle: 'solid',
    borderRadius: '5px',

  },
  bad: {
    fontSize: 14,
    color: '#aaaabb',
    background: 'white',
    padding: '2px',
    margin: '2px',
    border: '5px',
    borderColor: 'yellow',
    borderStyle: 'solid',
    borderRadius: '2px',

  },
  ugly: {
    fontSize: 14,
    color: '#aaaabb',
    background: 'white',
    padding: '2px',
    margin: '2px',
    border: '5px',
    borderColor: 'red',
    borderStyle: 'dashed',
    borderRadius: '5px',


  },
  ignore: {
    fontSize: 14,
    color: '#aaaabb',
    background: 'white',
    padding: '2px',
    margin: '2px',
    border: '1px',

  },
  ok: {
    fontSize: 14,
    color: '#aaaabb',
    background: 'white',
    padding: '2px',
    margin: '2px',
    border: '1px',
    borderColor: '#aaaacc',
    borderStyle: 'solid',
    borderRadius: '5px',

  },
  imageDiv: {

  },
  imagePanel:{
      minHeight: 300,
      minWidth: 300,

  }
};

// function realImgDimension(img) {
//     var i = new Image();
//     i.src = img.src;
//     return {
//         naturalWidth: i.width, 
//         naturalHeight: i.height
//     };
// }

let good = [
  "Electronics", 
  "Coat",
]

let bad = [
  "Furniture", 
]

let ugly = [
  "Meal", 
]
let ignore = [
]



class Pane extends React.Component<Props,State>{

    getBoxes(){
      

      // const {FaceDetails} = this.props.fieldData.imageFaces;
      // console.log('FaceDetails', FaceDetails)

      let boxes = []
      boxes.push([10,10,300,300])

      // for (let i = 0; i < FaceDetails.length; i++){
      //   let box = FaceDetails[i].BoundingBox;

      //   // console.log('Box', box)
      //   let newBox = [Math.round(box.Left*400), Math.round(box.Top * 300), 
      //       Math.round(box.Width*400),
      //       Math.round(box.Height*300) ]
      //   boxes.push(newBox)
      // }
      // console.log('NewBoxes', boxes)
      return(boxes)
    }
    
    
    render(){
      // console.log(this)
      
      const { classes } = this.props;

      // let imageData = "data:image/jpeg;base64, " + this.props.fieldData.image
      // let imageData = this.props.fieldData.image

      let imageData = "data:image/jpeg;base64, " + this.props.paneData.fileContent
      let labels = this.props.paneData.Labels;
      console.log('labels',labels)
      let labelOutput = labels.map((label) => {
        let labelStyle = classes.ok;
        if (good.indexOf(label.Name) !== -1 ){
            labelStyle = classes.good
        }
        else if (bad.indexOf(label.Name) !== -1 ){
            labelStyle = classes.bad
        }
        else if (ugly.indexOf(label.Name) !== -1 ){
            labelStyle = classes.ugly
        }
        else if (ignore.indexOf(label.Name) !== -1 ){
            labelStyle = classes.ignore
        }
        console.log('labelStyle', labelStyle)

        let confidence = parseFloat(label.Confidence);

        // console.log('confidence', confidence)

        // let key = 0;
        return (
          confidence > 70 ?
          <Grid item xs={3} key={label.Name} className={labelStyle}>

          {/* <Typography key={label.Name} className={classes.labels} color="textSecondary"> */}
            {label.Name}
          {/* </Typography> */}
          </Grid>
          :
          <span key={label.Name} />


        )
      })
      // console.log(labelOutput)
      // let newBoxes = this.getBoxes()
      // const params = {
      //       // boxes: [
      //       //   // [159, 40, 79, 93],
      //       //   // [300, 0, 250, 250],
      //       //   // [700, 0, 300, 25],
      //       //   // [1100, 0, 25, 300]
      //       // ],
      //       options: {
      //         colors: {
      //           normal: 'rgba(255,225,255,1)',
      //           selected: 'rgba(0,225,204,1)',
      //           unselected: 'rgba(100,100,100,1)'
      //         },
      //         style: {
      //           maxWidth: '100%',
      //           maxHeight: '90vh'
      //         }
      //       }
      //     };


      // console.log("NewBoxes", newBoxes)
      // console.log("boxes", params.boxes)



      return (
        <Paper className={classes.container}>
          <Grid container>
              <Grid item xs={12}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {this.props.paneData.s3file}
                </Typography>


              </Grid>
            <Grid item xs={12}>
               <ImagePanel cheese={imageData} paneData={this.props.paneData} text="myname" className={classes.imagepanel}/>
            </Grid>
            {/* <Grid item xs={12}>
               <CardMedia image={imageData} className={classes.media} component='img'/>
            </Grid> */}
                {labelOutput}
                <div>

        {/* <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {this.props.paneData.s3file}
            </Typography>
            <Typography variant="h5" component="h2">
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            </Typography>
            <Typography component="p">
            </Typography>
          </CardContent>
        </Card> */}

          {/* <CardMedia image={imageData} className={classes.media} component='img'/> */}
            {/* <Boundingbox image={imageData}
             boxes={newBoxes}
             options={params.options}
            /> */}

         {/* <div className={classes.imageDiv}>
            {labelOutput}
          </div> */}
            <Button size="small">More Details</Button>
          {/* <CardActions>
          </CardActions> */}

                </div>
          </Grid>
          </Paper>
      )
    }
}


export default withStyles(styles)(Pane);