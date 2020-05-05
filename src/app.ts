import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyBtEx03QHo2HfAVBsf08TfwpfgR-wL9cj4";

// declare var google: any;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event?.preventDefault();
  const enteredAddress = addressInput.value;

  // used backticks to inject dynamic code
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      console.log("entrou no response + " + response.data.status);
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch");
      }

      const coordinates = response.data.results[0].geometry.location;
      const lat = response.data.results[0].geometry.location.lat;
      const lng = response.data.results[0].geometry.location.lng;
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: { lat, lng },
        zoom: 16,
      });

      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
    });
}

form.addEventListener("submit", searchAddressHandler);
