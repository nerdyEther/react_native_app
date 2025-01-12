import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function VendorDetailScreen({ route }) {
  const { vendor } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        
        <Text style={styles.title}>{vendor.name}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={18} color="#666" />
          <Text style={styles.location}>{vendor.location}</Text>
        </View>
        
       
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services Available</Text>
          {vendor.services.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <Ionicons name="checkmark-circle" size={18} color="#38A169" />
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>

       
        {vendor.distance && (
          <View style={styles.distanceContainer}>
            <Ionicons name="navigate" size={18} color="#3182CE" />
            <Text style={styles.distanceText}>
              {vendor.distance.toFixed(2)} km away
            </Text>
          </View>
        )}
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
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  serviceText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#444',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  distanceText: {
    fontSize: 16,
    color: '#3182CE',
    marginLeft: 8,
  }
});