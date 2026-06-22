const VENUE_ADDRESS = 'Jl. Springs Boulevard No.1, Gading Serpong, Tangerang';
const VENUE_NAME = 'The Springs Club - Summarecon Serpong';
const VENUE_COORDINATES = { lat: -6.2680263, lng: 106.6407564 };
const VENUE_MAP_ID = '0x2e69fb79cf699a99:0x47e6abec0c022732';

export function initMap() {
  const mapContainer = document.getElementById('map-container');
  
  const mapIframe = document.createElement('iframe');
  mapIframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.721671416506!2d${VENUE_COORDINATES.lng}!3d${VENUE_COORDINATES.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${VENUE_MAP_ID}!2s${encodeURIComponent(VENUE_NAME)}!5e0!3m2!1sen!2sid!4v1719028800000`;
  mapIframe.width = '100%';
  mapIframe.height = '100%';
  mapIframe.style.border = '0';
  mapIframe.allowFullscreen = true;
  mapIframe.loading = 'lazy';
  mapIframe.referrerPolicy = 'no-referrer-when-downgrade';
  
  mapContainer.appendChild(mapIframe);

  const directionsBtn = document.getElementById('directions-btn');
  directionsBtn.addEventListener('click', function() {
    const directionsUrl = `https://www.google.com/maps/place/The+Springs+Club+-+Summarecon+Serpong/@${VENUE_COORDINATES.lat},${VENUE_COORDINATES.lng},17z/data=!3m1!4b1!4m6!3m5!1s0x2e69fb79cf699a99:0x47e6abec0c022732!8m2!3d${VENUE_COORDINATES.lat}!4d${VENUE_COORDINATES.lng}!16s%2Fg%2F11b6swncrb`;
    window.open(directionsUrl, '_blank');
  });
}
