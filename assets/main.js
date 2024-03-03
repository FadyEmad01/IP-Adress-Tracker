// var map = L.map("map");

// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);
// // L.marker([51.5, -0.09]).addTo(map)
// // .bindPopup('Your Location')
// // .openPopup();

// ////////////////

// // function getLocation() {
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(showPosition);
// //     } else {
// //       console.log("Geolocation is not supported by this browser.");
// //     }
// //   }

// //   function showPosition(position) {
// //     console.log("Latitude: " + position.coords.latitude +
// //     "<br>Longitude: " + position.coords.longitude);

// //     var long = position.coords.longitude;
// //     var lat = position.coords.latitude;
// //     map.setView([lat, long], 13);
// //     L.marker([lat , long]).addTo(map);
// // //

// //   }

// //   // Call the getLocation function
// //   getLocation();

// // ////////
// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     console.log("Geolocation is not supported by this browser.");
//   }
// }

// function showPosition(position) {
//   var latitude = position.coords.latitude;
//   var longitude = position.coords.longitude;

//   // Fetch IP address
//   fetch("https://api.ipify.org?format=json")
//     .then((response) => response.json())
//     .then((data) => {
//       document.getElementById("ipAddress").textContent = data.ip;
//       return data.ip;
//     })
//     .then((ip) => {
//       // Fetch location data based on IP address
//       fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           var country = data.address.country;
//           var city = data.address.city;
//           var location = `${country}, ${city}`;
//           document.getElementById("location").textContent = location;
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });

   
//   map.setView([latitude, longitude], 13);
//    /////timezone/////
//  fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${Math.floor(Date.now() / 1000)}&key=YOUR_API_KEY`)
//  .then(response => response.json())
//  .then(data => {
//      const timeZoneId = data.timeZoneId;
//      const timeZoneName = data.timeZoneName;
//      document.getElementById('timezone').textContent = `${timeZoneName} (UTC${timeZoneOffset(timeZoneId)})`;
//  })
//  .catch(error => {
//      console.error('Error:', error);
//  });

// function timeZoneOffset(timeZoneId) {
//  const offset = new Date().toLocaleString('en', { timeZone: timeZoneId, timeZoneName: 'short' }).split(' ')[2];
//  return offset.replace(/[a-zA-Z]/g, '');
// }
//  ////
//  fetch('https://ipinfo.io/json')
//     .then(response => response.json())
//     .then(data => {
//         const isp = data.org; // ISP information is typically provided under the 'org' field
//         document.getElementById('isp').textContent = isp;
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

//   // Add marker for user's location
//   L.marker([latitude, longitude])
//     .addTo(map)
//     .bindPopup("Your Location")
//     .openPopup();
// }


// // Call the getLocation function
// getLocation();


// // Get references to the input field and search button
// const ipInput = document.getElementById('ipInput');
// const searchButton = document.getElementById('searchButton');

// // Add event listener to the search button
// searchButton.addEventListener('click', function () {
//     const ipAddress = ipInput.value.trim(); // Get the entered IP address
//     if (isValidIPAddress(ipAddress)) {
//         fetchIPAddress(ipAddress);
//     } else {
//         alert('Please enter a valid IP address.');
//     }
// });

// // Function to validate IP address format
// function isValidIPAddress(ipAddress) {
//     const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
//     return ipRegex.test(ipAddress);
// }

// // Function to fetch and display IP address information
// function fetchIPAddress(ipAddress) {
//     fetch(`https://ipinfo.io/${ipAddress}/json`)
//         .then(response => response.json())
//         .then(data => {
//             displayIPAddressInfo(data);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }

// // Function to display IP address information
// function displayIPAddressInfo(data) {
//     // Display relevant information from 'data' object
//     document.getElementById('ipInfo').textContent = `Country: ${data.country}, City: ${data.city}`;
//      // Extract latitude and longitude from data
//      const [latitude, longitude] = data.loc.split(',').map(parseFloat);

//      // Update map view to the IP address location
//      map.setView([latitude, longitude], 13);
 
//      // Add marker to the map at the IP address location
//      L.marker([latitude, longitude])
//          .addTo(map)
//          .bindPopup(`IP Address Location: ${data.ip}`)
//          .openPopup();



//          console.log("aloooo");
// }




// Initialize the map
const map = L.map("map").setView([0, 0], 2);

// Add OpenStreetMap tile layer
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Function to get user's current location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showUserLocation, handleGeoLocationError);
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

