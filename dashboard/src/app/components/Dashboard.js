//@flow

import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
// import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
// import Typography from '@material-ui/core/Typography';

import MyAppBar from './MyAppBar'
import StreamingChart from '../containers/StreamingChartContainer'
import Carousel from '../containers/CarouselContainer'
import DashboardMap from '../containers/DashboardMapContainer'


const http = require('http');
function getResource(url, callback) {
    http.get(url, res => {
        // Initialise an array
        const bufs = [];

        // Add the data to the buffer collection
        res.on('data', function (chunk) {
            bufs.push(chunk)
        });

        // This signifies the end of a request
        res.on('end', function () {
            // We can join all of the 'chunks' of the image together
            const data = Buffer.concat(bufs);

            // Then we can call our callback.
            callback(null, data);
        });
    })
    // Inform the callback of the error.
    .on('error', callback);
}
// function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
// }


var mqtt = require('mqtt')
var MQTTPattern = require("mqtt-pattern");


const styles = theme => {
  return({
      full:{
        border: 1,
        borderColor: '#FF00FF',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',

        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        // color: theme.palette.text.secondary,
        color: theme.palette.primary.main,

      },
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


type Props = {
  classes: {paper: mixed},
  onTodoClick: Function,
}

type State = {
  connections: number,
  infantry: number,
  planes: number,
  tanks: number,
}

class Dashboard extends Component<Props, State> {
    state = {
        connections: 0,
        infantry: 0,
        planes: 0,
        tanks: 0,

    }



  componentDidMount(){
    this._setupListener()
    // this._testListener()
  }

  _testListener(){
      let count = 1
       let x= setInterval(() => {
        console.log('test interval function')
        this._testgenRecord(count)
        // console.log(rec)
        if (count === 3)
          clearInterval(x)
        count = count === 4? 1: count +1;
      }, 100);
  }

  _loadUrl(url, callback){
      http.get(url, (response) => {
        let data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });
        response.on('end', function () {
            callback(data)
        });
      })
  }

  _testgenRecord(i){
      let baseName = 'http:/data/image-'

      let resource = baseName + i + ".jpeg"
      console.log(resource)

      getResource(resource, (err, data) => {
        let base64data = data.toString('base64') 

        // console.log('got it back', base64data)

        let resource = baseName + i + "-meta.json"
        // console.log(resource)
        this._loadUrl(resource, (data) => {
          let obj = JSON.parse(data)
          console.log(obj)
          obj.fileContent = base64data
          this.props.distributeData(obj)

        })
      })



      // let fname = baseName + i + ".jpeg"
      // console.log(fname)
      // // Then you 'get' your image like so:
      // getResource('fname', function (err, data) {
      //     // Handle the error if there was an error getting the image.
      //     if (err) {
      //         throw new Error(err);
      //     }
      //     // console.log('file loaded', data)
      //     let base64data = data.toString('base64') 
      //     // console.log(base64data)
      //     let image = base64data
    

      //     // req.on('response', (response) =>{
      //     //     let data = '';
      //     //     response.on('data', function (chunk) {
      //     //         console.log('data' + chunk);
      //     //         data += chunk;
      //     //     });

      //     //     response.on('end', function () {
      //     //         console.log('end', data);
      //     //     });
      //     // })

      //     // getResource('fname', function (err, data) {
      //     //     // Handle the error if there was an error getting the image.
      //     //     if (err) {
      //     //         throw new Error(err);
      //     //     }
      //     //     console.log('meta file loaded', data)
      //     //     let obj = JSON.parse(data)

      //     //     // getAddress (id) {
      //     //     //  return this.http.get("data/address.json")
      //     //     //  .map(res => res.json());
      //     //     //  }

      //     //     console.log('meta data', obj)
      //     // })
      // })



      // let isFriend = getRandomInt(2)
      // let charNo = getRandomInt(4)
      // let confidence = getRandomInt(10000)
      // let lat = 100.00
      // let lon = 45
      // let character = isFriend == 1? friends[charNo]:foes[charNo]
      // let detectedAt = new Date()
      // return {isFriend, 
      //     image,
      //     imageFaces,
      //     imageLabels,
      //     imageTexts,
      //     imageCelebrities,

      //     character, 
      //     confidence: confidence/100, 
      //     detectedAt,
      //     lat,
      //     lon,
      // }


      // })
      
  }




  _setupListener(){

    // let hosturl = 'ws://52.184.152.116:7809'
    // let options = {
    //     username: 'solaceazure',
    //     password: 'solace@123',
    //     connectTimeout: 1000,
    // }
    let hosturl = 'ws://mrq8m7h73wwf7.messaging.solace.cloud:8000'
    let options = {
        username: 'solace-cloud-client',
        password: '7jogtdlnkooikpnldenel5r7tf',
        connectTimeout: 10000,
    }


    // this.client  = mqtt.connect('ws://sgdemo2.solace.com:6002')
    this.client = mqtt.connect(hosturl, options)
    // console.log("CLIENT", this.client);

    this.client.on('error',  (err) => {
      console.log('Error Connecting to Event Mesh: ' + err)
    })

    this.client.on('connect',  () => {
      console.log('Connected to Event Mesh......')

      // events.on("platoon/+/status", function(payload, params, topic, topic_pattern) {
      //   console.log(payload, params, topic, topic_pattern);
      // });

      // this.client.on('message',  (topic, message) => {
      //     // message is Buffer
      //     console.log('messages received 1:'+ topic)
      //     this._messageListener(topic, message)
      // })        

      this.client.on('message',  (topic, message) => {
          // message is Buffer
          console.log('messages received:'+ topic)

// Destination:                            Topic 'command/broadcast/message'
// Destination:                            Topic 'hq/HQ1559114510757/image'
// Destination:                            Topic 'hq/HQ1559114510757/imageMetaData'
// Destination:                            Topic 'hq/HQ1559114510757/recognized'

          if (MQTTPattern.matches('hq/+/recognized', topic)){
            // message is Buffer
            // console.log('messages received 1:'+ topic)
            let obj = JSON.parse(message.toString())
            console.log('Image Recognized:', obj)

            this.props.distributeData(obj)

          }
          if (MQTTPattern.matches('platoon/+/image', topic)){
            console.log('Image')
            // message is Buffer
            console.log('messages received 1:'+ topic)
            let obj = JSON.parse(message.toString())
            this.props.distributeData(obj)

          }
          if (MQTTPattern.matches('platoon/+/status', topic)){
            // console.log('Status')
          }


          // let obj = JSON.parse(message.toString())
      })
      // this._topicListener('platoon/+/image')
      this._topicListener('hq/+/recognized')

      // this._topicListener('platoon/+/status')

      // this._imageListener()
      // this._connectListener()
    })
  }

  // _messageListener(topic, message){
  //     console.log('messageListener:', topic)
  //         let obj = JSON.parse(message.toString())
  //         this.props.distributeData(obj)

  // }

  _topicListener(topicName){
      this.client.subscribe(topicName, function (err) {
        if (err) {
          console.log('subscribe error:' + topicName + ':', err)
        }
      })
  }


  // _imageListener(){
  //     let topicName = 'platoon/+/image'
  //       // topicName = 'images'

  //     this.client.subscribe(topicName, function (err) {
  //       if (err) {
  //         console.log('subscribe error:', err)
  //       }
  //     })


  //     this.client.on('message',  (topic, message) => {
  //         // message is Buffer
  //         console.log('messages received 1:'+ topic)
  //         let obj = JSON.parse(message.toString())
  //         this.props.distributeData(obj)
  //       })        
  // }

  // _connectListener(){
  //     let topicName = 'platoon/+/status'

  //     this.client.subscribe(topicName, function (err) {
  //       if (err) {
  //         console.log('subscribe error:', err)
  //       }
  //     })
  //     this.client.on('message',  (topic, message) => {
  //         // message is Buffer
  //         console.log('messages received 2:'+ topic)
  //         let obj = JSON.parse(message.toString())
  //         console.log(obj)
  //         this.setState({
  //           connections: this.state.connections+ 1,
  //           infantry: this.state.infantry + parseInt(obj.numInfantry),
  //           planes: this.state.planes + parseInt(obj.numPlanes) ,
  //           tanks: this.state.tanks + parseInt(obj.numTanks),
  //         })

  //       })        
  // }


  render() {
      // console.log("render",this)

      const { classes } = this.props;

    return (
      <div>
        <MyAppBar/>
        <Grid container spacing={24}>
          <Grid container>
            <Grid item xs={3}>
              <Paper className={classes.paper}>Connections <br/>{this.state.connections}</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>Infantry <br/>{this.state.infantry}</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>Planes <br/> {this.state.planes}</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>Tanks <br/> {this.state.tanks}</Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <StreamingChart/>
          </Grid>

          <Grid item xs={12}>
            <Carousel/>
          </Grid>
          <Grid item xs={12}>
            <DashboardMap/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);