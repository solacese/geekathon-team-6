//@flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'


const IMAGE_WIDTH = 320
const IMAGE_HEIGHT = 320

const styles = {
  hidden: {
    display: 'none',
  },
  normalcanvas: {
    width: 400,
    color: '#aaaabb',
    background: 'white',
    padding: '2px',
    margin: '2px',
    border: '5px',
    borderColor: '#aaaabb',
    borderStyle: 'solid',
    borderRadius: '5px',      
  },
  goodcanvas: {
    width: 400,
    color: '#aaaabb',
    background: 'white',
    padding: '2px',
    margin: '2px',
    border: '5px',
    borderColor: 'green',
    borderStyle: 'solid',
    borderRadius: '5px',      
  },
  angrycanvas: {
    width: 400,
    color: '#aaaabb',
    background: 'white',
    padding: '2px',
    margin: '2px',
    border: '5px',
    borderColor: 'red',
    borderStyle: 'solid',
    borderRadius: '5px',      
  },

}


const blackWords = [
    "CONFLUENT",
]

const whiteWords = [
    "SOLACE",
]

type State = {
  imageType: string,
} 


class ImagePanel extends React.Component<Props> {
    state = {
      imageType: 'normal'
    }

    componentDidMount() {
        console.log('componentDidMount')
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        const img = this.refs.image

        img.onload = () => {
            // console.log('image width + height ',img.width, img.height)
            // console.log('canvas width + height before',ctx.width, ctx.height)
            // img.width = 200
            // img.height = 600
            ctx.width = img.width
            ctx.height = img.height
            ctx.clearRect(0,0,img.width, img.height)
            ctx.drawImage(img, 0, 0)
            // ctx.font = "40px Courier"
            // ctx.fillText(this.props.text, 210, 75)
            // console.log('canvas width + height after',ctx.width, ctx.height)
            this.paintBoxes(ctx)
        }
    }
    componentWillUpdate(){
        // console.log('componentDidMount')
    }
    // componentWillReceiveProps(newprops){
    //     console.log('componentWillReceiveProps', newprops)
    // }

    render() {
        const { classes } = this.props;
        console.log(this)

        let canvasClass = classes.normalcanvas
        if (this.state.imageType === 'ugly')
            canvasClass = classes.angrycanvas
        else if (this.state.imageType === 'good')
            canvasClass = classes.goodcanvas



        return(
        <div>
            {this.banner(this.state.imageType)}
            <canvas ref="canvas" width={320} height={320} className={canvasClass} />
            <img ref="image" src={this.props.cheese} className={classes.hidden} />

        </div>
        )
    }

    banner(mood){
        if (mood === 'ugly'){
            return(
            <Grid container>
                <Grid item xs={4}>
                  <img 
                    width="100" height="100"
                    src="https://media1.giphy.com/media/hxx5gSPUf7EAM/giphy.gif?cid=790b76115cf041de776a7a744170f5f7&rid=giphy.gif"/>
                </Grid>
                <Grid item xs={4}>
                    <span>ENEMY!!!</span>
                </Grid>
                <Grid item xs={4}>
                  <img 
                    width="100" height="100"
                    src="https://media1.giphy.com/media/hxx5gSPUf7EAM/giphy.gif?cid=790b76115cf041de776a7a744170f5f7&rid=giphy.gif"/>
                </Grid>
                <Grid item xs={12}>
     
                      <audio controls autoPlay loop
                        src="http://soundbible.com/mp3/Siren_Noise-KevanGC-1337458893.mp3"
                    />
                </Grid>
            </Grid>
            )

        }
        else if (mood === 'good'){
            return(
            <Grid container justify='space-between'>
                <Grid item xs={2}>
                    <img
                        width="50" height="50"
                        src="https://media.giphy.com/media/1lk1IcVgqPLkA/giphy.gif"/>
                </Grid>
                <Grid item xs={4}>
                  <span>FRIENDLY!!!</span>
                </Grid>
                <Grid item xs={2}>
                  <img
                    width="50" height="50"
                    src="https://media.giphy.com/media/1lk1IcVgqPLkA/giphy.gif"/>
                    </Grid>
                    <Grid item xs={12}>
              <audio controls autoPlay loop 
                   src="http://soundbible.com/mp3/Civil%20War%20Drummer%20-SoundBible.com-700036269.mp3"
              />
              </Grid>
            </Grid>
            )
        }
        else{
            return ""
        }
    }

