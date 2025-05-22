import { getStatusesForDay } from './utils';
import { getCellCSSClass, getCellClassByStatus, getCSSClassByTeam, getMonthCSSClass } from './cssHelpers';
import { jiraHost, jiraProtocol } from './config';

interface IssueResult {
	issueKey: string;
	issueSummary: string;
	statusHistory: Array<{
		date: string;
		to: string;
		author: string;
	}>;
	team: string;
	assignee: string;
	estimate: string;
	storyPoints: string;
}

/**
 * @description Generate table header with dates
 */
export function generateTableHeader(startDate: Date, numDays: number): string {
	let currentDate = new Date(startDate);

	// Сначала сгруппируем дни по месяцам
	const months: { [key: string]: number } = {};
	const days: { date: Date; day: number }[] = [];

	for (let i = 0; i < numDays; i++) {
		const dateClone = new Date(currentDate);
		const monthYear = dateClone.toLocaleString('ru-RU', { month: 'long', year: 'numeric' });

		if (!months[monthYear]) {
			months[monthYear] = 0;
		}
		months[monthYear]++;

		days.push({
			date: dateClone,
			day: dateClone.getDate()
		});

		currentDate.setDate(currentDate.getDate() + 1);
	}

	// Теперь формируем заголовок
	let monthHeader = '<tr>\n<th rowspan="2">Summary</th>';
	let dayHeader = '<tr>\n';

	// Добавляем месяцы с правильным colspan
	Object.entries(months).forEach(([monthYear, count]) => {
		monthHeader += `<th colspan="${count}" class="${getMonthCSSClass(
			days.find((d) => d.date.toLocaleString('ru-RU', { month: 'long', year: 'numeric' }) === monthYear)!.date
		)}">${monthYear}</th>`;
	});

	// Добавляем дни с фиксированной шириной
	days.forEach(({ date, day }) => {
		dayHeader += `<th class="${getMonthCSSClass(
			date
		)}" style="width: 60px; min-width: 60px; max-width: 60px;">${day}</th>`;
	});

	monthHeader += '</tr>\n';
	dayHeader += '</tr>\n';

	return monthHeader + dayHeader;
}

/**
 * @description Generate timeline rows for each issue
 */
export function generateTimeRows(issueResults: IssueResult[], startDate: Date, numDays: number): string {
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

			issueRows += `<td class="${cellClass}" style="width: 60px; min-width: 60px; max-width: 60px;">${getStatusesHTML(
				statusesForDay
			)}</td>`;
			timelineDate.setDate(timelineDate.getDate() + 1);
		}

		issueRows += '</tr>\n';
	});

	return issueRows;
}

/**
 * @description Generate HTML for status entries
 */
export function getStatusesHTML(statusEntriesForDay: string[]): string {
	return statusEntriesForDay.map((entry) => `<p class="${getCellClassByStatus(entry)}">${entry}</p>`).join('');
}

/**
 * @description Generate first cell content for issue row
 */
export function getFirstCell(issueResult: IssueResult): string {
	return `<td class="fixed-column ${getCSSClassByTeam(issueResult.team)}">
    <a href="${jiraProtocol}://${jiraHost}/browse/${issueResult.issueKey}" target="_blank">${issueResult.issueKey} ${
		issueResult.issueSummary
	}</a>
    <p>${issueResult.assignee}</p>
    <p>${issueResult.estimate}</p>
    <p>${issueResult.storyPoints}</p>
    </td>`;
}
