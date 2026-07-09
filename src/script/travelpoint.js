/**
 * Render the cards of travel point
 */
const renderCards = (stats, statsContainer) => {
    let data = '';
    for (let i of stats) {
        data =
            data +
            `<div class="stat-card">
                        <h3 class="stat-card__number">${i.number}</h3>
                        <p class="stat-card__label">${i.label}</p>
                    </div>\n`;
    }
    statsContainer.innerHTML = data;
};
export { renderCards };
