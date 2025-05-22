import { IssueResult, UserStatistics } from './types';
import { formatDateRu } from './utils';
import { highReopenedPercent } from './config';

/**
 * @description Collect statistics about users
 */
export function collectUserStatistics(issueResults: IssueResult[]): UserStatistics[] {
	const usersMap: Record<string, UserStatistics> = {};

	issueResults.forEach((issue) => {
		// Для каждого тикета отслеживаем последнего, кто перевел в In Progress и In Testing
		let lastInProgressAuthor = '';
		let lastInTestingAuthor = '';

		issue.statusHistory.forEach((statusChange) => {
			const authorName = statusChange.author || 'Unknown';

			// Если пользователя еще нет в списке, добавляем его
			if (!usersMap[authorName]) {
				usersMap[authorName] = {
					name: authorName,
					inProgressCount: 0,
					reopenedAfterInProgressCount: 0,
					reopenedCount: 0,
					inTestingCount: 0,
					reopenedAfterTestingCount: 0,
					reopenedAfterInProgressPercent: '0%',
					reopenedAfterTestingPercent: '0%',
					reopenedTickets: []
				};
			}

			// Переводы в In Progress
			if (statusChange.to === 'In Progress') {
				usersMap[authorName].inProgressCount += 1;
				lastInProgressAuthor = authorName;
			}

			// Переводы в In Testing
			if (statusChange.to === 'In Testing') {
				usersMap[authorName].inTestingCount += 1;
				lastInTestingAuthor = authorName;
			}

			// Переводы в Reopened
			if (statusChange.to === 'Reopened') {
				usersMap[authorName].reopenedCount += 1;

				// Добавляем тикет в список переоткрытых
				const formattedDate = formatDateRu(new Date(statusChange.date));

				usersMap[authorName].reopenedTickets.push({
					key: issue.issueKey,
					summary: issue.issueSummary,
					date: formattedDate
				});

				// Если кто-то до этого переводил в In Progress, увеличиваем счетчик
				if (lastInProgressAuthor && lastInProgressAuthor !== '') {
					usersMap[lastInProgressAuthor].reopenedAfterInProgressCount += 1;

					// Добавляем тикет и в список переоткрытых для разработчика тоже
					if (lastInProgressAuthor !== authorName) {
						usersMap[lastInProgressAuthor].reopenedTickets.push({
							key: issue.issueKey,
							summary: issue.issueSummary,
							date: formattedDate
						});
					}
				}

				// Если кто-то до этого переводил в In Testing, увеличиваем счетчик
				if (lastInTestingAuthor && lastInTestingAuthor !== '') {
					usersMap[lastInTestingAuthor].reopenedAfterTestingCount += 1;
				}
			}
		});
	});

	// Рассчитываем проценты
	Object.values(usersMap).forEach((stats) => {
		// Процент переводов в Reopened после In Progress
		if (stats.inProgressCount > 0) {
			const percent = (stats.reopenedAfterInProgressCount / stats.inProgressCount) * 100;
			stats.reopenedAfterInProgressPercent = `${percent.toFixed(1)}%`;
		} else {
			stats.reopenedAfterInProgressPercent = 'N/A';
		}

		// Процент переводов в Reopened после In Testing
		if (stats.inTestingCount > 0) {
			const percent = (stats.reopenedAfterTestingCount / stats.inTestingCount) * 100;
			stats.reopenedAfterTestingPercent = `${percent.toFixed(1)}%`;
		} else {
			stats.reopenedAfterTestingPercent = 'N/A';
		}
	});

	// Преобразуем карту в массив и сортируем по количеству переводов в In Progress
	return Object.values(usersMap).sort((a, b) => b.inProgressCount - a.inProgressCount);
}

/**
 * @description Generate HTML table for user statistics
 */
export function generateUserStatisticsTable(userStats: UserStatistics[]): string {
	return userStats
		.map((user) => {
			// Добавляем классы для высоких процентов
			const inProgressPercentClass =
				user.reopenedAfterInProgressPercent !== 'N/A' &&
				parseFloat(user.reopenedAfterInProgressPercent) > highReopenedPercent
					? 'high-percent'
					: '';

			const inTestingPercentClass =
				user.reopenedAfterTestingPercent !== 'N/A' &&
				parseFloat(user.reopenedAfterTestingPercent) > highReopenedPercent
					? 'high-percent-testing'
					: '';

			return `
			<tr>
				<td>${user.name}</td>
				<td>${user.inProgressCount}</td>
				<td>${user.reopenedAfterInProgressCount}</td>
				<td class="${inProgressPercentClass}">${user.reopenedAfterInProgressPercent}</td>
				<td>${user.inTestingCount}</td>
				<td class="${inTestingPercentClass}">${user.reopenedAfterTestingPercent}</td>
				<td>${user.reopenedCount}</td>
			</tr>
		`;
		})
		.join('');
}
