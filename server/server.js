const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());


const vendorsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'vendors.json'), 'utf8')
);


function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}


app.get('/api/vendors', (req, res) => {
  res.json(vendorsData.vendors);
});


app.get('/api/vendors/search', (req, res) => {
  const { searchType, location, service, latitude, longitude } = req.query;
  let filteredVendors = [...vendorsData.vendors];

  switch (searchType) {
    case 'location':
      filteredVendors = vendorsData.vendors.filter(v => 
        v.location.toLowerCase() === location.toLowerCase()
      );
      break;
    case 'service':
      filteredVendors = vendorsData.vendors.filter(v => 
        v.services.some(s => 
          s.toLowerCase().includes(service.toLowerCase())
        )
      );
      break;
    case 'both':
      filteredVendors = vendorsData.vendors.filter(v => 
        v.location.toLowerCase() === location.toLowerCase() &&
        v.services.some(s => 
          s.toLowerCase().includes(service.toLowerCase())
        )
      );
      break;
    case 'near':
      if (latitude && longitude) {
        filteredVendors = vendorsData.vendors
          .map(v => ({
            ...v,
            distance: calculateDistance(
              parseFloat(latitude),
              parseFloat(longitude),
              v.coordinates.latitude,
              v.coordinates.longitude
            )
          }))
          .filter(v => v.distance <= 50)  //find vendors within 50km
          .sort((a, b) => a.distance - b.distance);
      }
      break;
  }

  res.json(filteredVendors);
});


app.get('/api/vendors/:id', (req, res) => {
  const vendor = vendorsData.vendors.find(v => v.id === req.params.id);
  if (vendor) {
    res.json(vendor);
  } else {
    res.status(404).json({ message: 'Vendor not found' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
