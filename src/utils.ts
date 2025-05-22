import { Dates, IssueResult } from './types';

/**
 * @description Find overall start and end dates for timeline
 */
export function findOverallDates(issueResults: IssueResult[]): Dates {
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

/**
 * @description Sort issues by their first "In Progress" status
 */
export function sortIssuesByInProgress(issueResults: IssueResult[]): IssueResult[] {
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
 * @description Get statuses for a specific day
 */
export function getStatusesForDay(issueResult: IssueResult, timelineDate: Date): string[] {
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
 * @description Format date to Russian locale
 */
export function formatDateRu(date: Date, includeTime: boolean = false): string {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	};

	if (includeTime) {
		options.hour = '2-digit';
		options.minute = '2-digit';
	}

	return date.toLocaleString('ru-RU', options);
}
