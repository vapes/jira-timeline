import { UserStatistics } from './types';
import { jiraHost, jiraProtocol } from './config';

/**
 * @description Generate section with reopened tickets grouped by user
 */
export function generateReopenedTicketsSection(userStats: UserStatistics[]): string {
	// Отфильтруем пользователей, у которых есть переоткрытые тикеты
	const usersWithReopenedTickets = userStats
		.filter((user) => user.reopenedTickets && user.reopenedTickets.length > 0)
		// Сортируем по количеству тикетов (по убыванию)
		.sort((a, b) => b.reopenedTickets.length - a.reopenedTickets.length);

	if (usersWithReopenedTickets.length === 0) {
		return '<p>Нет данных о переоткрытых тикетах.</p>';
	}

	return usersWithReopenedTickets
		.map((user, index) => {
			// Создаем уникальный ID для каждого пользователя на основе его имени и индекса
			const userId = `user-${index}-${user.name.replace(/\s+/g, '-').toLowerCase()}`;

			const ticketsList = user.reopenedTickets
				.map(
					(ticket) =>
						`<li class="reopened-ticket">
				<a href="${jiraProtocol}://${jiraHost}/browse/${ticket.key}" target="_blank">${ticket.key}</a>
				<span class="ticket-summary">${ticket.summary}</span>
				<span class="ticket-date">${ticket.date}</span>
			</li>`
				)
				.join('');

			return `
			<div class="user-reopened-tickets">
				<div class="user-header" onclick="toggleTicketsList('${userId}')">
					<span class="toggle-icon" id="toggle-icon-${userId}">►</span>
					<h3>${user.name} <span class="ticket-count">(${user.reopenedTickets.length})</span></h3>
				</div>
				<ul class="tickets-list" id="tickets-list-${userId}" style="display: none;">
					${ticketsList}
				</ul>
			</div>
		`;
		})
		.join('');
}
