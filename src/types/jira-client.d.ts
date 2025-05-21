declare module 'jira-client' {
	interface JiraApiOptions {
		protocol: string;
		host: string;
		username: string;
		password: string;
		apiVersion: string;
		strictSSL: boolean;
	}

	class JiraApi {
		constructor(options: JiraApiOptions);
		findIssue(issueNumber: string, expand?: string): Promise<any>;
		searchJira(
			jql: string,
			options?: { maxResults?: number }
		): Promise<{
			issues: Array<{
				key: string;
				fields: any;
			}>;
		}>;
	}

	export default JiraApi;
}
