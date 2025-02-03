// legend.js
class MapLegend {
    constructor(categories) {
        this.categories = categories;
        this.isCollapsed = false;
        this.init();
    }

    init() {
        this.createLegendElement();
        this.addEventListeners();
    }

    createLegendElement() {
        const legend = document.createElement('div');
        legend.className = 'map-legend';
        
        legend.innerHTML = `
            <div class="legend-header">
                <span>Legend</span>
                <div class="legend-toggle">
                    <span class="legend-toggle-text">Collapse</span>
                    <span class="legend-toggle-icon">▼</span>
                </div>
            </div>
            <div class="legend-content">
                ${this.createLegendItems()}
            </div>
        `;
        
        document.body.appendChild(legend);
        this.element = legend;
    }

    createLegendItems() {
        return Object.entries(this.categories)
            .map(([category, color]) => `
                <div class="legend-item">
                    <div class="legend-color" style="background-color: ${color};"></div>
                    <div class="legend-label">${category}</div>
                </div>
            `)
            .join('');
    }

    addEventListeners() {
        const header = this.element.querySelector('.legend-header');
        header.addEventListener('click', () => this.toggleCollapse());
    }

    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
        this.element.classList.toggle('collapsed');
        
        const toggleText = this.element.querySelector('.legend-toggle-text');
        toggleText.textContent = this.isCollapsed ? 'Expand' : 'Collapse';
    }

    collapse() {
        if (!this.isCollapsed) {
            this.toggleCollapse();
        }
    }

    expand() {
        if (this.isCollapsed) {
            this.toggleCollapse();
        }
    }
}