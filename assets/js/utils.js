// utils.js
function formatValue(value) {
    return value === null || value === '' ? '—' : value;
}

function getColorByCategory(category) {
    const colors = {
        'Condos': '#FF6B6B',
        'Hardscape': '#4ECDC4',
        'Hotel Site': '#45B7D1',
        'Paired Homes': '#96CEB4',
        'Single Family Homesites': '#5CB270',
        'Village/Distribution': '#FFD93D'
    };
    return colors[category] || '#4A90E2';
}

const CATEGORY_COLORS = {
    'Condos': '#FF6B6B',
    'Hardscape': '#4ECDC4',
    'Hotel Site': '#45B7D1',
    'Paired Homes': '#96CEB4',
    'Single Family Homesites': '#5CB270',
    'Village/Distribution': '#FFD93D'
};