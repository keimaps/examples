import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Protocol } from 'pmtiles';
import './style.css';
// Register the pmtiles protocol
const protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

// Initialize the MapLibre GL JS map
const map = new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      'offline-tiles': {
        type: 'raster',
        url: 'pmtiles://http://localhost:3000/satellite.pmtiles',
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'offline-layer',
        type: 'raster',
        source: 'offline-tiles',
      },
    ],
  },
  center: [0, 0],
  zoom: 2,
});

// Add navigation controls
map.addControl(new maplibregl.NavigationControl());
