const API_URL = 'http://192.168.0.105:3000/api';

export const getVendors = async (searchType, location, service, coordinates) => {
  try {
    let url = `${API_URL}/vendors/search?searchType=${searchType}`;
    
    if (location) url += `&location=${location}`;
    if (service) url += `&service=${service}`;
    if (coordinates) {
      url += `&latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return [];
  }
};

export const getVendorById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/vendors/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching vendor:', error);
    return null;
  }
};
