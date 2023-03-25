import React, {useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';

import {LatLng} from 'react-native-maps';

import Map from '../../../components/Map';
import Icon from '../../../components/Icon';

import {decode} from '../../../utils';
import routeService from '../../../services/route-service';
import vetService from '../../../services/vet-service';

import styles from './style';
import {colors} from '../../../constants/colors';

export default function Vets() {
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [vets, setVets] = useState<any[]>([]);
  const [vet, setVet] = useState<any>();
  const [location, setLocation] = useState<LatLng | null>(null);
  const [routes, setRoutes] = useState<any>([]);
  const [followLocation, setFollowLocation] = useState<boolean>(true);
  const [summary, setSummary] = useState<{
    distance: number;
    duration: number;
  }>();

  const onSuccess = (res: any) => {
    setVets(() => {
      return JSON.parse(res).data?.map((x: any) => {
        return {
          ...x,
          title: x?.name ?? '',
          description: x?.street ?? '',
        };
      });
    });
  };

  const onPressedSearch = () => {
    vetService.getVets(city, country, onSuccess);
  };

  const onSuccessRoute = (res: any) => {
    setRoutes(decode(res?.routes?.[0]?.geometry));
  };

  const findRoute = () => {
    if (location && vet) routeService.getRoutes(location, vet, onSuccessRoute);
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
          value={country}
          onChangeText={setCountry}
          style={styles.input}
        />
        <Pressable style={styles.searchButton} onPress={onPressedSearch}>
          <Text>Ara</Text>
        </Pressable>
        <Text>
          Seçili Veteriner: {vet?.title}
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
        data={vets}
        followLocation={followLocation}
        setFollowLocation={setFollowLocation}
        routes={routes}
        setLocation={setLocation}
        setX={setVet}
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