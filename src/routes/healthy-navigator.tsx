import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Hospitals} from '../pages';
import CustomTabBar from '../components/CustomTabBar';
import Pharmacies from '../pages/Bottom/Pharmacies';

const Tab = createBottomTabNavigator();

export default function HealtyNavigator() {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Hospitals"
        component={Hospitals}
        initialParams={{iconName: 'hospital-building : matcom'}}
      />
      <Tab.Screen
        name="Vets"
        component={Hospitals}
        initialParams={{iconName: 'dog : matcom'}}
      />
      <Tab.Screen
        name="Pharmacies"
        component={Pharmacies}
        initialParams={{iconName: 'local-pharmacy:MatIcon'}}
      />
    </Tab.Navigator>
  );
}