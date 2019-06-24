new Vue({
  el: '#app',
  data: function () {
    return {
      map: null,
      geocoder: null,
    }
  },
  methods: {
    getPlaces() {
      fetch('/places').then(res => res.json()).then(places => {
        places.forEach(place => {
          const marker = new mapboxgl.Marker();
          const popup = new mapboxgl.Popup({
            offset: 25,
          });
          popup.setHTML(
            '<pre>' + JSON.stringify(place, null, 4) + '</pre>'
          );
          marker.setLngLat([place.lng, place.lat]);
          marker.setPopup(popup);
          marker.addTo(this.map);
        });
      })
    },
  },
  mounted() {
    fetch('/token').then(res => res.json()).then(json => {
      mapboxgl.accessToken = json.token;
      this.map = new mapboxgl.Map({
        container: 'map',
        zoom: 12,
        center: [73.8567, 18.5204],
        style: 'mapbox://styles/mapbox/dark-v9',
        hash: true,
        pitch: 60,
      });
      this.geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl
      });
      this.map.addControl(this.geocoder);
      this.getPlaces();
    }).catch(() => {
      this.$notify.error({ title: 'Error', message: 'Unable to get token.' });
    })
  }
});
