import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Text, 
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getVendors } from '../api';

export default function VendorListScreen({ route, navigation }) {
  const { searchType, location, service, coordinates } = route.params;
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const vendorList = await getVendors(searchType, location, service, coordinates);
        setVendors(vendorList);
        setError(null);
      } catch (err) {
        setError('Unable to fetch vendors');
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, [searchType, location, service, coordinates]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3182CE" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle" size={40} color="#F56565" />
        <Text style={styles.messageText}>{error}</Text>
      </View>
    );
  }

  if (vendors.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="search" size={40} color="#666" />
        <Text style={styles.messageText}>No vendors found</Text>
      </View>
    );
  }

  const renderVendorCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('VendorDetail', { vendor: item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      
      <View style={styles.infoRow}>
        <Ionicons name="location" size={16} color="#666" />
        <Text style={styles.location}>{item.location}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Ionicons name="list" size={16} color="#666" />
        <Text style={styles.services}>
          {item.services.join(' • ')}
        </Text>
      </View>

      {item.distance && (
        <View style={styles.infoRow}>
          <Ionicons name="navigate" size={16} color="#3182CE" />
          <Text style={styles.distance}>
            {item.distance.toFixed(2)} km away
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={vendors}
        keyExtractor={(item) => item.id}
        renderItem={renderVendorCard}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  list: {
    padding: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  services: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  distance: {
    fontSize: 14,
    color: '#3182CE',
    marginLeft: 8,
  },
  messageText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
    textAlign: 'center',
  }
});