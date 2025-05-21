type TeamName = 'Animator' | 'QA' | 'Content' | 'BE' | 'TAM' | 'Sound' | 'Art' | 'FE' | 'Math';
type StatusName =
	| 'In Progress'
	| 'Blocked'
	| 'In Testing'
	| 'Code Review'
	| 'Ready for QA'
	| 'QA Passed'
	| 'QA Blocked'
	| 'Open'
	| 'Created'
	| 'Reopened';

/**
 * @description Get CSS class based on team name
 */
export function getCSSClassByTeam(team: string): string {
	const teamClasses: Record<TeamName, string> = {
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

	return teamClasses[team as TeamName] || 'hide';
}

/**
 * @description Get CSS class for timeline cell based on date and status
 */
export function getCellCSSClass(timelineDate: Date, lastStatus: string): string {
	const dayOfWeek = timelineDate.getDay();
	let cellClass = getCellClassByStatus(lastStatus);

	if (dayOfWeek === 0 || dayOfWeek === 6) {
		cellClass = 'weekend';
	}

	return cellClass;
}

/**
 * @description Get CSS class based on issue status
 */
export function getCellClassByStatus(status: string): string {
	const statusClasses: Record<StatusName, string> = {
		'In Progress': 'in-progress',
		Blocked: 'blocked',
		'In Testing': 'testing',
		'Code Review': 'review',
		'Ready for QA': 'readyqa',
		'QA Passed': 'blwh',
		'QA Blocked': 'qablocked',
		Open: 'open',
		Created: 'created',
		Reopened: 'reopened'
	};

	return statusClasses[status as StatusName] || 'default-status';
}

/**
 * @description Get CSS class for month background
 */
export function getMonthCSSClass(date: Date): string {
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
