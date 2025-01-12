import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import VendorListScreen from './src/screens/VendorListScreen';
import VendorDetailScreen from './src/screens/VendorDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          
        />
        <Stack.Screen 
          name="VendorList" 
          component={VendorListScreen} 
          options={{ title: 'Available Vendors' }} 
        />
        <Stack.Screen 
          name="VendorDetail" 
          component={VendorDetailScreen} 
          options={{ title: 'Vendor Details' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}