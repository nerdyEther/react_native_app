import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState('');
  const [service, setService] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission',
          'Please allow location  to use nearby search',
          [{ text: 'OK' }]
        );
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
      } catch (error) {
        Alert.alert(
          'Error',
          'Could not get your location',
          [{ text: 'OK' }]
        );
      }
    })();
  }, []);

  const searchVendors = (searchType) => {
    switch (searchType) {
      case 'location':
        if (!location.trim()) {
          Alert.alert('Error', 'Please enter a location');
          return;
        }
        break;
      case 'service':
        if (!service.trim()) {
          Alert.alert('Error', 'Please enter a service');
          return;
        }
        break;
      case 'both':
        if (!location.trim() || !service.trim()) {
          Alert.alert('Error', 'Please enter both location and service');
          return;
        }
        break;
      case 'near':
        if (!currentLocation) {
          Alert.alert('Error', 'Location services required');
          return;
        }
        break;
    }

    navigation.navigate('VendorList', {
      searchType,
      location: location || 'near',
      service,
      coordinates: currentLocation
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
     
        <Text style={styles.title}>React Native Assignment</Text>
        

       
        <Text style={styles.label}>Search by Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter city (eg. Hyderabad, Chennai)"
          value={location}
          onChangeText={setLocation}
        />
        <TouchableOpacity 
          style={[styles.button, styles.blueButton]}
          onPress={() => searchVendors('location')}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="search" size={18} color="white" />
            <Text style={styles.buttonText}>Search Location</Text>
          </View>
        </TouchableOpacity>

       
        <Text style={styles.label}>Search by Service</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter service (eg. Wash, Dry Clean)"
          value={service}
          onChangeText={setService}
        />
        <TouchableOpacity 
          style={[styles.button, styles.purpleButton]}
          onPress={() => searchVendors('service')}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="shirt" size={18} color="white" />
            <Text style={styles.buttonText}>Search Service</Text>
          </View>
        </TouchableOpacity>

      
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>MORE OPTIONS</Text>
          <View style={styles.divider} />
        </View>

      
        <TouchableOpacity
          style={[styles.button, styles.grayButton]}
          onPress={() => searchVendors('both')}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="options" size={18} color="white" />
            <Text style={styles.buttonText}>Combined Search</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.greenButton]}
          onPress={() => searchVendors('near')}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="location" size={18} color="white" />
            <Text style={styles.buttonText}>Find Nearby</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 8,
  },
  blueButton: {
    backgroundColor: '#3182CE',
  },
  purpleButton: {
    backgroundColor: '#805AD5',
  },
  grayButton: {
    backgroundColor: '#4A5568',
  },
  greenButton: {
    backgroundColor: '#38A169',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    paddingHorizontal: 12,
    color: '#666',
    fontSize: 14,
  }
});