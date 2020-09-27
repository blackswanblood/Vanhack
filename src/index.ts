import * as data from './parks.json';
let map: google.maps.Map, infoWindow: google.maps.InfoWindow;


function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow();

  var currPos;
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: Position) => {
         currPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(currPos);
        infoWindow.setContent("Location found.");
        infoWindow.open(map);
        map.setCenter(currPos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  parseJson();
  
  
}

function handleLocationError(
  browserHasGeolocation: boolean,
  infoWindow: google.maps.InfoWindow,
  pos: google.maps.LatLng
) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function parseJson() {
     let stringData = JSON.stringify(data);
     let parks = JSON.parse(stringData);
     console.log(parks);
     return parks;
}

function sortDist(parkData: any, currPos: any) {

}

export { initMap };

import "./style.css"; // required for webpack
