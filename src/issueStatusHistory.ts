import jira from './jiraClient';

interface StatusChange {
	from: string;
	to: string;
	date: string;
	avatar: string;
	author: string;
}

interface JiraUser {
	name: string;
	avatarUrls: {
		'16x16': string;
	};
}

interface ChangelogItem {
	field: string;
	fromString: string;
	toString: string;
}

interface ChangelogHistory {
	created: string;
	author: JiraUser;
	items: ChangelogItem[];
}

interface JiraIssue {
	fields: {
		created: string;
		creator: JiraUser;
	};
	changelog: {
		histories: ChangelogHistory[];
	};
}

/**
 * @description Retrieve the status history for a Jira issue
 */
export async function getIssueStatusHistory(issueKey: string): Promise<StatusChange[]> {
	console.log('getting status for ', issueKey);
	return jira.findIssue(issueKey, 'changelog').then((issue: JiraIssue) => {
		const changelog = issue.changelog;
		const statusHistory: StatusChange[] = [];

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
							author: history.author.name
						});
					}
				});
			});
		}

		return statusHistory;
	});
}
