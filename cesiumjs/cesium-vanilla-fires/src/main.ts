import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import './style.css';

// configure our tile server
const offlineImagery = new Cesium.UrlTemplateImageryProvider({
  // url : 'http://localhost:8080/satellite_grey/{z}/{x}/{y}.jpg',
  url : 'https://test.keikaki.com/satellite_grey/{z}/{x}/{y}.jpg',
  maximumLevel : 8,
  tileWidth : 512,
});

// Initialize the CesiumJS viewer with offline tiles
const viewer = new Cesium.Viewer('cesiumContainer', {
  baseLayer: new Cesium.ImageryLayer(offlineImagery),
  geocoder: false,
  baseLayerPicker: false,
});

viewer.scene.skyAtmosphere.atmosphereLightIntensity  = 0.0;
viewer.scene.globe.showGroundAtmosphere  = false;
viewer.scene.globe.enableLighting = false;
viewer.scene.skyBox.destroy();
viewer.scene.skyBox = undefined;
viewer.scene.sun.destroy();
viewer.scene.sun = undefined;
viewer.scene.moon.destroy();
viewer.scene.moon = undefined;
viewer.scene.backgroundColor = new Cesium.Color(1.0, 1.0, 1.0, 0.0);
const singleTileProvider = Cesium.ImageryLayer.fromProviderAsync(
  Cesium.SingleTileImageryProvider.fromUrl(
    './output.png',
    {
      rectangle: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90) ,
    }
  )
);
viewer.imageryLayers.add(singleTileProvider);
// Create a SingleTileImageryProvider for the output.png


//viewer.imageryLayers.add(singleTileProvider);
// Add the single tile layer on top of the base layer
//viewer.imageryLayers.addImageryProvider(singleTileProvider);

// Optional: Adjust the alpha (transparency) of the single tile layer if needed
const singleTileLayer = viewer.imageryLayers.get(1); // The single tile layer is the second layer (index 1)
singleTileLayer.alpha = 0.5; // Adjust this value between 0 and 1 for desired transparency