// Function to handle displaying user's location on the map
function showUserLocation(position) {
    const { latitude, longitude } = position.coords;

    // Fetch IP address
    fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("ipAddress").textContent = data.ip;
            return data.ip;
        })
        .then(ip => {
            // Fetch location data based on IP address
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                .then(response => response.json())
                .then(data => {
                    const { country, city } = data.address;
                    document.getElementById("location").textContent = `${country}, ${city}`;
                })
                .catch(error => console.error("Error fetching location data:", error));
        })
        .catch(error => console.error("Error fetching IP address:", error));

    // Set map view to user's location
    map.setView([latitude, longitude], 13);

    // Add marker for user's location
    L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup("Your Location")
        .openPopup();

    // Fetch timezone information
    fetchTimeZone(latitude, longitude);

    // Fetch ISP information
    fetchISPInfo();
}

// Function to handle geolocation errors
function handleGeoLocationError(error) {
    console.error("Error getting geolocation:", error);
}

// Function to fetch timezone information
function fetchTimeZone(latitude, longitude) {
    fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${Math.floor(Date.now() / 1000)}&key=YOUR_API_KEY`)
        .then(response => response.json())
        .then(data => {
            const { timeZoneName } = data;
            document.getElementById('timezone').textContent = `${timeZoneName} (UTC${getTimeZoneOffset(timeZoneName)})`;
        })
        .catch(error => console.error('Error fetching timezone:', error));
}

// Function to calculate timezone offset
function getTimeZoneOffset(timeZoneName) {
    const offset = new Date().toLocaleString('en', { timeZone: timeZoneName, timeZoneName: 'short' }).split(' ')[2];
    return offset.replace(/[a-zA-Z]/g, '');
}

// Function to fetch ISP information
function fetchISPInfo() {
    fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
            const isp = data.org;
            document.getElementById('isp').textContent = isp;
        })
        .catch(error => console.error('Error fetching ISP info:', error));
}

// Call function to get user's location when the page loads
getUserLocation();

// Get references to the input field and search button
const ipInput = document.getElementById('ipInput');
const searchButton = document.getElementById('searchButton');

// Add event listener to the search button
searchButton.addEventListener('click', handleSearch);

// // Function to handle IP address search
// function handleSearch() {
//     const ipAddress = ipInput.value.trim();
//     if (isValidIPAddress(ipAddress)) {
//         fetchIPAddress(ipAddress);
//     } else {
//         alert('Please enter a valid IP address.');
//     }
// }

// // Function to validate IP address format
// function isValidIPAddress(ipAddress) {
//     const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
//     return ipRegex.test(ipAddress);
// }

// // Function to fetch IP address information
// function fetchIPAddress(ipAddress) {
//     fetch(`https://ipinfo.io/${ipAddress}/json`)
//         .then(response => response.json())
//         .then(displayIPAddressInfo)
//         .catch(error => console.error('Error fetching IP address info:', error));
// }

// // Function to display IP address information
// function displayIPAddressInfo(data) {
//     document.getElementById('ipInfo').textContent = `Country: ${data.country}, City: ${data.city}`;
//     const [latitude, longitude] = data.loc.split(',').map(parseFloat);

//     // Update map view to the IP address location
//     map.setView([latitude, longitude], 13);

//     // Add marker to the map at the IP address location
//     L.marker([latitude, longitude])
//         .addTo(map)
//         .bindPopup(`IP Address Location: ${data.ip}`)
//         .openPopup();
// }
// Function to handle IP address search
function handleSearch() {
    const ipAddress = ipInput.value.trim();
    console.log("IP Address:", ipAddress); // Log the IP address for debugging
    
    if (isValidIPAddress(ipAddress)) {
        fetchIPAddress(ipAddress);
    } else {
        alert('Please enter a valid IP address.');
    }
}

// Add event listener to the search button
searchButton.addEventListener('click', handleSearch);

// Function to fetch IP address information
function fetchIPAddress(ipAddress) {
    fetch(`https://ipinfo.io/${ipAddress}/json`)
        .then(response => response.json())
        .then(displayIPAddressInfo)
        .catch(error => console.error('Error fetching IP address info:', error));


}

  // Function to display IP address information
function displayIPAddressInfo(data) {
    document.getElementById('ipInfo').textContent = `Country: ${data.country}, City: ${data.city}`;
    const [latitude, longitude] = data.loc.split(',').map(parseFloat);


    // Update map view to the IP address location
    map.setView([latitude, longitude], 13);

    // Add marker to the map at the IP address location
    L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(`IP Address Location: ${data.ip}`)
        .openPopup();
}