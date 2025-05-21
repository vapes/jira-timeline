import { getCSSClassByTeam, getCellCSSClass, getCellClassByStatus, getMonthCSSClass } from './cssHelpers.ts';
import { style } from './style.ts';

interface IssueResult {
	issueKey: string;
	issueSummary: string;
	statusHistory: Array<{
		date: string;
		to: string;
		author: {
			displayName?: string;
			name?: string;
		};
	}>;
	team: string;
	assignee: string;
	estimate: string;
	storyPoints: string;
}

interface DateRange {
	startDate: Date;
	endDate: Date;
}

/**
 * @description Generate HTML table with status timeline for all issues
 */
export function generateIssueTimeline(issueResults: IssueResult[]): string {
	issueResults = sortIssuesByInProgress(issueResults);

	const { startDate, endDate } = findOverallDates(issueResults);
	const numDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

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
 */
function generateTableHeader(startDate: Date, numDays: number): string {
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
 */
function generateTimeRows(issueResults: IssueResult[], startDate: Date, numDays: number): string {
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
 */
function getStatusesForDay(issueResult: IssueResult, timelineDate: Date): string[] {
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
 */
function getStatusesHTML(statusEntriesForDay: string[]): string {
	return statusEntriesForDay.map((entry) => `<p class="${getCellClassByStatus(entry)}">${entry}</p>`).join('');
}

/**
 * @description Generate first cell content for issue row
 */
function getFirstCell(issueResult: IssueResult): string {
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
 */
function sortIssuesByInProgress(issueResults: IssueResult[]): IssueResult[] {
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
			return aInProgressDate.getTime() - bInProgressDate.getTime();
		}
	});
}

/**
 * @description Find overall start and end dates for timeline
 */
function findOverallDates(issueResults: IssueResult[]): DateRange {
	let startDate = new Date();
	let endDate = new Date();

	issueResults.forEach((issueResult) => {
		const dates = issueResult.statusHistory.map((entry) => new Date(entry.date));
		const issueStartDate = new Date(Math.min(...dates.map((d) => d.getTime())));
		const issueEndDate = new Date(Math.max(...dates.map((d) => d.getTime())));

		if (issueStartDate < startDate) {
			startDate = issueStartDate;
		}
		if (issueEndDate > endDate) {
			endDate = issueEndDate;
		}
	});

	return { startDate, endDate };
}
