// define globals
const weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

const icon = {
   url: 'images/earthquake.png', // url
   scaledSize: new google.maps.Size(15, 15), // scaled size
   origin: new google.maps.Point(0,0), // origin
   anchor: new google.maps.Point(0, 0) // anchor
};

const initGoogleMaps = () => {
	const mapCanvas = $('#map')[0];
	const mapOptions = {
		center: {lat: 0, lng: 0},
		zoom: 1,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	const map = new google.maps.Map(mapCanvas, mapOptions);
	$.ajax({
		url: weekly_quakes_endpoint,
		type: 'GET',
		dataType: 'Json',
		success: (res) => {
			console.log(res,'success');
			for(let i = 0; i < res.features.length; i++){
				$('#info').append(`<p>${res.features[i].properties.title}</p>`);
				const marker = new google.maps.Marker({
					position: {lat: res.features[i].geometry.coordinates[1], lng: res.features[i].geometry.coordinates[0]},
					map: map,
					icon: icon,
				});
			};
		},
		error: (err) => {
			console.log(err,'error');
		}
	})
}


google.maps.event.addDomListener(window, 'load', initGoogleMaps);

