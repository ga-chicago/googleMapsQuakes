// define globals
const weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
const image = "images/earthquake.png"
const getData = () => {

    $.ajax({
      url: 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson',
      dataType: 'json',
      type: 'Get',
      success: (res) => {
  res.features.forEach((item) => {
     const  p = $("<p>");
     p.text(item.properties.title);
     $("#info").append(p);
})
  initializeGoogleMaps(res.features)
      },
      error: (err) => {
        console.log(err)
      }
    })

}




const initializeGoogleMaps = (res) => {

  const mapCanvas = $('#map')[0];
  const mapOptions = {
      center: {lat: 41.931929, lng: -87.698327},
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

  const map = new google.maps.Map(mapCanvas, mapOptions);
  res.forEach((item) => {

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(item.geometry.coordinates[1], item.geometry.coordinates[0]),
        map: map,
        animation: google.maps.Animation.DROP,
      })

  })// end of forEach

}

// event listener added to the window to run our callback
// function after the google maps api is loaded
google.maps.event.addDomListener(window, 'load', getData);