import { h, Component } from 'preact';
import style from './style';

import Telemetry from '../../components/telemetry';

import { Hive } from 'volons';

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import config from '../../config';

const MyMapComponent = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${ config.GoogleMapApiKey }&v=3.exp&libraries=geometry,drawing`,
        loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div class={ style.mapContainer } />,
            mapElement: <div style={{ height: `100%` }} />,
            defaultPosition: { lat:0, lng: 0 },
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
<GoogleMap
    defaultMapTypeId={ google.maps.MapTypeId.SATELLITE }
    defaultZoom={18}
    center={ props.center } >
    {props.isMarkerShown && <Marker position={ props.position } icon={ props.icon }/>}
</GoogleMap>
)

export default class Home extends Component {
    state = {
        hive: {
            status: 'connecting',
            connectionString: config.HiveConnectionString
        },
        mapMarker: {
            connected: false,
            position: { lat: 0, lng: 0 },
            center: { lat: 47.478583, lng: 4.339478 },
            icon: this.generateDroneMarkerIcon(),
        },
        telemetry: {
            connected: false
        }
    };

    generateDroneMarkerIcon() {
      if ( this.state.telemetry && this.state.telemetry.connected === false )
        return;

      const hdg = ( this.state.telemetry && this.state.telemetry.position.hdg ) || 0;

      const canvas = document.createElement( 'canvas' );
      canvas.width = 40;
      canvas.height = 40;

      const ctx = canvas.getContext( '2d' );

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FF0000';

      ctx.save();
      ctx.translate( canvas.width / 2, canvas.height / 2 );
      ctx.rotate( hdg * Math.PI / 180 );
      ctx.translate( -canvas.width / 2, -canvas.height / 2 );
      ctx.beginPath();
      ctx.moveTo( 20, 5 );
      ctx.lineTo( 30, 30 );
      ctx.lineTo( 20, 25 );
      ctx.lineTo( 10, 30 );
      ctx.lineTo( 20, 5 );
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      return canvas.toDataURL();
    }

    async componentDidMount() {
        let hive;
        let connect = async () => {
            try {
                hive = new Hive( config.HiveConnectionString );
                await hive.connect();
            } catch ( err ) {
                this.setState( {
                    hive: { status: 'connecting (retry)' }
                } );
            }

            if ( hive._ws.readyState === 1 ) {
                this.setState( {
                    hive: { status: 'Connected' }
                } );

                hive.on( 'telemetry', ( data ) => {
                  //console.log( 'telemetry', data.dev.position.hdg );
                    const telemetry = data.dev;
                    this.setState( {
                        telemetry: data.dev,
                        mapMarker: {
                            ...this.state.mapMarker,
                            position: { lng: data.dev.position.lon, lat: data.dev.position.lat },
                            icon: this.generateDroneMarkerIcon( data.dev.position.hdg )
                        }
                    } );

                    if ( !this.state.mapMarker.connected ) {
                        this.setState( {
                            mapMarker: {
                                ...this.state.mapMarker,
                                center: { lng: data.dev.position.lon, lat: data.dev.position.lat },
                                connected: true,
                                icon: this.generateDroneMarkerIcon( data.dev.position.hdg )
                            } } );
                    }
                } );

            } else {
                this.setState( { hive: { status: "The connection to the Hive is closed or couldn't be opened." } } );
                window.setTimeout( connect(), 2000 );
            }
        };
        await connect();
    }

    componentWillUnmount() { }

    render() {

        return (
            <div class={style.connection}>
                <div class={ style.hiveStatus }>{ this.state.hive.status }</div>
                <Telemetry telemetry={ this.state.telemetry } />
                <MyMapComponent isMarkerShown
                    center={ this.state.mapMarker.center }
                    position={ this.state.mapMarker.position }
                    icon={ this.state.mapMarker.icon }
                />
            </div>
            );
        }
}
