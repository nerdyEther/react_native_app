# Mobile App

A React Native mobile application that helps users find  service vendors based on location, service type, .

![Home Screen](/screenshots/home_screen.jpg)
![Vendor List](/screenshots/vendor_list.jpg) 
![Vendor Details](/screenshots/vendor_detail.jpg)

## Features

- **Search by Location**: Find vendors in specific cities.
- **Search by Service**: Find vendors by preferred services.
- **Search by Location and Service**: Search by both location and service.
- **Nearby Search**: Find vendors closest to user's current location. (<=50Km)
- **Vendor Information**: View vendor details including:
 - Available services
 - Location
 - Distance from current location

## Getting Started


### Installation

1. Clone the repository
```
git clone https://github.com/nerdyEther/react_native_app.git
```
2. Install dependencies in both client and server folders

```
cd client
npm install

cd server
npm install
```

3. Start the Server

```
cd server
nodemon server.js
```

4. Start the Client (Expo)

```
cd client
npx expo start
```

5. Update API URL

Find your  IP address
Update the API_URL in src/api.js with your IP address

```
const API_URL = 'http://YOUR_IP_ADDRESS:3000/api';
```

### Project Structure

```
project/
├── client/
│   ├── src/
│   │   ├── screens/
│   │   │   ├── HomeScreen.js
│   │   │   ├── VendorListScreen.js
│   │   │   └── VendorDetailScreen.js
│   │   └── api.js
│   │       
│   └── App.js
└── server/
    ├── data/
    │   └── vendors.json
    └── server.js

```

