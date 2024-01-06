import styled from 'styled-components';
import { withGoogleMap, GoogleMap, Marker, withScriptjs } from 'react-google-maps';
import Spinner from "../ui/spinner";
import { media } from '../style/theme';
import styles from './google-map-styles.json';

const Container = styled.div`
  padding-top: 60%;
  height: 100%;
  position: relative;
  ${media.tablet`
    padding-top:50%;
  `};
  ${media.desktop`
    padding-top:30%;
  `};
  ${media.phone`
    padding-top:80%;
  `};

  & > div {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    width: 100%;
    height: 100%;
  }
`;

const AsyncGoogleMap = withScriptjs(withGoogleMap(() => {
  const p = {
    defaultZoom: 17,
    defaultCenter: {
      lat: 41.040815,
      lng: 28.927332,
    },
    defaultOptions: {
      scrollwheel: false,
      styles,
    },
    place: false,
  };
  const marker = {
    position: {
      lat: 41.040815,
      lng: 28.927332,
    },
    icon: '/static/mapmarker.png',
    defaultAnimation: 2,
  };
  return (
    <GoogleMap {...p}>
      <Marker {...marker} />
    </GoogleMap>
  );
}));

const key = 'AIzaSyBdv7H_C1K0t6F4t_9vKp6lD2FzBZuhJEE';

const ConfiguredGoogleMap = () => {
  const props = {
    loadingElement: <Spinner />,
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${key}&language=tr`,
    containerElement: <Container />,
    mapElement: <div style={{ zIndex: 2 }} />,
    location: {
      lat: 41.040815,
      lng: 28.927332,
    },
    styles,
  };
  return <AsyncGoogleMap {...props} />;
};

export default ConfiguredGoogleMap;
