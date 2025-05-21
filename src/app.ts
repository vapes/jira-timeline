import jira from './jiraClient.ts';
import fs from 'fs';
import { getIssueStatusHistory } from './issueStatusHistory.ts';
import { generateIssueTimeline } from './generateTimelineHTML.ts';

interface JiraIssue {
	key: string;
	fields: {
		customfield_10106?: number;
		timeoriginalestimate?: number;
		summary: string;
		customfield_10801?: {
			value: string;
		};
		assignee?: {
			displayName: string;
		};
	};
}

interface ProcessedIssue {
	issueKey: string;
	issueSummary: string;
	statusHistory: any; // TODO: Add proper type for status history
	team: string;
	assignee: string;
	estimate: string;
	storyPoints: string;
}

/**
 * @description JQL query to retrieve issues
 */
const jqlQuery: string = 'project = CA AND Teams = FE AND createdDate >= startOfYear() ';

/**
 * @description Process issues from Jira
 */
async function processIssues(): Promise<void> {
	try {
		const issues = await jira.searchJira(jqlQuery, { maxResults: 1000 });
		console.log('Found Issues: ', issues.issues.length);

		const issueResults = await Promise.all(issues.issues.map((issue: JiraIssue) => processIssue(issue)));

		console.log('Generating timeline');
		const html = generateIssueTimeline(issueResults);

		await writeTimelineToFile(html);
	} catch (error) {
		console.error(`Failed to retrieve issues. Error: ${error}`);
	}
}

/**
 * @description Process single Jira issue
 */
async function processIssue(issue: JiraIssue): Promise<ProcessedIssue> {
	const issueKey = issue.key;
	const storyPoints = issue.fields.customfield_10106 ? `StoryPoints: ${issue.fields.customfield_10106}` : '';
	const estimate = formatTimeEstimate(issue.fields.timeoriginalestimate || 0);
	const issueSummary = issue.fields.summary;
	const team = issue.fields.customfield_10801 ? issue.fields.customfield_10801.value : '';
	const assignee = issue.fields.assignee ? issue.fields.assignee.displayName : '';
	const statusHistory = await getIssueStatusHistory(issueKey);

	return {
		issueKey,
		issueSummary,
		statusHistory,
		team,
		assignee,
		estimate,
		storyPoints
	};
}

/**
 * @description Write HTML timeline to file
 */
function writeTimelineToFile(html: string): Promise<void> {
	return new Promise((resolve, reject) => {
		fs.writeFile('status_timeline.html', html, 'utf8', (error) => {
			if (error) {
				console.error('Failed to write HTML file.', error);
				reject(error);
			} else {
				console.log('HTML file generated: status_timeline.html');
				resolve();
			}
		});
	});
}

/**
 * @description Format time estimate from seconds to readable format
 */
function formatTimeEstimate(seconds: number): string {
	const minutes = seconds / 60;
	const hours = minutes / 60;
	let days = hours / 8;
	const weeks = days / 5;

	const formattedTime: string[] = [];
	if (weeks >= 1) {
		formattedTime.push(`${Math.floor(weeks)}w`);
		days -= Math.floor(weeks) * 5;
	}
	if (days >= 1) {
		formattedTime.push(`${Math.floor(days)}d`);
	}
	if (hours >= 1 && formattedTime.length === 0) {
		formattedTime.push(`${Math.floor(hours)}h`);
	}

	return formattedTime.join('');
}

processIssues();
