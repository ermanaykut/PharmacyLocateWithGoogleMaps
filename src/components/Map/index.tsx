import React, {useRef} from 'react';

import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';

import styles from './style';
import {colors} from '../../constants/colors';
import {MapProps} from './interface';

export default function Map({
  ref,
  data,
  mapStyle,
  routes,
  followLocation,
  setX,
  setLocation,
  setFollowLocation,
  onUserLocationChange,
  mapZoom = 18,
  mapPitch = 90,
  mapDuration = 1000,
  polylineStrokeColor = colors.aqua,
  polylineStrokeWidth = 5,
  showsCompass = true,
  showsTraffic = true,
  otherProperties,
}: MapProps) {
  const mapRef = useRef<MapView>(null);
  
  const _onUserLocationChange = (value: any) => {
    const {latitude, longitude, heading} = value.nativeEvent.coordinate;

    setLocation({latitude, longitude});
    if (followLocation) {
      mapRef?.current?.animateCamera(
        {
          center: {
            latitude,
            longitude,
          },
          heading,
          pitch: mapPitch,
          zoom: mapZoom,
        },
        {duration: mapDuration},
      );
    }
  };
  const userLocationChanged = (value: any) => {
    if (onUserLocationChange) onUserLocationChange(value);
    else {
      _onUserLocationChange(value);
    }
  };
  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={[styles.map, mapStyle]}
      showsUserLocation
      onUserLocationChange={userLocationChanged}
      showsTraffic={showsTraffic}
      showsCompass={showsCompass}
      onPress={() => setFollowLocation(false)}
      {...otherProperties}>
      {data.map(x => {
        return (
          <Marker
            coordinate={{
              latitude: x.latitude,
              longitude: x.longitude,
            }}
            title={x?.title}
            description={x?.description}
            onPress={() => {
              if (setX !== undefined) {
                setX(x);
              }
            }}
          />
        );
      })}
      <Polyline
        coordinates={routes}
        strokeColor={polylineStrokeColor}
        strokeWidth={polylineStrokeWidth}
      />
    </MapView>
  );
}