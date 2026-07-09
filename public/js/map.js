const listing = JSON.parse(
    document.getElementById("listing-data").textContent
);

const coordinates = listing.coordinates;
const latitude = coordinates[1];
const longitude = coordinates[0];

const redIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const map = L.map("map").setView([latitude, longitude], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

L.marker([latitude, longitude], { icon: redIcon })
    .addTo(map)
    .bindPopup(`
        <strong>${listing.title}</strong><br>
        Exact location will be provided after booking.
    `)
    .openPopup();