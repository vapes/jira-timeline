import { IssueResult } from './types';
import { style } from './style';
import { clientScripts } from './clientScripts';
import { findOverallDates, sortIssuesByInProgress } from './utils';
import { generateTableHeader, generateTimeRows } from './timeline';
import { collectUserStatistics, generateUserStatisticsTable } from './userStatistics';
import { generateReopenedTicketsSection } from './reopenedTickets';

/**
 * @description Generate HTML table with status timeline for all issues
 */
export function generateIssueTimeline(issueResults: IssueResult[]): string {
	issueResults = sortIssuesByInProgress(issueResults);

	const { startDate, endDate } = findOverallDates(issueResults);
	const numDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

	// Собираем статистику пользователей
	const userStats = collectUserStatistics(issueResults);

	return `
    <html>
    <head>
      <title>Status Timeline</title>
      ${style}
      ${clientScripts}
    </head>
    <body>
      <div class="tab-buttons">
        <button class="tab-button active" data-tab="timeline-tab" onclick="showTab('timeline-tab')">Временная шкала</button>
        <button class="tab-button" data-tab="statistics-tab" onclick="showTab('statistics-tab')">Статистика пользователей</button>
      </div>
      
      <div id="timeline-tab" class="tab-content">
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
      </div>
      
      <div id="statistics-tab" class="tab-content" style="display: none;">
        <div class="statistics-layout">
          <div class="statistics-column">
            <table class="statistics-table">
                <thead>
                    <tr>
                        <th>Пользователь</th>
                        <th>Переводы в In Progress</th>
                        <th>Reopened после In Progress</th>
                        <th>% Reopened/In Progress</th>
                        <th>Переводы в In Testing</th>
                        <th>% Reopened/In Testing</th>
                        <th>Переводы в Reopened</th>
                    </tr>
                </thead>
                <tbody>
                    ${generateUserStatisticsTable(userStats)}
                </tbody>
            </table>
          </div>
          
          <div class="reopened-tickets-column">
            <h2>Переоткрытые тикеты</h2>
            ${generateReopenedTicketsSection(userStats)}
          </div>
        </div>
      </div>
    </body>
  </html>`;
}
