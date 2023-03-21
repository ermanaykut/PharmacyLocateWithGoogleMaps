import {Dispatch, SetStateAction} from 'react';
import type {ViewStyle} from 'react-native';
import MapView, {LatLng, MapViewProps} from 'react-native-maps';

export interface MapProps {
  ref?: React.RefObject<MapView>;
  mapStyle?: ViewStyle;
  data: IData[];
  routes: LatLng[];
  followLocation: boolean;
  setX?: Dispatch<SetStateAction<any>>;
  setLocation: Dispatch<SetStateAction<LatLng | null>>;
  setFollowLocation: Dispatch<SetStateAction<boolean>>;
  onUserLocationChange?: (value: any) => void;
  mapZoom?: number;
  mapPitch?: number;
  mapDuration?: number;
  polylineStrokeWidth?: number;
  polylineStrokeColor?: string;
  showsCompass?: boolean;
  showsTraffic?: boolean;
  otherProperties?: MapViewProps;
}

interface IData {
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
}