export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  getMarkerContent(): string;
}

class Map {
  private googleMap: google.maps.Map;
  constructor(cssId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(cssId), {
      zoom: 1,
      center: { lat: 50.942771199999996, lng: 3.8780928 }
    });
  }
  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      }
    });
    const infoWindow = new google.maps.InfoWindow({
      content: mappable.getMarkerContent()
    });
    marker.addListener("click", () => {
      infoWindow.open(this.googleMap, marker);
    });
  }
}

export { Map };
