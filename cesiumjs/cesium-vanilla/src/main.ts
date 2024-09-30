import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

// configure our tile server
const offlineImagery = new Cesium.UrlTemplateImageryProvider({
  url : 'http://localhost:8080/light/{z}/{x}/{y}.jpg',
  maximumLevel : 8
});

// Initialize the CesiumJS viewer with offline tiles
new Cesium.Viewer('cesiumContainer', {
  baseLayer: new Cesium.ImageryLayer(offlineImagery),
  baseLayerPicker: false,
  geocoder: false,
});
