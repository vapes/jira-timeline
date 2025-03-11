import jira from './jiraClient.js';

/**
 * @description Retrieve the status history for a Jira issue
 * @param {string} issueKey - The key of the Jira issue
 * @returns {Promise<Array>} Array of status changes with timestamps and authors
 */
export async function getIssueStatusHistory(issueKey) {
	console.log('getting status for ', issueKey);
	return jira.findIssue(issueKey, 'changelog').then((issue) => {
		const changelog = issue.changelog;
		const statusHistory = [];

		statusHistory.push({
			from: '',
			to: 'Created',
			date: issue.fields.created,
			avatar: issue.fields.creator.avatarUrls['16x16'],
			author: issue.fields.creator.name
		});

		if (changelog && changelog.histories) {
			changelog.histories.forEach((history) => {
				history.items.forEach((item) => {
					if (item.field === 'status') {
						statusHistory.push({
							from: item.fromString,
							to: item.toString,
							date: history.created,
							avatar: history.author.avatarUrls['16x16'],
							author: history.author
						});
					}
				});
			});
		}

		return statusHistory;
	});
}
