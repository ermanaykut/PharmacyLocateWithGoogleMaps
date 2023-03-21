import {View, Text, Pressable, TextInput} from 'react-native';
import React, {useRef, useState} from 'react';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './style';
import Icon from '../../../components/Icon';
import {colors} from '../../../constants/colors';
import hospitalService from '../../../services/hospital-service';
import routeService from '../../../services/route-service';

interface IRegion {
  latitudeDelta: number;
  longitudeDelta: number;
  latitude: number;
  longitude: number;
}
interface IHospital {
  Ad: string;
  Adres: string;
  Email: string;
  Sehir: string;
  Tel: string;
  Website: string;
  ilce: string;
  latitude: number;
  longitude: number;
}

export default function Hospitals() {
  const [region, setRegion] = useState<IRegion>();
  const [district, setDistrict] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [hospitals, setHospitals] = useState<IHospital[]>([]);
  const [hospital, setHospital] = useState<IHospital>();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [routes, setRoutes] = useState<any>([]);
  const mapRef = useRef<MapView>(null);
  const [followLocation, setFollowLocation] = useState<boolean>(true);

  const onSuccess = (res: any) => {
    setHospitals(JSON.parse(res).data);
  };
  const onPressedSearch = () => {
    hospitalService.getHospitals(city, district, onSuccess);
  };

  const onUserLocationChange = (value: any) => {
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
          pitch: 90,
          zoom: 18,
        },
        {duration: 1000},
      );
    }
  };
  const decode: any = (t: any, e: any) => {
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

  const onSuccessRoute = (res: any) => {
    setRoutes(decode(res?.routes?.[0]?.geometry));
  };

  const findRoute = () => {
    if (location && hospital)
      routeService.getHospitals(location, hospital, onSuccessRoute);
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="İl giriniz.."
          value={city}
          onChangeText={setCity}
          style={styles.input}
        />
        <TextInput
          placeholder="İlçe giriniz.."
          value={district}
          onChangeText={setDistrict}
          style={styles.input}
        />
        <Pressable style={styles.searchButton} onPress={onPressedSearch}>
          <Text>Ara</Text>
        </Pressable>
        <Text>Seçili Hastane: {hospital?.Ad}</Text>
        <Pressable
          style={[styles.searchButton, {backgroundColor: colors.red}]}
          onPress={findRoute}>
          <Text style={{color: colors.white, fontWeight: '700'}}>
            Yol Tarifi al
          </Text>
        </Pressable>
      </View>
      <MapView
        ref={mapRef}
        region={region}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        onUserLocationChange={onUserLocationChange}
        showsTraffic
        showsPointsOfInterest
        showsCompass
        onPress={() => setFollowLocation(false)}>
        {hospitals.map(hospital => {
          return (
            <Marker
              coordinate={{
                latitude: hospital.latitude ?? 0,
                longitude: hospital.longitude ?? 0,
              }}
              title={hospital?.Ad}
              description={hospital?.Adres}
              onPress={() => setHospital(hospital)}
            />
          );
        })}
        <Polyline
          coordinates={routes}
          strokeColor={colors.aqua}
          strokeWidth={5}
        />
      </MapView>
      <Pressable
        style={styles.stopPlayButton}
        onPress={() => setFollowLocation(!followLocation)}>
        <Icon
          name={followLocation ? 'pause : matcom' : 'play : matcom'}
          size={40}
          color={colors.aqua}
        />
      </Pressable>
    </View>
  );
}