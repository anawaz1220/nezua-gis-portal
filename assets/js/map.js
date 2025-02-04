// map.js
let map;
let currentLayer;
let dimensionsData = null;
let dimensionLinesData = null;
let currentLabels = [];

function initMap() {
    map = L.map('map', {
        zoomControl: true,
        maxZoom: 20,
        minZoom: 15
    });
    map.createPane('dimensionPane');
    map.getPane('dimensionPane').style.zIndex = 650;

    // Adding satellite basemap
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);

    // Initialize map and legend
    Promise.all([
        fetch('./assets/data/lots.geojson').then(resp => resp.json()),
        fetch('./assets/data/dimensions.geojson').then(resp => resp.json()),
        fetch('./assets/data/dimension_lines.geojson').then(resp => resp.json())
    ]).then(([parcelsData, pointsData, linesData]) => {
        // Store both dimensions data
        dimensionsData = pointsData;
        dimensionLinesData = linesData;
    
        // Add parcels layer
        const geoJsonLayer = L.geoJSON(parcelsData, {
            style: stylePolygon,
            onEachFeature: onEachFeature,
            pane: 'overlayPane'
        }).addTo(map);
    
        // Initialize legend
        new MapLegend(CATEGORY_COLORS);
    
        // Fit map to parcels bounds
        map.fitBounds(geoJsonLayer.getBounds(), {
            padding: [50, 50]
        });
    });

    // Close drawer and clear labels when clicking outside
    map.on('click', function(e) {
        if (currentLayer) {
            currentLayer.setStyle({ weight: 2 });
            currentLayer = null;
        }
        hideDrawer();
        clearLabels();
        clearDimensionLines();
    });
}

function stylePolygon(feature) {
    return {
        fillColor: getColorByCategory(feature.properties.Category),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}

function onEachFeature(feature, layer) {
    layer.on('click', function(e) {
        if (currentLayer) {
            currentLayer.setStyle({ weight: 2 });
        }
        layer.setStyle({ weight: 4 });
        currentLayer = layer;
        
        const bounds = layer.getBounds();
        map.flyToBounds(bounds, {
            padding: [50, 50],
            duration: 0.8,
            maxZoom: 19
        });
        
        showDrawer(feature.properties);
        showLabelsForPlot(feature.properties.plot_id);
        showDimensionLinesForPlot(feature.properties.plot_id);
        
        L.DomEvent.stopPropagation(e);
    });
}
function showLabelsForPlot(plot_id) {
    // Clear existing labels
    clearLabels();

    if (!dimensionsData) return;

    // Filter points for the selected plot
    const relevantPoints = dimensionsData.features.filter(feature => 
        feature.properties.plot_id === plot_id
    );

    relevantPoints.forEach(point => {
        const coords = point.geometry.coordinates;
        const text = point.properties.Text;
        const angle = point.properties.angle;
        
        // const label = L.divIcon({
        //     className: 'custom-label',
        //     html: `<div style="transform: rotate(${angle}deg);">${text}</div>`
        // });
        const label = L.divIcon({
            className: 'custom-label',
            html: `<div>${text}</div>`
        });

        const labelMarker = L.marker([coords[1], coords[0]], {
            icon: label,
            zIndexOffset: 1000
        }).addTo(map);

        currentLabels.push(labelMarker);
    });
}

function clearLabels() {
    currentLabels.forEach(label => map.removeLayer(label));
    currentLabels = [];
}