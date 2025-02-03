// drawer.js
function showDrawer(properties) {
    const drawer = document.querySelector('.drawer');
    const content = document.querySelector('.drawer-content');
    const legend = document.querySelector('.map-legend');
    
    // Collapse legend when drawer opens
    if (legend && !legend.classList.contains('collapsed')) {
        legend.classList.add('collapsed');
    }
    
    content.innerHTML = `
        ${window.innerWidth <= 768 ? '<div class="drawer-pull"></div>' : ''}
        <div class="drawer-header">
            <h2 class="drawer-title">Plot Details</h2>
            <button class="drawer-close" onclick="hideDrawer()">
                <i class="material-icons">close</i>
            </button>
        </div>
        <div class="property-grid">
            ${createPropertyItems(properties)}
        </div>
    `;
    
    drawer.classList.add('open');
    setupDrawerInteractions(drawer);
}

function hideDrawer() {
    const drawer = document.querySelector('.drawer');
    drawer.classList.remove('open');
}

function createPropertyItems(properties) {
    const items = [
        { 
            label: 'Area', 
            value: properties.area_m, 
            icon: 'square_foot'
        },
        { 
            label: 'Category', 
            value: properties.Category, 
            icon: 'category',
            isChip: true,
            chipColor: getCategoryColor(properties.Category)
        },
        { 
            label: 'Parking', 
            value: properties.Parking || 'N/A', 
            icon: 'local_parking'
        },
        { 
            label: 'Units', 
            value: properties.Units || 'N/A', 
            icon: 'apartment'
        },
        { 
            label: 'Sub Category', 
            value: properties.Sub_Cat || 'N/A', 
            icon: 'layers'
        },
        { 
            label: 'Name', 
            value: properties.Name || 'N/A', 
            icon: 'label'
        }
    ];

    return items.map(item => createPropertyItem(item)).join('');
}

function createPropertyItem({ label, value, icon, isChip, chipColor }) {
    const formattedValue = isChip 
        ? `<div class="property-chip" style="background-color: ${chipColor || 'var(--primary-purple)'}">${value}</div>`
        : `<div class="property-value">${value}</div>`;

    return `
        <div class="property-item">
            <div class="property-label">
                <i class="material-icons">${icon}</i>
                ${label}
            </div>
            ${formattedValue}
        </div>
    `;
}

function formatArea(area) {
    if (!area) return 'N/A';
    // Format area with comma separators and 2 decimal places
    return Number(area).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) + ' m²';
}

function getCategoryColor(category) {
    // Use the same colors as defined in utils.js
    return CATEGORY_COLORS[category] || '#4A90E2';
}

function setupDrawerInteractions(drawer) {
    if (window.innerWidth > 768) return; // Only for mobile

    let startY = 0;
    let currentY = 0;
    
    const handleTouchStart = (e) => {
        startY = e.touches[0].clientY;
        currentY = startY;
    };
    
    const handleTouchMove = (e) => {
        currentY = e.touches[0].clientY;
        const diff = currentY - startY;
        
        if (diff > 50) {
            hideDrawer();
            removeListeners();
        }
    };
    
    const removeListeners = () => {
        drawer.removeEventListener('touchstart', handleTouchStart);
        drawer.removeEventListener('touchmove', handleTouchMove);
    };
    
    drawer.addEventListener('touchstart', handleTouchStart);
    drawer.addEventListener('touchmove', handleTouchMove);
}