"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const form = document.querySelector("form");
const addressInput = document.getElementById("address");
function searchAddressHandler(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    const enteredAddress = addressInput.value;
    axios_1.default
        .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=AIzaSyBtEx03QHo2HfAVBsf08TfwpfgR-wL9cj4`)
        .then((response) => {
        console.log("entrou no response + " + response.data.status);
        if (response.data.status !== "OK") {
            throw new Error("Could not fetch");
        }
        const coordinates = response.data.results[0].geometry.location;
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat, lng },
            zoom: 8,
        });
        new google.maps.Marker({ position: coordinates, map: map });
    })
        .catch((err) => {
        alert(err.message);
    });
}
form.addEventListener("submit", searchAddressHandler);
//# sourceMappingURL=app.js.map