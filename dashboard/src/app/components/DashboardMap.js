//@flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles'


const loadGoogleMaps = (callback) => {
  const existingScript = document.getElementById('googleMaps');

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCRdtM8u87OUESqFhE1K7-kWbEPxkjZj1g&libraries=places';
    script.id = 'googleMaps';
    document.body.appendChild(script);

    script.onload = () => {
      if (callback) callback();
    };
  }

  if (existingScript && callback) callback();
};

type Props = {
    classes: any,
}
// type State = {
    
// }

const styles = theme => ({
    mapsclass: {
        height: 500,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    }

  });
  

class DashboardMap extends React.Component<Props> {
    markerImage = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

    constructor(props) {
        super(props);
        this.state = { googleMapsReady: false, maps: 'aaa' };
    }

    componentWillMount() {
        loadGoogleMaps(() => {
            // console.log('library loaded')
            const google = window.google;
            // console.log(google)

            // Work to do after the library loads.
            var home = {lat: 1.352083, lng: 103.819839}
            var map = new google.maps.Map(
                this.refs.mapref, {zoom: 12, center: home}
                );
            this.setState({ googleMapsReady: true, google, map });

            


            // var marker = new google.maps.Marker({position: uluru, map: map});
        });   
    }

  render() {
    // console.log('render', this)

    const { classes } = this.props;
    // console.log(classes)

    if (this.props.currentData != null){
        // console.log('currentData', this.props.currentData, this.state)
    }

    if (this.state.googleMapsReady === true && this.props.currentData != null){
                console.log('add marker', parseFloat(this.props.currentData.lat),
                    parseFloat(this.props.currentData.lon));

            var beachMarker = new this.state.google.maps.Marker({
                position: {
                    lat: parseFloat(this.props.currentData.lat), 
                    lng: parseFloat(this.props.currentData.lon),
                },
                map: this.state.map,
                icon: this.markerImage,
            });

            let newCenter = new this.state.google.maps.LatLng(parseFloat(this.props.currentData.lat),
              parseFloat(this.props.currentData.lon))
            this.state.map.panTo(newCenter)


    }
    return (
          <div className={classes.mapsclass} ref='mapref'>
                {/* {this.state.googleMapsReady ? <GoogleMap /> : ''} */}
          </div>
    )
  }
}

export default withStyles(styles)(DashboardMap);

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyCRdtM8u87OUESqFhE1K7-kWbEPxkjZj1g',
//   LoadingContainer: LoadingContainer
// })(MapContainer)