    paintBoxes(ctx){
        this.paintPersonBoxes(ctx)
        this.paintTextBoxes(ctx)
    }

    paintPersonBoxes(ctx){
        let boxes = this.getLabelBoxes('Person')
        // console.log('paintPersonBoxes', boxes)

        ctx.fillStyle = '#aaa'
        ctx.lineWidth = 1
        ctx.strokeStyle = 'white'

        if (boxes) boxes.forEach(box => {
            // console.log('box', box)
            ctx.beginPath();
            ctx.rect(box[0], box[1], box[2], box[3])
            ctx.stroke();  
        })
    }

    paintTextBoxes(ctx){
        let boxes = this.getTextBoxes()
        console.log('getTextBoxes', boxes)


        ctx.fillStyle = '#aaa'
        ctx.lineWidth = 3
        ctx.strokeStyle = 'red'
        let imageType = 'normal'



        if (boxes) boxes.forEach(box => {
            // console.log('box', box)

            let words = box[4].split(" ")
            // console.log('blackWords', blackWords)
            // console.log('words', words)

            let blackMatch = false
            for ( let i = 0; i < words.length; i++ ) {
                // console.log(words)
                for ( let e = 0; e < blackWords.length; e++ ) {
                    if ( words[i].toUpperCase() === blackWords[e].toUpperCase() ){
                        // console.log(words[i], blackWords[e])
                        blackMatch = true;
                        imageType = 'ugly'
                        break;
                    }
                }
            }
            let whiteMatch = false
            // console.log('whiteWords', whiteWords)
            // console.log(words)
            for ( let i = 0; i < words.length; i++ ) {
                for ( let e = 0; e < whiteWords.length; e++ ) {
                    if ( words[i].toUpperCase() === whiteWords[e].toUpperCase() ){
                        // console.log(words[i], whiteWords[e])
                        whiteMatch = true;
                        if (imageType !== 'ugly')
                            imageType = 'good'

                        break;
                    }
                }
            }
            console.log('whiteMatch', whiteMatch)

            if (blackMatch === true){
                ctx.strokeStyle = 'red'
            }
            else if (whiteMatch === true){
                ctx.strokeStyle = 'green'
            }
            else{
                ctx.strokeStyle = 'white'
            }
            // console.log('match', blackMatch, whiteMatch)

            ctx.beginPath();
            ctx.rect(box[0], box[1], box[2], box[3])
            ctx.stroke();  
        })
        if (imageType !== this.state.imageType){
            console.log('Updating Image Type', this.state, imageType)
            this.setState({imageType})
        }

        // this.props.imageDetectedAction({imageType})



    }



    getLabelBoxes(type){
      
        let boxes = []        
        const {Labels} = this.props.paneData;
        // console.log('Labels', Labels)
        let index = Labels.findIndex(label => {
            return label.Name === type
        })
        if (index === -1)
            return

        let inputBoxes = Labels[index].Instances
        // console.log(index, inputBoxes)
    
    //   boxes.push([10,10,50,80])

      for (let i = 0; i < inputBoxes.length; i++){
        let box = inputBoxes[i].BoundingBox;

        // console.log('Box', box)
        let newBox = [Math.round(box.Left*IMAGE_WIDTH), Math.round(box.Top * IMAGE_HEIGHT), 
            Math.round(box.Width*IMAGE_WIDTH),
            Math.round(box.Height*IMAGE_HEIGHT) ]
        boxes.push(newBox)
      }
    //   console.log('NewBoxes', boxes)
      return(boxes)
    }


    getTextBoxes(type){
      
        let boxes = []        
        const {TextDetected} = this.props.paneData;
        // console.log('TextDetected', TextDetected)
        if (TextDetected == null)
            return boxes;

        // let inputBoxes = TextDetected[index].Instances
        // console.log(index, inputBoxes)
    
    //   boxes.push([10,10,50,80])

      for (let i = 0; i < TextDetected.length; i++){
        // console.log('Box')
        let box = TextDetected[i].Geometry.BoundingBox;

        // console.log('Box', box)
        let newBox = [Math.round(box.Left*IMAGE_WIDTH), Math.round(box.Top * IMAGE_HEIGHT), 
            Math.round(box.Width*IMAGE_WIDTH),
            Math.round(box.Height*IMAGE_HEIGHT),
            TextDetected[i].DetectedText,
         ]
        boxes.push(newBox)
      }
    //   console.log('NewBoxes', boxes)
      return(boxes)
    }



}
export default withStyles(styles)(ImagePanel);