import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';

export const decode: any = (t: any, e: any) => {
  for (
    var n,
      o,
      u = 0,
      l = 0,
      r = 0,
      d = [],
      h = 0,
      i = 0,
      a = null,
      c = Math.pow(10, e || 5);
    u < t.length;

  ) {
    (a = null), (h = 0), (i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (o = 1 & i ? ~(i >> 1) : i >> 1),
      (l += n),
      (r += o),
      d.push([l / c, r / c]);
  }
  return (d = d.map(function (t) {
    return {latitude: t[0], longitude: t[1]};
  }));
};

export const askPermission = () => {
  
  let permission = false;
  if (Platform.OS === 'ios') {
  } else {
    console.log(permission);
    try {
      async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
            buttonPositive: 'Ok.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          permission = true;
        } else {
          permission = false;
        }
      };
    } catch (err) {
      console.warn(err);
    }
  }
  return permission;
};

export const getCoords = () => {
  
  const permission: boolean = askPermission();
  if (permission) {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        console.log(currentLatitude);
      },
      error => {},
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
      );
    }

};
