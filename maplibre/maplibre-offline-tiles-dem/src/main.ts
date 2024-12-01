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
        url: 'pmtiles://http://localhost:45332/satellite.pmtiles',
        // tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        attribution: '©KeiMaps',
        tileSize: 256,
        maxzoom: 8,
      },
      terrainSource: {
        type: 'raster-dem',
        url: 'pmtiles://http://localhost:45332/dem.pmtiles',
        // tiles: ['http://localhost:8080/smart/{z}/{x}/{y}.png'],
        attribution: 'NASA',
        tileSize: 256,
        maxzoom: 5,
    },
    hillshadeSource: {
      type: 'raster-dem',
      url: 'pmtiles://http://localhost:45332/dem.pmtiles',
      //tiles: ['http://localhost:8080/smart/{z}/{x}/{y}.png'],
      attribution: 'NASA',
      tileSize: 256,
      maxzoom: 5,
  }
    },
    layers: [
      {
        id: 'offline-layer',
        type: 'raster',
        source: 'offline-tiles',
      },
      {
        id: 'hills',
        type: 'hillshade',
        source: 'hillshadeSource',
        layout: {visibility: 'visible'},
        paint: {'hillshade-shadow-color': '#000000'}
    }
    ],
    terrain: {
      source: 'terrainSource',
      exaggeration: 2
  },
  },
  center: [0, 0],
  zoom: 2,
});

// Add navigation controls
map.addControl(new maplibregl.NavigationControl());
