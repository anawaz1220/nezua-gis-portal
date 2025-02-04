// dimensionLines.js
let currentDimensionLines = [];

function styleDimensionLine() {
    return {
        color: '#2563EB', // Rich blue color
        weight: 2,
        opacity: 0.9,
        dashArray: '5, 8',
        lineCap: 'round',
        zIndexOffset: 1000
    };
}

function showDimensionLinesForPlot(plot_id) {
    clearDimensionLines();

    if (!dimensionLinesData) {
        console.log('No dimension lines data available');
        return;
    }

    const relevantLines = dimensionLinesData.features.filter(feature => 
        feature.properties.plot_id === plot_id
    );

    relevantLines.forEach(feature => {
        if (feature.geometry.type === 'MultiLineString') {
            feature.geometry.coordinates.forEach(lineCoords => {
                const latLngs = lineCoords.map(coord => [coord[1], coord[0]]);

                const dimensionLine = L.polyline(latLngs, {
                    ...styleDimensionLine(),
                    pane: 'dimensionPane'
                }).addTo(map);

                currentDimensionLines.push(dimensionLine);
            });
        }
    });
}

function clearDimensionLines() {
    currentDimensionLines.forEach(line => map.removeLayer(line));
    currentDimensionLines = [];
}