import {View, Text, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import {LatLng} from 'react-native-maps';
import {colors} from '../../../constants/colors';
import Map from '../../../components/Map';
import Icon from '../../../components/Icon';
import pharmacyService from '../../../services/pharmacy-service';
import {decode} from '../../../utils';
import routeService from '../../../services/route-service';

export default function Pharmacies() {
  const [district, setDistrict] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [pharmacies, setPharmacies] = useState<any[]>([]);
  const [pharmacy, setPharmacy] = useState<any>();
  const [location, setLocation] = useState<LatLng | null>(null);
  const [routes, setRoutes] = useState<any>([]);
  const [followLocation, setFollowLocation] = useState<boolean>(true);
  const [summary, setSummary] = useState<{
    distance: number;
    duration: number;
  }>();

  const onSuccess = (res: any) => {
    setPharmacies(() => {
      return JSON.parse(res).data?.map((x: any) => {
        return {
          ...x,
          title: x?.EczaneAdi ?? '',
          description: x?.Adresi ?? '',
        };
      });
    });
  };

  const onPressedSearch = () => {
    pharmacyService.getPharmacies(city, district, onSuccess);
  };

  const onSuccessRoute = (res: any) => {
    setRoutes(decode(res?.routes?.[0]?.geometry));
  };

  const findRoute = () => {
    if (location && pharmacy)
      routeService.getRoutes(location, pharmacy, onSuccessRoute);
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
        <Text>
          Seçili Eczane: {pharmacy?.title}{' '}
          {summary?.distance && (summary?.distance / 1000).toFixed(2)}
        </Text>
        <Pressable
          style={[styles.searchButton, {backgroundColor: colors.red}]}
          onPress={findRoute}>
          <Text style={{color: colors.white, fontWeight: '700'}}>
            Yol Tarifi al
          </Text>
        </Pressable>
      </View>

      <Map
        data={pharmacies}
        followLocation={followLocation}
        setFollowLocation={setFollowLocation}
        routes={routes}
        setLocation={setLocation}
        setX={setPharmacy}
      />
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