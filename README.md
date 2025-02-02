# Nezua GIS Portal

An interactive web GIS portal for visualizing and exploring parcel data in Nezua 
## Features

- Interactive map with satellite imagery
- Parcel polygon visualization with category-based coloring
- Dynamic dimension labeling
- Responsive drawer for detailed information
- Collapsible legend
- Mobile-friendly design

## Technologies Used

- Leaflet.js for mapping
- HTML5/CSS3
- Vanilla JavaScript
- Satellite imagery from ESRI World Imagery

## Project Structure

```
project-root/
├── index.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── legend.css
│   ├── js/
│   │   ├── main.js
│   │   ├── map.js
│   │   ├── drawer.js
│   │   └── utils.js
│   ├── data/
│   │   ├── parcels.geojson
│   │   └── dimensions.geojson
│   └── images/
│       └── logo.png
└── README.md
```

## Categories

The map visualizes different land use categories:
- Condos
- Hardscape
- Hotel Site
- Paired Homes
- Single Family Homesites
- Village/Distribution

## Usage

Visit the live portal at: https://anawaz1220.github.io/nezua-gis-portal/

Interactive features:
- Click on any parcel to:
  - View detailed information in the side drawer
  - See dimension labels
  - Automatically zoom to the selected parcel
- Use the collapsible legend to understand different categories
- View satellite imagery basemap

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/[USERNAME]/nezua-gis-portal.git
```

2. Navigate to the project directory:
```bash
cd nezua-gis-portal
```

3. Open index.html in your browser or use a local server

