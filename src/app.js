import jira from './jiraClient.js';
import fs from 'fs';
import { getIssueStatusHistory } from './issueStatusHistory.js';
import { generateIssueTimeline } from './generateTimelineHTML.js';

/**
 * @description JQL query to retrieve issues
 * @type {string}
 */
const jqlQuery =
	'';

/**
 * @description Process issues from Jira
 * @returns {Promise<void>}
 */
async function processIssues() {
	try {
		const issues = await jira.searchJira(jqlQuery, { maxResults: 1000 });
		console.log('Found Issues: ', issues.issues.length);

		const issueResults = await Promise.all(issues.issues.map((issue) => processIssue(issue)));

		console.log('Generating timeline');
		const html = generateIssueTimeline(issueResults);

		await writeTimelineToFile(html);
	} catch (error) {
		console.error(`Failed to retrieve issues. Error: ${error}`);
	}
}

/**
 * @description Process single Jira issue
 * @param {Object} issue - Jira issue object
 * @returns {Promise<Object>} Processed issue data
 */
async function processIssue(issue) {
	const issueKey = issue.key;
	const storyPoints = issue.fields.customfield_10106 ? `StoryPoints: ${issue.fields.customfield_10106}` : '';
	const estimate = formatTimeEstimate(issue.fields.timeoriginalestimate);
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
 * @param {string} html - HTML content to write
 * @returns {Promise<void>}
 */
function writeTimelineToFile(html) {
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
 * @param {number} seconds - Number of seconds
 * @returns {string} Formatted time string
 */
function formatTimeEstimate(seconds) {
	const minutes = seconds / 60;
	const hours = minutes / 60;
	let days = hours / 8;
	const weeks = days / 5;

	const formattedTime = [];
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
