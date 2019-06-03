//@flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



const LoadingContainer = (props) => (
  <div>Fancy loading container!</div>
)

type Props = {
    classes: any,
}
type State = {
    
}

const styles = theme => ({
  });
  

export class MapContainer extends React.Component<Props> {
  render() {



    return (
      <Map google={this.props.google} zoom={12} 
        initialCenter={{
            lat: 1.352083,
            lng: 103.819839
          }}>
 
         <Marker
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={{lat: 1.352083, lng: 103.819839}} 
        />

    
      </Map>
    );
  }
}

// export default withStyles(styles)(DashboardMap);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCRdtM8u87OUESqFhE1K7-kWbEPxkjZj1g',
  LoadingContainer: LoadingContainer
})(MapContainer)