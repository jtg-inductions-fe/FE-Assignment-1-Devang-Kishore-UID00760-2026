/**
 * Compacts the number into shorthand form.
 * @param {number} statNumber - number which needs to be compacted
 */
const compactNumber = (statNumber) => {
    const formatter = new Intl.NumberFormat('en', { notation: 'compact' });
    if (statNumber < 100) {
        return statNumber;
    } else if (statNumber < 1000) {
        return statNumber - (statNumber % 100) == statNumber
            ? statNumber
            : `${statNumber - (statNumber % 100)}+`;
    }
    return formatter.format(statNumber);
};

/**
 * Render the cards of travel point
 * @param {Object} stats - data of stats
 * @param {string} statsContainer - container in which stats need to rendered.
 */
const renderCards = (stats, statsContainer) => {
    stats.forEach((statObject) => {
        let container = document.createElement('div');
        container.className = 'stat-card';
        let heading = document.createElement('h3');
        heading.textContent = `${compactNumber(statObject.number)}`;
        heading.className = 'stat-card__number';
        let paragraph = document.createElement('p');
        paragraph.textContent = `${statObject.label}`;
        paragraph.className = 'stat-card__label';
        container.append(heading, paragraph);
        statsContainer.append(container);
    });
};
export default renderCards;
