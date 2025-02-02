// drawer.js
function showDrawer(properties) {
    const drawer = document.querySelector('.drawer');
    const content = document.querySelector('.drawer-content');
    
    content.innerHTML = `
        <h2 style="color: var(--primary-purple); margin-bottom: 20px;">Plot Details</h2>
        <div class="property-grid">
            ${createPropertyItem('Area', properties.area_m)}
            ${createPropertyItem('Category', properties.Category)}
            ${createPropertyItem('Parking', properties.Parking)}
            ${createPropertyItem('Units', properties.Units)}
            ${createPropertyItem('Sub Category', properties.Sub_Cat)}
            ${createPropertyItem('Name', properties.Name)}
        </div>
    `;
    
    drawer.classList.add('open');
}

function hideDrawer() {
    const drawer = document.querySelector('.drawer');
    drawer.classList.remove('open');
}

function createPropertyItem(label, value) {
    return `
        <div class="property-item">
            <div class="property-label">${label}</div>
            <div class="property-value">${formatValue(value)}</div>
        </div>
    `;
}