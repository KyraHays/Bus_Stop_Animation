mapboxgl.accessToken = 'pk.eyJ1Ijoia3lyYWhheXMiLCJhIjoiY2t3bDVibTBjMXluOTMxcWI0dmxibzVkcCJ9.wLmNYLugQK_15R8nbhyGsw';

  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kyrahays/ckwlj7jih0bn014phgjomo603',
    center: [-71.104081, 42.365554],
    zoom: 14,
  
  });
  
  async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);

	// timer
	setTimeout(run, 15000);
}


async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}


let busStops = [];

function newMarker(locations) {
	for (let i=0; i <= locations.length-1; i++){
	var marker = new mapboxgl.Marker()
	.setLngLat([
		locations[i].attributes.longitude,
		locations[i].attributes.latitude,
	])
	.addTo(map);
	busStops.push(marker);
}
return busStops;
}
run();