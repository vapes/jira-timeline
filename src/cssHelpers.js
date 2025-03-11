/**
 * @description Get CSS class based on team name
 * @param {string} team - Team name
 * @returns {string} CSS class name
 */
export function getCSSClassByTeam(team) {
	const teamClasses = {
		Animator: 'animator',
		QA: 'qa',
		Content: 'content',
		BE: 'be',
		TAM: 'tam',
		Sound: 'sound',
		Art: 'art',
		FE: 'fe',
		Math: 'math'
	};

	return teamClasses[team] || 'hide';
}

/**
 * @description Get CSS class for timeline cell based on date and status
 * @param {Date} timelineDate - Date of the cell
 * @param {string} lastStatus - Last status of the issue
 * @returns {string} CSS class name
 */
export function getCellCSSClass(timelineDate, lastStatus) {
	const dayOfWeek = timelineDate.getDay();
	let cellClass = getCellClassByStatus(lastStatus);

	if (dayOfWeek === 0 || dayOfWeek === 6 || dayOfWeek === 5) {
		cellClass = 'weekend';
	}

	return cellClass;
}

/**
 * @description Get CSS class based on issue status
 * @param {string} status - Issue status
 * @returns {string} CSS class name
 */
export function getCellClassByStatus(status) {
	const statusClasses = {
		'In Progress': 'in-progress',
		Blocked: 'blocked',
		'In Testing': 'testing',
		'Code Review': 'review',
		'Ready for QA': 'readyqa',
		'QA Passed': 'blwh',
		'QA Blocked': 'qablocked',
		Open: 'open',
		Created: 'open',
		Done: 'open',
		'To Groom': 'open',
		Reopened: 'reopened'
	};

	return statusClasses[status] || 'hide';
}

/**
 * @description Get CSS class for month background
 * @param {Date} date - Date object
 * @returns {string} CSS class name
 */
export function getMonthCSSClass(date) {
	const month = date.getMonth();
	const months = [
		'january',
		'february',
		'march',
		'april',
		'may',
		'june',
		'july',
		'august',
		'september',
		'october',
		'november',
		'december'
	];

	return `bg-${months[month]}`;
}
