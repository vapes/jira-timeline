import { getCSSClassByTeam, getCellCSSClass, getCellClassByStatus, getMonthCSSClass } from './cssHelpers.js';
import { style } from './style.js';

/**
 * @description Generate HTML table with status timeline for all issues
 * @param {Array<Object>} issueResults - Array of processed issue data
 * @returns {string} Generated HTML content
 */
export function generateIssueTimeline(issueResults) {
	issueResults = sortIssuesByInProgress(issueResults);

	const { startDate, endDate } = findOverallDates(issueResults);
	const numDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

	return `
    <html>
    <head>
      <title>Status Timeline</title>
      ${style}
    </head>
    <body>
      <div class="scrollable-content">
        <table>
            <thead>
                ${generateTableHeader(startDate, numDays)}
            </thead>
            <tbody>
                ${generateTimeRows(issueResults, startDate, numDays)}
            </tbody>    
        </table>
      </div>
    </body>
  </html>`;
}

/**
 * @description Generate table header with dates
 * @param {Date} startDate - Timeline start date
 * @param {number} numDays - Number of days to display
 * @returns {string} Generated HTML header
 */
function generateTableHeader(startDate, numDays) {
	let currentDate = new Date(startDate);
	let tableHeader = '<tr>\n<th>Summary</th>';

	for (let i = 0; i < numDays; i++) {
		tableHeader += `<th class="${getMonthCSSClass(currentDate)}">${currentDate.toISOString().split('T')[0]}</th>`;
		currentDate.setDate(currentDate.getDate() + 1);
	}

	tableHeader += '</tr>\n';
	return tableHeader;
}

/**
 * @description Generate timeline rows for each issue
 * @param {Array<Object>} issueResults - Array of processed issue data
 * @param {Date} startDate - Timeline start date
 * @param {number} numDays - Number of days to display
 * @returns {string} Generated HTML rows
 */
function generateTimeRows(issueResults, startDate, numDays) {
	let issueRows = '';

	issueResults.forEach((issueResult) => {
		issueRows += '<tr>\n';
		issueRows += getFirstCell(issueResult);

		const timelineDate = new Date(startDate);
		let lastStatus = '';

		for (let i = 0; i < numDays; i++) {
			const statusesForDay = getStatusesForDay(issueResult, timelineDate);
			lastStatus = statusesForDay[statusesForDay.length - 1] || lastStatus;
			const cellClass = getCellCSSClass(timelineDate, lastStatus);

			issueRows += `<td class="${cellClass}">${getStatusesHTML(statusesForDay)}</td>`;
			timelineDate.setDate(timelineDate.getDate() + 1);
		}

		issueRows += '</tr>\n';
	});

	return issueRows;
}

/**
 * @description Get statuses for a specific day
 * @param {Object} issueResult - Issue data
 * @param {Date} timelineDate - Date to check
 * @returns {Array<string>} Array of statuses for the day
 */
function getStatusesForDay(issueResult, timelineDate) {
	const statusesForDay = issueResult.statusHistory.filter((entry) => {
		const entryDate = new Date(entry.date);
		return (
			entryDate.getFullYear() === timelineDate.getFullYear() &&
			entryDate.getMonth() === timelineDate.getMonth() &&
			entryDate.getDate() === timelineDate.getDate()
		);
	});
	return statusesForDay.map((statusEntry) => statusEntry.to);
}

/**
 * @description Generate HTML for status entries
 * @param {Array<string>} statusEntriesForDay - Array of statuses
 * @returns {string} Generated HTML for statuses
 */
function getStatusesHTML(statusEntriesForDay) {
	return statusEntriesForDay.map((entry) => `<p class="${getCellClassByStatus(entry)}">${entry}</p>`).join('');
}

/**
 * @description Generate first cell content for issue row
 * @param {Object} issueResult - Issue data
 * @returns {string} Generated HTML for first cell
 */
function getFirstCell(issueResult) {
	return `<td class="fixed-column ${getCSSClassByTeam(issueResult.team)}">
    <a href="https://jira.bgaming.com/browse/${issueResult.issueKey}" target="_blank">${issueResult.issueKey} ${
		issueResult.issueSummary
	}</a>
    <p>${issueResult.assignee}</p>
    <p>${issueResult.estimate}</p>
    <p>${issueResult.storyPoints}</p>
    </td>`;
}

/**
 * @description Sort issues by their first "In Progress" status
 * @param {Array<Object>} issueResults - Array of issue data
 * @returns {Array<Object>} Sorted array of issues
 */
function sortIssuesByInProgress(issueResults) {
	// Log information about reopened tickets
	issueResults.forEach((issue) => {
		const reopenedEntries = issue.statusHistory.filter((entry) => entry.to === 'Reopened');
		reopenedEntries.forEach((entry) => {
			const formattedDate = new Date(entry.date).toLocaleString('ru-RU', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit'
			});
			console.log(
				`Ticket ${issue.issueKey} was reopened by ${
					entry.author.displayName || entry.author.name || 'Unknown user'
				} (${formattedDate})`
			);
		});
	});

	return issueResults.sort((a, b) => {
		const aInProgressEntry = a.statusHistory.find((entry) => entry.to === 'In Progress');
		const bInProgressEntry = b.statusHistory.find((entry) => entry.to === 'In Progress');

		if (!aInProgressEntry && !bInProgressEntry) {
			return 0;
		} else if (!aInProgressEntry) {
			return 1;
		} else if (!bInProgressEntry) {
			return -1;
		} else {
			const aInProgressDate = new Date(aInProgressEntry.date);
			const bInProgressDate = new Date(bInProgressEntry.date);
			return aInProgressDate - bInProgressDate;
		}
	});
}

/**
 * @description Find overall start and end dates for timeline
 * @param {Array<Object>} issueResults - Array of issue data
 * @returns {Object} Object containing start and end dates
 */
function findOverallDates(issueResults) {
	let startDate = new Date();
	let endDate = new Date();

	issueResults.forEach((issueResult) => {
		const dates = issueResult.statusHistory.map((entry) => new Date(entry.date));
		const issueStartDate = new Date(Math.min(...dates));
		const issueEndDate = new Date(Math.max(...dates));

		if (issueStartDate < startDate) {
			startDate = issueStartDate;
		}
		if (issueEndDate > endDate) {
			endDate = issueEndDate;
		}
	});

	return { startDate, endDate };
}
